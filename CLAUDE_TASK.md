# Claude Code任务: AI Chart Service后端开发

## 任务目标
开发一个基于Node.js + Express的后端服务，提供AI驱动的图表生成API。

## 具体要求

### 1. 项目初始化
```bash
cd /root/.openclaw/workspace/ai-chart-service/server
npm init -y
npm install express @excalidraw/excalidraw axios dotenv
```

### 2. 创建API服务器
文件: `server/src/index.js`

功能:
- Express服务器，监听3001端口
- CORS支持
- JSON解析
- 静态文件服务

### 3. AI文本解析器
文件: `server/src/ai/parser.js`

功能:
- 接收用户文本输入
- 调用Claude API解析为图表结构
- 返回节点和边的关系

### 4. Excalidraw JSON生成器
文件: `server/src/ai/generator.js`

功能:
- 将图表结构转换为Excalidraw JSON格式
- 包含:
  - rectangle (节点)
  - arrow (连线)
  - text (标签)
  - 手绘风格参数 (roughness: 2)

### 5. 图表导出功能
文件: `server/src/api/export.js`

功能:
- 接收Excalidraw JSON
- 渲染为PNG/SVG
- 返回可下载的文件

### 6. API路由
文件: `server/src/api/routes.js`

端点:
- POST /api/generate - 文本转图表
- POST /api/mermaid - Mermaid转Excalidraw
- GET /api/export/:format - 导出图表
- GET /api/health - 健康检查

### 7. 环境配置
文件: `server/.env.example`

变量:
- PORT=3001
- ANTHROPIC_API_KEY=sk-xxx
- CLAUDE_BASE_URL=https://api.anthropic.com

### 8. 启动脚本
文件: `server/package.json`

scripts:
- "start": "node src/index.js"
- "dev": "nodemon src/index.js"
- "test": "jest"

## 完成标准

1. ✅ 服务器可以启动 (npm start)
2. ✅ POST /api/generate 可以接收文本并返回Excalidraw JSON
3. ✅ 返回的JSON可以在 https://excalidraw.com 正常显示
4. ✅ 包含完整的错误处理
5. ✅ 代码有适当的注释
6. ✅ 包含一个示例请求 (curl命令或Postman collection)

## 测试用例

输入:
```
"EvoMap接入流程：
1. 注册账号
2. 运行register.js获取Claim Code
3. 访问Claim URL绑定
4. 发布资产"
```

期望输出:
包含4个矩形的流程图，用箭头连接，手绘风格。

## 重要提示

- 使用Excalidraw的数据结构规范: https://github.com/excalidraw/excalidraw/blob/master/src/data/transform.ts
- 确保生成的JSON格式正确，可以直接导入Excalidraw
- 手绘风格参数设置: roughness: 2, strokeStyle: "solid"
- 完成后运行: bash /root/.openclaw/workspace/ai-chart-service/task-tracker.sh complete "backend-api" "Backend API服务器已完成，可以接收文本并生成Excalidraw JSON"
- 如果遇到问题，运行: bash /root/.openclaw/workspace/ai-chart-service/task-tracker.sh fail "backend-api" "[错误描述]"

开始开发！🚀
