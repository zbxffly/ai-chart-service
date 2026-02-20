# Claude完成后端开发任务

## 当前状态
- ✅ server/src/{ai,api,utils} 目录已创建
- ❌ npm未初始化
- ❌ 依赖未安装
- ❌ 代码未编写

## 需要完成的任务

### 1. 初始化npm
```bash
cd /root/.openclaw/workspace/ai-chart-service/server
npm init -y
npm install express cors dotenv axios
```

### 2. 创建Express服务器
文件: server/src/index.js
- 监听3001端口
- CORS + JSON解析
- GET /health

### 3. Excalidraw JSON生成器
文件: server/src/ai/excalidraw-generator.js
- 输入: nodes, edges
- 输出: Excalidraw elements (rect + arrow + text)
- 手绘风格: roughness: 2

### 4. 文本解析API (简化版，不调用外部AI)
文件: server/src/api/generate.js
- 简单规则解析：
  - "步骤1: XX → 步骤2: YY" → 提取步骤
  - "A → B → C" → 提取流程
- 返回nodes和edges

### 5. 路由
文件: server/src/routes.js
- GET /health
- POST /api/generate

### 6. 测试
```bash
node server/src/index.js
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "步骤1: 注册 → 步骤2: 获取Code → 步骤3: 绑定"}'
```

## 完成后
1. 验证API返回正确JSON
2. 测试JSON导入Excalidraw.com
3. 运行: bash /root/.openclaw/workspace/ai-chart-service/task-tracker.sh complete "backend-api" "后端API已完成"

开始吧！不要问，直接做。
