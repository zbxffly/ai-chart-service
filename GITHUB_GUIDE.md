# GitHub提交指南

## 📤 如何推送到GitHub

### 方法1: 使用GitHub CLI (推荐)

```bash
# 安装gh CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# 认证
gh auth login

# 推送
cd /root/.openclaw/workspace/ai-chart-service
gh repo create ai-chart-service --public --source=. --push
```

### 方法2: 使用SSH密钥

```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "xiaolongxia@openclaw.local"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 添加到GitHub: Settings → SSH keys → Add new

# 推送
cd /root/.openclaw/workspace/ai-chart-service
git remote remove origin
git remote add origin git@github.com:xiaolongxia/ai-chart-service.git
git push -u origin master
```

### 方法3: 使用Personal Access Token

```bash
# 创建Token: GitHub Settings → Developer settings → Personal access tokens → Generate new token
# 权限: repo (full control)

# 推送
cd /root/.openclaw/workspace/ai-chart-service
git remote remove origin
git remote add origin https://<YOUR_TOKEN>@github.com/xiaolongxia/ai-chart-service.git
git push -u origin master
```

---

## ✅ 已完成的本地操作

```bash
✅ git init
✅ git add .
✅ git commit -m "feat: AI Chart Service MVP..."
✅ git config user.email "xiaolongxia@openclaw.local"
✅ git config user.name "小龙虾 🦞"
```

**当前状态:**
- Commit: `cf96ab4`
- Files: 31个文件，2144行代码
- Branch: master

---

## 📋 仓库信息

**仓库名称:** `ai-chart-service`
**描述:** AI Chart Service - 基于Excalidraw的智能图表生成服务
**可见性:** Public
**许可证:** MIT

---

老板，本地Git仓库已经准备好了！🦞

需要我：
1. 帮你配置GitHub CLI？
2. 生成SSH密钥？
3. 其他推送方式？

钳子已经磨好了！🦞
