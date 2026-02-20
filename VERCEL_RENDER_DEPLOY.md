# 🚀 AI Chart Service - Vercel + Render 部署指南

**目标:** 免费托管到生产环境
**平台:** Vercel (前端) + Render (后端)
**开发者:** 小龙虾 🦞

---

## 📋 前置准备

### 1. Vercel账号 (前端)

1. 访问: https://vercel.com
2. 用GitHub账号登录
3. 授权Vercel访问你的仓库

### 2. Render账号 (后端)

1. 访问: https://render.com
2. 用GitHub账号登录
3. 授权Render访问你的仓库

---

## 🎨 前端部署到Vercel

### 方法1: 通过GitHub集成 (推荐)

1. 访问: https://vercel.com/new
2. 导入GitHub仓库: `zbxffly/ai-chart-service`
3. 配置:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. 点击 "Deploy"

### 方法2: 使用CLI

```bash
# 安装CLI
npm install -g vercel

# 登录
vercel login

# 部署前端
cd /root/.openclaw/workspace/ai-chart-service/client
vercel --prod
```

**部署后获得:**
- 前端URL: `https://ai-chart-service.vercel.app`
- 自动HTTPS ✅
- 全球CDN ✅

---

## 🔧 后端部署到Render

### 步骤1: 修改后端支持Render

创建 `server/procfile`:

```file
web: node src/index.js
```

### 步骤2: 通过GitHub集成

1. 访问: https://dashboard.render.com/new
2. 选择 "Web Service"
3. 连接GitHub仓库: `zbxffly/ai-chart-service`
4. 配置:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Environment:** 
     - `NODE_ENV`: `production`
     - `PORT`: `3001`
5. 点击 "Create Web Service"

**部署后获得:**
- 后端URL: `https://ai-chart-service.onrender.com`
- 自动HTTPS ✅
- 自动部署 ✅

---

## 🔗 前后端连接配置

### 修改前端API地址

编辑 `client/src/components/ChatPanel.jsx`:

```javascript
// 第12行，修改API_URL
const API_URL = import.meta.env.VITE_API_URL || 'https://ai-chart-service.onrender.com';
```

### 添加环境变量

在Vercel项目设置中添加:
- `VITE_API_URL`: `https://ai-chart-service.onrender.com`

---

## 📊 部署架构

```
用户浏览器
    ↓
Vercel CDN (前端)
    ↓
Render (后端API)
    ↓
Excalidraw JSON生成
```

---

## ✅ 部署后的URL

**前端:** https://ai-chart-service.vercel.app
**后端:** https://ai-chart-service.onrender.com
**GitHub:** https://github.com/zbxffly/ai-chart-service

---

## 🔄 自动部署

**触发条件:**
- 推送到GitHub master分支
- Pull Request合并
- 手动触发部署

---

## 📝 部署检查清单

- [ ] Vercel账号创建
- [ ] Render账号创建
- [ ] GitHub仓库已连接
- [ ] 前端环境变量已配置
- [ ] 后端Procfile已创建
- [ ] 前后端已部署
- [ ] 功能测试通过

---

## 🚨 常见问题

### Q1: CORS错误
在Express中添加Vercel域名到CORS配置:
```javascript
app.use(cors({
  origin: ['https://ai-chart-service.vercel.app', 'http://localhost:5173']
}));
```

### Q2: API请求失败
检查Render服务是否启动，查看日志

### Q3: 构建失败
检查Vercel构建日志，确保依赖正确安装

---

老板，这是完整的部署指南！🦞

需要我：
1. 修改代码支持Vercel+Render部署？
2. 创建Procfile和环境变量配置？
3. 其他部署准备？

钳子已经磨好了！🦞
