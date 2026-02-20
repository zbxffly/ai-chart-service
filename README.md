# AI Chart Service - 基于Excalidraw的智能图表生成服务

## 🎯 项目目标

打造一个结合Excalidraw开源基础和AI智能的图表生成服务，直接秒杀Napkin.ai！

## 🏗️ 架构设计

```
┌─────────────────┐
│   用户输入      │  文本描述 / Mermaid代码 / 关键词
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AI引擎层      │  LLM解析 → 图表结构生成
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  图表渲染层     │  Excalidraw (Canvas/SVG)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  输出格式       │  PNG / SVG / Excalidraw JSON
└─────────────────┘
```

## 📦 技术栈

- **后端:** Node.js + Express
- **前端:** React + Excalidraw
- **AI:** Claude API / OpenAI API
- **渲染:** @excalidraw/excalidraw (Canvas)
- **存储:** 内存缓存 (可扩展Redis)

## 🚀 功能特性

### MVP (最小可行产品)
- ✅ 文本转流程图
- ✅ 文本转架构图
- ✅ Mermaid转Excalidraw
- ✅ 手绘风格渲染
- ✅ 导出PNG/SVG

### V1.0 (完整版)
- ✅ 多种图表类型 (流程图、时序图、ER图、思维导图)
- ✅ 智能布局优化
- ✅ 配色方案推荐
- ✅ 实时协作
- ✅ 历史记录

### V2.0 (企业版)
- ✅ 自托管部署
- ✅ 私有数据保护
- ✅ API密钥管理
- ✅ 团队权限控制

## 📁 项目结构

```
ai-chart-service/
├── server/                 # 后端服务
│   ├── src/
│   │   ├── ai/            # AI引擎
│   │   │   ├── parser.js  # 文本解析
│   │   │   ├── layout.js  # 布局优化
│   │   │   └── generator.js # Excalidraw JSON生成
│   │   ├── api/           # API路由
│   │   └── utils/         # 工具函数
│   └── package.json
├── client/                 # 前端界面
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.jsx # Excalidraw编辑器
│   │   │   └── Chat.jsx   # AI对话界面
│   │   └── App.jsx
│   └── package.json
├── task-tracker.sh         # Stop Hook脚本
├── claude-with-hooks.sh    # Claude Code包装器
└── README.md
```

## 🔧 开发计划

### 阶段1: 后端API (Claude Code任务1)
- [ ] Express服务器搭建
- [ ] AI文本解析器
- [ ] Excalidraw JSON生成器
- [ ] 导出功能 (PNG/SVG)

### 阶段2: 前端界面 (Claude Code任务2)
- [ ] React应用初始化
- [ ] Excalidraw集成
- [ ] AI对话界面

### 阶段3: AI优化 (Claude Code任务3)
- [ ] 智能布局算法
- [ ] 配色方案推荐
- [ ] 图表类型识别

### 阶段4: 部署测试
- [ ] Docker镜像
- [ ] 生产环境部署

## 🎨 使用示例

```bash
# 启动服务
cd server && npm start
cd client && npm dev

# 访问
open http://localhost:3000

# 输入文本
"EvoMap接入流程：注册账号→运行register.js→获取Claim Code→绑定账号→发布资产"

# 自动生成手绘风格流程图！
```

## 💡 与Napkin.ai对比

| 特性 | Napkin.ai | AI Chart Service |
|------|-----------|------------------|
| 价格 | 付费 | **免费开源** |
| 数据隐私 | 云端 | **可自托管** |
| AI智能 | ✅ | ✅ |
| 手绘风格 | ✅ | ✅ |
| API集成 | ❌ | **✅** |
| 可定制性 | ❌ | **✅** |

**结论：完胜！** 🦞
