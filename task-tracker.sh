#!/bin/bash
# Claude Code任务跟踪器 - Stop Hook实现
# 用法: 在Claude Code prompt末尾加上此脚本的调用

TASK_DIR="${TASK_DIR:-/root/.openclaw/workspace/ai-chart-service}"
TASK_STATUS_FILE="$TASK_DIR/.task-status.json"
TASK_LOG_FILE="$TASK_DIR/.task-log.jsonl"

# 初始化任务目录
mkdir -p "$TASK_DIR"

# 记录任务开始
log_task_start() {
    local task_id="$1"
    local task_desc="$2"
    local timestamp=$(date -Iseconds)

    cat >> "$TASK_LOG_FILE" <<EOF
{"event": "start", "task_id": "$task_id", "description": "$task_desc", "timestamp": "$timestamp"}
EOF

    # 更新状态文件
    cat > "$TASK_STATUS_FILE" <<EOF
{
  "task_id": "$task_id",
  "description": "$task_desc",
  "status": "running",
  "start_time": "$timestamp",
  "end_time": null,
  "result": null
}
EOF

    echo "📋 Task started: $task_desc"
    echo "   Task ID: $task_id"
    echo "   Status file: $TASK_STATUS_FILE"
}

# 记录任务完成
log_task_complete() {
    local task_id="$1"
    local result="$2"
    local timestamp=$(date -Iseconds)

    # 读取当前状态
    if [ -f "$TASK_STATUS_FILE" ]; then
        temp=$(cat "$TASK_STATUS_FILE")
        # 更新为完成状态
        echo "$temp" | jq --arg result "$result" \
            '.status = "done" | .end_time = "'"$timestamp"'" | .result = $result' \
            > "$TASK_STATUS_FILE".tmp && mv "$TASK_STATUS_FILE".tmp "$TASK_STATUS_FILE"
    fi

    # 记录到日志
    cat >> "$TASK_LOG_FILE" <<EOF
{"event": "complete", "task_id": "$task_id", "result": "$result", "timestamp": "$timestamp"}
EOF

    echo "✅ Task completed: $task_id"
    echo "   Result: $result"

    # 如果openclaw可用，发送系统事件
    if command -v openclaw &> /dev/null; then
        openclaw system event --text "Task done: $task_id - $result" --mode now 2>/dev/null || true
    fi
}

# 记录任务失败
log_task_fail() {
    local task_id="$1"
    local error="$2"
    local timestamp=$(date -Iseconds)

    # 读取当前状态
    if [ -f "$TASK_STATUS_FILE" ]; then
        temp=$(cat "$TASK_STATUS_FILE")
        echo "$temp" | jq --arg error "$error" \
            '.status = "failed" | .end_time = "'"$timestamp"'" | .result = $error' \
            > "$TASK_STATUS_FILE".tmp && mv "$TASK_STATUS_FILE".tmp "$TASK_STATUS_FILE"
    fi

    cat >> "$TASK_LOG_FILE" <<EOF
{"event": "fail", "task_id": "$task_id", "error": "$error", "timestamp": "$timestamp"}
EOF

    echo "❌ Task failed: $task_id"
    echo "   Error: $error"

    if command -v openclaw &> /dev/null; then
        openclaw system event --text "Task failed: $task_id - $error" --mode now 2>/dev/null || true
    fi
}

# 查询任务状态
check_task_status() {
    if [ -f "$TASK_STATUS_FILE" ]; then
        cat "$TASK_STATUS_FILE" | jq '.'
    else
        echo '{"error": "No active task"}'
    fi
}

# 主命令
case "${1:-}" in
    start)
        log_task_start "$2" "$3"
        ;;
    complete|done)
        log_task_complete "$2" "$3"
        ;;
    fail|error)
        log_task_fail "$2" "$3"
        ;;
    status|check)
        check_task_status
        ;;
    *)
        echo "Usage: $0 {start|complete|fail|status} [task_id] [description/result]"
        exit 1
        ;;
esac
