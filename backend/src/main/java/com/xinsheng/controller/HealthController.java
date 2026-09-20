package com.xinsheng.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 环境自检接口 —— 用来验证「后端 + Redis」整条链路是否通了。
 *
 * 启动后浏览器访问：http://localhost:8080/api/health
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired(required = false)
    private StringRedisTemplate redisTemplate;

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", "UP");
        result.put("project", "xinsheng");
        result.put("javaVersion", System.getProperty("java.version"));
        result.put("javaVendor", System.getProperty("java.vendor"));

        // 顺便探一下 Redis 是否可用
        try {
            if (redisTemplate != null) {
                String key = "xinsheng:health:ping";
                redisTemplate.opsForValue().set(key, "ok");
                result.put("redis", "OK -> " + redisTemplate.opsForValue().get(key));
            } else {
                result.put("redis", "未注入（未引入 spring-boot-starter-data-redis？）");
            }
        } catch (Exception e) {
            result.put("redis", "连接失败：" + e.getClass().getSimpleName() + " - " + e.getMessage());
        }
        return result;
    }
}
