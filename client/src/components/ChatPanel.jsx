import { useState } from 'react'
import axios from 'axios'
import './ChatPanel.css'

const API_URL = 'http://localhost:3001'

function ChatPanel({ onChartGenerated }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是AI图表助手。请描述你想画的图表，我会帮你生成。' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Add loading message
    setMessages(prev => [...prev, { role: 'assistant', content: '正在生成图表...' }])

    try {
      const response = await axios.post(`${API_URL}/api/generate`, {
        text: input
      })

      if (response.data.success) {
        const chartData = response.data.data
        onChartGenerated(chartData)

        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: '图表已生成！你可以在右侧查看和编辑。'
          }
          return newMessages
        })
      } else {
        throw new Error('Failed to generate chart')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: `抱歉，生成失败：${error.message}`
        }
        return newMessages
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>💬 AI对话</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="描述你想画的图表..."
          disabled={isLoading}
          rows={3}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="send-button"
        >
          {isLoading ? '生成中...' : '发送 📤'}
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
