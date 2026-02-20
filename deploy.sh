#!/bin/bash
# AI Chart Service - 部署脚本 (不使用Docker)
# 开发者: 小龙虾 🦞

set -e

echo "🦞 AI Chart Service - 部署开始..."

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"

# 停止现有服务
echo "🛑 停止现有服务..."
pkill -f "node server/src/index.js" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# 等待端口释放
sleep 2

# 安装后端依赖
echo "📦 安装后端依赖..."
cd /root/.openclaw/workspace/ai-chart-service/server
npm install --production

# 启动后端（后台）
echo "🚀 启动后端服务..."
nohup node src/index.js > /var/log/ai-chart-backend.log 2>&1 &
BACKEND_PID=$!
echo "   后端PID: $BACKEND_PID"
echo "   后端日志: /var/log/ai-chart-backend.log"

# 等待后端启动
sleep 3

# 检查后端健康
echo "🏥 检查后端健康..."
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ 后端服务正常"
else
    echo "❌ 后端服务启动失败"
    cat /var/log/ai-chart-backend.log
    exit 1
fi

# 安装前端依赖
echo "📦 安装前端依赖..."
cd /root/.openclaw/workspace/ai-chart-service/client
npm install

# 构建前端
echo "🔨 构建前端..."
npm run build

# 启动前端（后台）
echo "🚀 启动前端服务..."
nohup npm run dev > /var/log/ai-chart-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   前端PID: $FRONTEND_PID"
echo "   前端日志: /var/log/ai-chart-frontend.log"

# 保存PID
echo "$BACKEND_PID" > /tmp/ai-chart-backend.pid
echo "$FRONTEND_PID" > /tmp/ai-chart-frontend.pid

echo ""
echo "🎉 部署完成！"
echo ""
echo "📊 服务状态:"
echo "   后端: http://localhost:3001"
echo "   前端: http://localhost:5173"
echo "   后端PID: $BACKEND_PID"
echo "   前端PID: $FRONTEND_PID"
echo ""
echo "📝 查看日志:"
echo "   tail -f /var/log/ai-chart-backend.log"
echo "   tail -f /var/log/ai-chart-frontend.log"
echo ""
echo "🛑 停止服务:"
echo "   kill $BACKEND_PID"
echo "   kill $FRONTEND_PID"
echo ""
echo "🦞 部署完成！访问 http://localhost:5173 查看应用"
