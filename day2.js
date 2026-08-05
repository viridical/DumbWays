(function() {
    'use strict';

    const form = document.getElementById('guestForm');
    const nameInput = document.getElementById('fullName');
    const messageInput = document.getElementById('message');
    const messagesList = document.getElementById('messagesList');
    const countBadge = document.getElementById('countBadge');

    const initialMessages = [
        { name: 'Teddy', text: 'Love it!' },
        { name: 'Bahlul', text: 'Cool!' },
        { name: 'Nina', text: 'Congrats!' },
        { name: 'Budi', text: 'Awesome!' },
    ];

    function getMessages() {
        const stored = localStorage.getItem('guestbook_messages');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) return parsed;
            } catch (_) {}
        }
        return [];
    }

    function saveMessages(messages) {
        localStorage.setItem('guestbook_messages', JSON.stringify(messages));
    }

    function renderMessages() {
        messagesList.innerHTML = '';
        let messages = getMessages();

        if (messages.length === 0) {
            const existing = localStorage.getItem('guestbook_messages');
            if (!existing) {
                saveMessages(initialMessages);
                messages = initialMessages.slice();
            } else {
                const li = document.createElement('li');
                li.className = 'empty-message';
                li.textContent = 'No messages yet. Be the first!';
                messagesList.appendChild(li);
                countBadge.textContent = '0';
                return;
            }
        }

        if (messages.length === 0) {
            const li = document.createElement('li');
            li.className = 'empty-message';
            li.textContent = 'No messages yet. Be the first!';
            messagesList.appendChild(li);
            countBadge.textContent = '0';
            return;
        }

        for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            const li = document.createElement('li');
            li.className = 'message-item';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'message-name';
            nameSpan.textContent = msg.name || 'Anonymous';

            const dot = document.createElement('span');
            dot.className = 'divider-dot';
            dot.textContent = '·';

            const textSpan = document.createElement('span');
            textSpan.className = 'message-text';
            textSpan.textContent = msg.text || '';

            li.appendChild(nameSpan);
            li.appendChild(dot);
            li.appendChild(textSpan);

            messagesList.appendChild(li);
        }

        countBadge.textContent = messages.length;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const msg = messageInput.value.trim();

        if (!name || !msg) {
            if (!name) nameInput.focus();
            else if (!msg) messageInput.focus();
            return;
        }

        const messages = getMessages();
        messages.push({ name, text: msg });
        saveMessages(messages);
        renderMessages();

        nameInput.value = '';
        messageInput.value = '';
        nameInput.focus();
    }

    form.addEventListener('submit', handleSubmit);
    renderMessages();
})();