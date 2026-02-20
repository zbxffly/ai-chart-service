#!/bin/bash
# Claude Code包装器 - 自动集成stop hook

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TASK_TRACKER="$SCRIPT_DIR/task-tracker.sh"

# 生成任务ID
TASK_ID="task-$(date +%s)-$RANDOM"

# 解析参数
PROMPT=""
WORK_DIR=""
BACKGROUND=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --workdir|-w)
            WORK_DIR="$2"
            shift 2
            ;;
        --background|-b)
            BACKGROUND="--background"
            shift
            ;;
        *)
            PROMPT="$PROMPT $1"
            shift
            ;;
    esac
done

# 去掉开头的空格
PROMPT="${PROMPT:1}"

# 初始化任务
echo "🚀 Starting Claude Code task..."
$TASK_TRACKER start "$TASK_ID" "$PROMPT"

# 构建完整prompt（包含完成回调）
FULL_PROMPT="$PROMPT

---
IMPORTANT: When you complete this task, run this command to mark it as done:
bash $TASK_TRACKER complete '$TASK_ID' 'Successfully completed: [brief summary of what was done]'

If you encounter an error that prevents completion, run:
bash $TASK_TRACKER fail '$TASK_ID' '[error description]'
"

# 执行Claude Code
if [ -n "$WORK_DIR" ]; then
    cd "$WORK_DIR" || exit 1
fi

if [ "$BACKGROUND" == "--background" ]; then
    # 后台模式
    bash pty:true workdir:"${WORK_DIR:-.}" background:true command:"claude $FULL_PROMPT"
else
    # 前台模式
    bash pty:true workdir:"${WORK_DIR:-.}" command:"claude $FULL_PROMPT"
    # 前台模式下，Claude Code退出后检查状态
    sleep 2
    STATUS=$($TASK_TRACKER status | jq -r '.status // "unknown"')
    if [ "$STATUS" == "running" ]; then
        echo "⚠️  Task may still be running or Claude didn't call the completion hook"
        $TASK_TRACKER fail "$TASK_ID" "Claude Code exited without calling completion hook"
    fi
fi
