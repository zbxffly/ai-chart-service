# Claude Code Stop Hook 配置方案

## 目标
配置Claude Code的stop hook，实现非阻塞的任务完成监听。

## 方案1: 使用OpenClaw的system event（推荐）

在Claude Code任务结束时调用：
```bash
openclaw system event --text "Task completed: [description]" --mode now
```

## 方案2: 使用回调文件

在任务目录下创建一个状态文件：
```bash
echo '{"status": "done", "timestamp": "'$(date -Iseconds)'"}' > .task-status.json
```

## 方案3: 使用Webhook

如果Claude Code支持webhook配置，设置完成回调URL。

## 实施计划
1. 先检查Claude Code是否支持配置文件
2. 测试system event方式
3. 如果不行，回退到文件状态方式
