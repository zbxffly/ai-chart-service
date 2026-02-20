import { useState } from 'react'
import './App.css'
import Editor from '@excalidraw/excalidraw'
import ChatPanel from './components/ChatPanel'

function App() {
  const [excalidrawData, setExcalidrawData] = useState(null)

  const handleChartGenerated = (data) => {
    setExcalidrawData(data)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🦞 AI Chart Service</h1>
        <p>Powered by Excalidraw + AI</p>
      </header>
      <div className="app-content">
        <ChatPanel onChartGenerated={handleChartGenerated} />
        <div className="editor-panel">
          {excalidrawData ? (
            <Editor
              initialData={excalidrawData}
              onChange={(elements) => console.log('Editor changed:', elements)}
            />
          ) : (
            <div className="editor-placeholder">
              <h2>📊 等待生成图表...</h2>
              <p>在左侧输入描述，AI将生成手绘风格图表</p>
              <div className="example-text">
                <strong>试试说：</strong><br/>
                "步骤1: 注册账号 → 步骤2: 获取Claim Code → 步骤3: 绑定账号"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
