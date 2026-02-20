# Claude创建前端React项目

## 项目位置
/root/.openclaw/workspace/ai-chart-service/client

## 任务

### 1. 创建Vite + React项目
```bash
cd /root/.openclaw/workspace/ai-chart-service
npm create vite@latest client -- --template react
```

### 2. 安装依赖
```bash
cd client
npm install
npm install @excalidraw/excalidraw axios
```

### 3. 创建组件结构
```bash
mkdir -p src/{components,hooks,services,styles}
```

### 4. 创建App.jsx基础结构
- 左侧：ChatPanel (对话框)
- 右侧：Editor (Excalidraw)
- 响应式布局

### 5. 创建ChatPanel.jsx
- 消息列表
- 输入框
- 发送按钮
- 模拟API调用（先用setTimeout）

### 6. 集成Excalidraw
- 创建Editor.jsx
- 导入@excalidraw/excalidraw
- 显示默认示例数据

### 7. 基础样式
- App.css - 布局
- variables.css - 颜色变量

### 8. 测试运行
```bash
npm run dev
# 访问 http://localhost:5173
```

## 完成标准
1. ✅ 页面可访问 (localhost:5173)
2. ✅ 左右布局正常
3. ✅ ChatPanel可以发送消息（模拟）
4. ✅ Editor显示Excalidraw画布
5. ✅ 无console错误

## 完成后
运行: bash /root/.openclaw/workspace/ai-chart-service/task-tracker.sh complete "frontend-mvp" "前端MVP已完成，ChatPanel + Editor基础功能可用"

开始！不要问，直接实现。
