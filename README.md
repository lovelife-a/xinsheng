# 新升项目（XinSheng）

> 敏捷项目管理课设 · 团队协作仓库
> 本 README 是**全组唯一入口**，环境、启动、规范都以此为准。

---

## 一、技术栈

| 层 | 技术 | 版本要求 |
|---|---|---|
| 后端 | Java | **JDK 21+** |
| 后端框架 | Spring Boot | **3.0+** |
| 缓存 | Redis | 最新稳定版 |
| 前端 | Node.js | **25+** |
| 前端框架 | Vue | **3.0+** |
| 构建（后端） | Maven | 3.9.x |
| 构建（前端） | Vite | 最新 |
| 版本控制 | Git + TortoiseGit（小乌龟） | 最新稳定版 |

---

## 二、快速开始

### 1. 克隆仓库

```bash
git clone <仓库地址>
cd xinsheng
```

### 2. 后端

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

启动后访问：http://localhost:8080

### 3. 前端

```bash
cd frontend
npm install        # 或 pnpm install
npm run dev
```

启动后访问：http://localhost:5173

### 4. Redis

```bash
redis-server
```

默认端口 6379。

---

## 三、端口约定（不要改，避免打架）

| 服务 | 端口 |
|---|---|
| 后端 Spring Boot | 8080 |
| 前端 Vite dev | 5173 |
| Redis | 6379 |

---

## 四、Git 规范

### 分支模型

| 分支 | 用途 | 谁能推 |
|---|---|---|
| `main` | 稳定版，只接受合并 | 组长 |
| `dev` | 日常集成分支 | 全员 |
| `feature-xxx` | 个人功能分支 | 各自 |

**流程**：从 `dev` 切 `feature-xxx` → 开发 → 提 PR 合并回 `dev`。

### Commit message 格式

```
feat: 新增用户登录接口
fix: 修复分页参数越界
docs: 更新 README 启动说明
style: 格式化代码
refactor: 重构订单服务
test: 补充单元测试
chore: 更新依赖版本
```

### 提交前必做

```bash
git pull --rebase   # 先拉最新
git status          # 确认没提交多余文件
```

---

## 五、首次使用 Git 请配置（只做一次）

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git config --global core.autocrlf true
```

---

## 六、目录结构

```
xinsheng/
├── backend/                 # Spring Boot 后端
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/                # Vue3 前端
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── docs/                    # 过程文档、会议记录
├── .gitignore
├── .gitattributes
└── README.md
```

---

## 七、问题找谁

| 问题类型 | 找谁 |
|---|---|
| 环境装不上 | 组长 |
| 分支冲突 | 组长 |
| 模块分工 | 组长 |

---

## 八、变更记录

| 日期 | 版本 | 变更 | 负责人 |
|---|---|---|---|
| | v0.0.1-baseline | 初始骨架 | 组长 |
