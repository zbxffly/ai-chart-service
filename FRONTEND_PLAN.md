# AI Chart Service - 前端规划文档

## 🎯 设计目标

打造一个**简洁、直观、强大**的AI图表生成界面，用户体验优于Napkin.ai！

## 📐 核心功能

### 1. AI对话式图表生成
- **输入方式:** 自然语言描述
- **实时反馈:** AI理解+解析状态显示
- **迭代优化:** 支持多轮对话修改图表

### 2. 可视化编辑器
- **集成Excalidraw:** 手绘风格实时预览
- **拖拽编辑:** 调整节点位置、连线
- **样式定制:** 颜色、粗细、字体

### 3. 多格式导出
- PNG (高质量)
- SVG (矢量)
- Excalidraw JSON (可编辑)

## 🎨 UI设计

### 主界面布局

```
┌────────────────────────────────────────────────────────────┐
│  🦞 AI Chart Service                          [设置] [帮助] │
├──────────────┬─────────────────────────────────────────────┤
│              │                                              │
│   💬 AI对话  │          📊 图表预览区                      │
│              │          (Excalidraw Canvas)                │
│  用户:       │                                              │
│  "EvoMap流程" │                                              │
│       ↓     │                                              │
│  AI: 解析中  │         [导出PNG] [导出SVG] [分享]         │
│       ↓     │                                              │
│  AI: 已生成  │                                              │
│              │                                              │
│  [输入框]    │                                              │
│  [发送]      │                                              │
└──────────────┴─────────────────────────────────────────────┘
```

### 配色方案

```css
/* 手绘风格配色 - 参考 Excalidraw */
--primary: #6965db;      /* 主色调 - 紫蓝 */
--success: #5f9e6f;      /* 成功 - 绿 */
--warning: #f4b400;      /* 警告 - 黄 */
--danger: #d04444;       /* 危险 - 红 */
--bg-canvas: #f8f9fa;    /* 画布背景 */
--bg-panel: #ffffff;     /* 面板背景 */
--text-primary: #1e1e1e; /* 主文本 */
--text-secondary: #5f6368; /* 次要文本 */
```

## 🛠️ 技术栈

### 框架选择
- **React 18** - UI框架
- **Vite** - 构建工具（快）
- **@excalidraw/excalidraw** - 图表编辑器
- **axios** - API调用
- **tailwindcss** - 样式（可选，或用CSS Modules）

### 目录结构

```
client/
├── src/
│   ├── App.jsx              # 主应用
│   ├── main.jsx             # 入口
│   ├── components/
│   │   ├── ChatPanel.jsx    # AI对话面板
│   │   ├── Editor.jsx       # Excalidraw编辑器
│   │   ├── ExportModal.jsx  # 导出对话框
│   │   ├── LoadingSpinner.jsx
│   │   └── StatusBar.jsx    # 状态栏
│   ├── hooks/
│   │   ├── useChart.js      # 图表状态管理
│   │   ├── useChat.js       # 聊天状态管理
│   │   └── useExcalidraw.js # Excalidraw封装
│   ├── services/
│   │   └── api.js           # API调用
│   └── styles/
│       ├── App.css
│       └── variables.css    # CSS变量
├── package.json
└── vite.config.js
```

## 📱 核心组件设计

### 1. ChatPanel.jsx (AI对话面板)

**功能:**
- 显示对话历史
- 输入框 + 发送按钮
- AI思考状态动画
- 错误提示

**状态:**
```jsx
{
  messages: [
    { role: 'user', content: '画一个流程图' },
    { role: 'assistant', content: '好的，正在生成...' },
    { role: 'system', content: '图表已生成', type: 'chart_generated' }
  ],
  isLoading: false,
  error: null
}
```

### 2. Editor.jsx (Excalidraw编辑器)

**功能:**
- 嵌入@excalidraw/excalidraw
- 接收初始数据（从API）
- 导出变更（onChange回调）
- 工具栏定制

**Props:**
```jsx
{
  initialData: ExcalidrawJSON | null,
  onChange: (elements) => void,
  readOnly: false
}
```

### 3. ExportModal.jsx (导出对话框)

**功能:**
- 选择导出格式 (PNG/SVG/JSON)
- 预览缩略图
- 下载按钮
- 分享链接（可选）

## 🔄 数据流

```
用户输入 "画一个流程图"
    ↓
ChatPanel 调用 API
    ↓
POST /api/generate { text: "..." }
    ↓
后端返回 Excalidraw JSON
    ↓
Editor 渲染图表
    ↓
用户手动调整
    ↓
点击导出 → 下载文件
```

## 🎯 用户体验优化

### 1. 快速开始（空白状态）
- **示例提示:** "试试说：画一个用户注册流程图"
- **一键示例:** 点击加载预设图表
- **帮助链接:** 快速入门教程

### 2. 加载状态
- **骨架屏:** Excalidraw区域显示占位符
- **进度指示:** "AI正在思考... 23%"
- **取消按钮:** 允许中断长时间任务

### 3. 错误处理
- **友好提示:** "AI画不出来这个，试试换个说法？"
- **重试按钮:** 一键重试
- **降级方案:** 文本描述转Mermaid代码

### 4. 键盘快捷键
- `Ctrl/Cmd + Enter` - 发送消息
- `Ctrl/Cmd + S` - 导出PNG
- `Ctrl/Cmd + E` - 导出SVG
- `Ctrl/Cmd + Z` - 撤销
- `Ctrl/Cmd + Shift + Z` - 重做

## 📊 与Napkin.ai对比

| 特性 | Napkin.ai | AI Chart Service |
|------|-----------|------------------|
| 界面风格 | 现代简约 | 手绘风（Excalidraw） |
| 编辑能力 | ❌ 只能AI生成 | ✅ 可手动编辑 |
| 实时预览 | ✅ | ✅ |
| 导出格式 | PNG/SVG | PNG/SVG/JSON |
| 开源 | ❌ | ✅ |
| 自托管 | ❌ | ✅ |
| 可定制 | ❌ | ✅ |

**我们的优势：**
1. 开源免费
2. 可自托管（数据安全）
3. 支持手动编辑（Excalidraw强大编辑功能）
4. 导出JSON格式（可再次导入编辑）

## 🚀 开发优先级

### Phase 1: MVP（最小可行产品）
- ✅ ChatPanel基础界面
- ✅ Editor集成Excalidraw
- ✅ API调用 (POST /api/generate)
- ✅ PNG导出

### Phase 2: 优化
- ✅ 多轮对话修改图表
- ✅ SVG导出
- ✅ 历史记录
- ✅ 键盘快捷键

### Phase 3: 高级功能
- ✅ 模板库
- ✅ 团队协作
- ✅ API密钥管理
- ✅ 自定义样式主题

## 🎨 参考设计

**灵感来源:**
- Excalidraw官网 - 手绘风格UI
- ChatGPT - 对话式交互
- Figma - 专业编辑器
- Napkin.ai - AI生成体验

**配色参考:**
- Excalidrow默认配色
- GitHub Primer
- Notion简洁风

## 📝 下一步

1. **创建React项目** (用Claude Code)
2. **安装依赖**
   ```bash
   npm create vite@latest client -- --template react
   cd client && npm install
   npm install @excalidraw/excalidraw axios
   ```
3. **实现ChatPanel组件**
4. **集成Excalidraw**
5. **连接后端API**

---

老板，前端规划完成！需要我：
1. 立即开始用Claude Code创建前端项目？
2. 先写一个静态mockup预览？
3. 继续等后端API完成后再动前端？

🦞 请吩咐！
