Claude，请帮我开发AI Chart Service的后端API。

## 项目位置
/root/.openclaw/workspace/ai-chart-service

## 任务

### 1. 创建server目录并初始化
```bash
cd /root/.openclaw/workspace/ai-chart-service
mkdir -p server/src/{ai,api,utils}
cd server && npm init -y
npm install express cors dotenv axios
```

### 2. 创建Express服务器
server/src/index.js:
- 监听3001端口
- 启用CORS和JSON解析
- 添加health check端点

### 3. 创建文本转图表的API
server/src/api/generate.js:
- POST /api/generate
- 接收: { text: "用户输入的文本" }
- 调用Claude API解析文本，提取节点和边
- 返回Excalidraw JSON格式

### 4. 创建Excalidraw JSON生成器
server/src/ai/excalidraw-generator.js:
- 输入: nodes [{id, label, type}], edges [{from, to}]
- 输出: Excalidraw elements (rectangles + arrows + text)
- 设置手绘风格: roughness: 2

### 5. 添加路由
server/src/routes.js:
- GET /health
- POST /api/generate
- POST /api/mermaid (可选)

## 测试
完成后测试curl命令：
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "步骤1: 注册账号 → 步骤2: 获取Claim Code → 步骤3: 绑定账号"}'
```

## 完成后
1. 启动服务器测试: node server/src/index.js
2. 验证API返回正确的Excalidraw JSON
3. 将生成的JSON导入 https://excalidraw.com 验证显示效果

开始吧！不要问我任何问题，直接实现。如果遇到选择，自己决定。
