// 简化版JavaScript，包含核心功能

// 初始化头像 - 圆形设计
function initAvatar() {
    const currentAvatar = document.getElementById('current-avatar');
    
    if (currentAvatar) {
        // 设置头像容器为圆形
        currentAvatar.style.width = '150px';
        currentAvatar.style.height = '150px';
        currentAvatar.style.borderRadius = '50%';
        currentAvatar.style.border = '3px solid rgba(255, 255, 255, 1)';
        currentAvatar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        currentAvatar.style.margin = '0 auto';
        currentAvatar.style.position = 'relative';
        currentAvatar.style.overflow = 'hidden';
        currentAvatar.style.display = 'flex';
        currentAvatar.style.alignItems = 'center';
        currentAvatar.style.justifyContent = 'center';
        currentAvatar.style.backgroundColor = '#f5f5f5';
        
        // 从localStorage加载保存的头像
        const savedAvatar = localStorage.getItem('userUploadedAvatar') || localStorage.getItem('userAvatar');
        
        if (savedAvatar) {
            // 清除现有内容
            currentAvatar.innerHTML = '';
            
            // 创建图片元素
            const img = document.createElement('img');
            img.src = savedAvatar;
            img.alt = '用户头像';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%'; // 确保图片也是圆形的
            
            // 添加图片到容器
            currentAvatar.appendChild(img);
            
            // 移除背景色设置
            currentAvatar.style.backgroundColor = 'transparent';
        } else {
            // 显示默认的提示文字
            const defaultText = document.createElement('span');
            defaultText.textContent = '个人头像';
            defaultText.style.fontSize = '16px';
            defaultText.style.color = '#333';
            defaultText.style.textAlign = 'center';
            
            currentAvatar.innerHTML = '';
            currentAvatar.appendChild(defaultText);
        }
    }
}

// 加载保存的背景图片
function loadBackground() {
    // 从localStorage加载保存的背景
    const savedBg = localStorage.getItem('userUploadedBg') || localStorage.getItem('userBackground');
    
    if (savedBg) {
        document.body.style.backgroundImage = `url('${savedBg}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    initAvatar();
    loadBackground();
});

// 留言板切换功能

// 留言板切换功能
const guestbookToggle = document.getElementById('guestbook-toggle');
const guestbookSection = document.getElementById('guestbook-section');

if (guestbookToggle && guestbookSection) {
    guestbookToggle.addEventListener('click', () => {
        guestbookSection.classList.toggle('hidden');
        
        // 切换按钮文本
        const buttonText = guestbookSection.classList.contains('hidden') ? 
            '留言板' : '隐藏留言板';
        
        // 更新按钮内容（保留第一个子元素，通常是图标）
        if (guestbookToggle.children.length > 0) {
            guestbookToggle.children[0].textContent = buttonText;
        } else {
            guestbookToggle.textContent = buttonText;
        }
        
        // 如果显示留言板，则滚动到留言板位置
        if (!guestbookSection.classList.contains('hidden')) {
            guestbookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// 表单提交功能
const messageForm = document.getElementById('message-form');
const messagesList = document.querySelector('.messages-container');

if (messageForm && messagesList) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const nameInput = messageForm.querySelector('input[type="text"]');
        const messageInput = messageForm.querySelector('textarea');
        
        if (nameInput && messageInput) {
            const name = nameInput.value.trim();
            const content = messageInput.value.trim();
            
            // 简单验证
            if (name && content) {
                // 创建新留言元素
                const messageItem = document.createElement('div');
                messageItem.className = 'message-item';
                
                // 设置留言内容（简单版本）
                messageItem.innerHTML = `
                    <div class="message-header">
                        <span class="message-author">${escapeHtml(name)}</span>
                        <span class="message-time">${new Date().toLocaleString()}</span>
                    </div>
                    <div class="message-content">${escapeHtml(content)}</div>
                `;
                
                // 添加留言到列表
                const noMessages = messagesList.querySelector('.no-messages');
                if (noMessages) {
                    messagesList.removeChild(noMessages);
                }
                
                messagesList.appendChild(messageItem);
                
                // 重置表单
                messageForm.reset();
                
                // 滚动到新留言
                messageItem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// HTML转义函数（防止XSS攻击）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}