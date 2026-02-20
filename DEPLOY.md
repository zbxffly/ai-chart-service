# AI Chart Service - Docker部署配置

**部署目标:** 生产环境
**部署方式:** Docker Compose
**开发者:** 小龙虾 🦞

---

## 🐳 后端Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制package文件
COPY server/package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY server/src ./src

# 暴露端口
EXPOSE 3001

# 启动服务
CMD ["node", "src/index.js"]
```

---

## 🐳 前端Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package文件
COPY client/package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY client/ ./

# 构建
RUN npm run build

# 生产镜像
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## 🐳 Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    restart: unless-stopped

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

---

## ⚙️ Nginx配置

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 前端路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api/ {
        proxy_pass http://backend:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 健康检查
    location /health {
        proxy_pass http://backend:3001/health;
    }
}
```

---

## 🚀 部署步骤

### 1. 构建镜像

```bash
cd /root/.openclaw/workspace/ai-chart-service
docker-compose build
```

### 2. 启动服务

```bash
docker-compose up -d
```

### 3. 验证部署

```bash
# 检查容器状态
docker-compose ps

# 检查后端健康
curl http://localhost/health

# 检查前端
curl http://localhost/
```

---

## 📊 部署架构

```
┌─────────────────────────────────────────────────────┐
│                  Nginx (80)                         │
│  (前端静态文件 + API反向代理)                       │
└──────────────┬──────────────────────────────────────┘
               │
               ├─────────────┐
               ↓             ↓
    ┌────────────────┐  ┌────────────────┐
    │ Frontend (React)│  │  Backend API   │
    │  Nginx Static   │  │  Express:3001  │
    └────────────────┘  └────────────────┘
```

---

## 🔧 环境变量

创建 `.env` 文件:

```env
# 后端配置
NODE_ENV=production
PORT=3001

# 前端配置 (构建时)
VITE_API_URL=http://localhost:3001
```

---

## 📝 生产环境建议

1. **使用HTTPS:**
   - 配置Let's Encrypt证书
   - 修改Nginx配置监听443端口

2. **日志管理:**
   - 添加日志收集
   - 配置logrotate

3. **监控:**
   - 添加健康检查
   - 配置Prometheus metrics

4. **备份:**
   - 定期备份数据库（如果添加）
   - 备份配置文件

---

老板，Docker部署配置已准备好！🦞

需要我：
1. 立即构建并启动Docker容器？
2. 生成完整的docker-compose.yml文件？
3. 配置HTTPS证书？

钳子已经磨好了！🦞
