// История сообщений для каждого чата
const chatHistory = {
    1: [], // Пустой чат для Ивана Петрова
    2: [
        { sender: "Мария Сидорова", message: "Здравствуйте! У меня вопрос по вкладам." },
        { sender: "Вы", message: "Здравствуйте, Мария! Чем могу помочь?" }
    ],
    3: [
        { sender: "Алексей Иванов", message: "Привет! Нужна помощь с техническими вопросами." },
        { sender: "Вы", message: "Привет, Алексей! Опишите проблему." }
    ],
    4: [
        { sender: "Ольга Кузнецова", message: "Добрый день! Хочу обсудить условия ипотеки." },
        { sender: "Вы", message: "Добрый день, Ольга! Какие именно условия вас интересуют?" }
    ],
    5: [
        { sender: "Дмитрий Смирнов", message: "Привет! Нужен финансовый отчет за прошлый месяц." },
        { sender: "Вы", message: "Привет, Дмитрий! Отчет уже готов, отправляю вам." }
    ],
    6: [
        { sender: "Елена Васнецова", message: "Добрый день! Нужно обсудить кредитные риски." },
        { sender: "Вы", message: "Добрый день, Елена! Давайте обсудим." }
    ],
    7: [
        { sender: "Общий чат", message: "Добро пожаловать в общий чат!" }
    ]
};

// История опасных запросов
const confidentialHistory = [];

// Имя пользователя
let userName = "Вы";

// Обработка выбора чата
document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.chat-item').forEach(chat => chat.classList.remove('active'));
        this.classList.add('active');
        this.classList.remove('unread');
        const unreadDot = this.querySelector('.unread-dot');
        if (unreadDot) {
            unreadDot.remove();
        }
        const chatName = this.querySelector('strong').textContent;
        const chatTheme = this.querySelector('p').textContent;
        document.getElementById('active-chat-name').textContent = `${chatName} - ${chatTheme}`;
        const chatId = this.getAttribute('data-chat');
        loadChatHistory(chatId);
    });
});

// Загрузка истории сообщений
function loadChatHistory(chatId) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    chatHistory[chatId].forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (msg.blocked) {
            messageElement.classList.add('blocked-message');
        }
        if (msg.file) {
            messageElement.innerHTML = `<strong>${msg.sender}</strong><p>Прикрепленный файл: <i>${msg.file}</i></p>`;
        } else {
            messageElement.innerHTML = `<strong>${msg.sender}</strong><p>${msg.message}</p>`;
        }
        chatMessages.appendChild(messageElement);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Обработка выбора файла
document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('file-name').textContent = file.name;
    }
});
// Отправка текста на сервер Flask для проверки
async function checkConfidentiality(text) {
    try {
        const response = await fetch("http://127.0.0.1:8080/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();
        return data.confidential; // true - конфиденциально, false - нет
    } catch (error) {
        console.error("Ошибка при проверке конфиденциальности:", error);
        return false; // Если сервер недоступен, считаем текст неконфиденциальным
    }
}
// Обработка отправки сообщения
document.getElementById('send-button').addEventListener('click', async function() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    const chatMessages = document.getElementById('chat-messages');
    const chatWarning = document.getElementById('chat-warning');

    if (messageText === '') return;

    const activeChat = document.querySelector('.chat-item.active');
    const chatId = activeChat.getAttribute('data-chat');

    // Проверяем текст через Flask API
    const isConfidential = await checkConfidentiality(messageText);

    if (isConfidential) {
        chatWarning.style.display = 'block';
        confidentialHistory.push({ sender: userName, message: messageText });
        updateConfidentialHistory();
        updateAnalyticsChart();

        // Добавляем сообщение как "заблокированное"
        chatHistory[chatId].push({ sender: userName, message: messageText, blocked: true });
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'blocked-message');
        messageElement.innerHTML = `<strong>${userName}</strong><p>${messageText} (ЗАБЛОКИРОВАНО)</p>`;
        chatMessages.appendChild(messageElement);

        setTimeout(() => {
            chatWarning.style.display = 'none';
        }, 3000);
    } else {
        // Если нет конфиденциальных данных, отправляем сообщение
        chatHistory[chatId].push({ sender: userName, message: messageText });
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${userName}</strong><p>${messageText}</p>`;
        chatMessages.appendChild(messageElement);
    }

    messageInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    updateMessageLogs();
});

// Проверка на конфиденциальную информацию
function containsConfidentialInfo(text) {
    return filterRules.some(rule => rule.pattern.test(text));
}

// Обновление истории опасных запросов
function updateConfidentialHistory() {
    const historyList = document.getElementById('confidential-history-list');
    historyList.innerHTML = '';
    confidentialHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Попытка отправить конфиденциальную информацию!!!: ${item.sender} - ${item.message}`;
        historyList.appendChild(listItem);
    });
}

// График аналитики
const analyticsChart = new Chart(document.getElementById('analytics-chart'), {
    type: 'bar',
    data: {
        labels: ['Заблокированные запросы'], // Подпись оси X
        datasets: [{
            label: 'Количество заблокированных запросов', // Подпись для легенды
            data: [confidentialHistory.length], // Данные для графика
            backgroundColor: '#1abc9c', // Цвет столбца
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true, // Начинать ось Y с нуля
                title: {
                    display: true,
                    text: 'Количество запросов' // Подпись оси Y
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Тип запросов' // Подпись оси X
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Заблокировано: ${context.raw}`; // Подпись при наведении
                    }
                }
            },
            datalabels: { // Добавляем подписи на столбцы
                anchor: 'end',
                align: 'top',
                formatter: function(value) {
                    return value; // Отображаем количество запросов на столбце
                },
                color: '#000', // Цвет текста
                font: {
                    weight: 'bold'
                }
            }
        }
    }
});

// Обновление графика аналитики
function updateAnalyticsChart() {
    analyticsChart.data.datasets[0].data = [confidentialHistory.length];
    analyticsChart.update();
}

// Установка имени пользователя
const userNameInput = document.getElementById('user-name-input');
userNameInput.addEventListener('input', function() {
    userName = this.value || "Вы";
});

// Открытие/закрытие настроек
const settingsIcon = document.getElementById('settings-icon');
const settingsSidebar = document.getElementById('settings-sidebar');
const closeSettings = document.getElementById('close-settings');

settingsIcon.addEventListener('click', function() {
    settingsSidebar.classList.add('open');
});

closeSettings.addEventListener('click', function() {
    settingsSidebar.classList.remove('open');
});

// Открытие/закрытие панели администратора
const adminPanelButton = document.getElementById('admin-panel-button');
const adminPanel = document.getElementById('admin-panel');
const closeAdminPanel = document.getElementById('close-admin-panel');

adminPanelButton.addEventListener('click', function() {
    adminPanel.classList.add('open');
});

closeAdminPanel.addEventListener('click', function() {
    adminPanel.classList.remove('open');
});

// Переключение вкладок в панели администратора
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const tabId = this.getAttribute('data-tab');
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    });
});

// Логи сообщений
function updateMessageLogs() {
    const logsList = document.getElementById('message-logs-list');
    logsList.innerHTML = '';
    Object.values(chatHistory).forEach(chat => {
        chat.forEach(message => {
            const logItem = document.createElement('li');
            logItem.textContent = `${message.sender}: ${message.message || message.file}`;
            if (message.blocked) {
                logItem.classList.add('blocked-log');
            }
            logsList.appendChild(logItem);
        });
    });
}

// Настройки фильтрации
function updateFilterRules() {
    const rulesList = document.getElementById('filter-rules-list');
    rulesList.innerHTML = '';
    filterRules.forEach((rule, index) => {
        const ruleItem = document.createElement('li');
        ruleItem.textContent = rule.description;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            filterRules.splice(index, 1);
            updateFilterRules();
        });
        ruleItem.appendChild(deleteButton);
        rulesList.appendChild(ruleItem);
    });
}

document.getElementById('add-filter-rule').addEventListener('click', function() {
    const newRule = document.getElementById('new-filter-rule').value.trim();
    if (newRule) {
        filterRules.push({ pattern: new RegExp(newRule, 'i'), description: newRule });
        updateFilterRules();
        document.getElementById('new-filter-rule').value = '';
    }

});



// Инициализация
updateMessageLogs();
updateFilterRules();
loadChatHistory(1);