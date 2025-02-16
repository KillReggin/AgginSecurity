// История сообщений для каждого чата
const chatHistory = {
    1: [
        { sender: "Иван Петров", message: "Привет! Ты на работе?", time: "09:00", date: "2025-02-08" },
        { sender: "Вы", message: "Привет! Да.", time: "09:05", date: "2025-02-08" },
        { sender: "Иван Петров", message: "Отлично, жди меня.", time: "09:10", date: "2025-02-08" }
    ],
    2: [
        { sender: "Мария Сидорова", message: " Как дела?", time: "10:00", date: "2025-02-08" },
        { sender: "Вы", message: "Добро утро! Все отлично, спасибо. А у тебя?", time: "10:05", date: "2025-02-08" }
    ],
    3: [
        { sender: "Алексей Иванов", message: "Привет! До скольки ты сегодня на работе?", time: "11:00", date: "2025-02-09" },
        { sender: "Вы", message: "Привет! До 18:00.", time: "11:05", date: "2025-02-09" }
    ],
    4: [
        { sender: "Ольга Кузнецова", message: "Привет! Как продвигается проект?", time: "12:00", date: "2025-02-02" },
        { sender: "Вы", message: "Привет! Все идет по плану(помогите), скоро закончим (нет).", time: "12:05", date: "2025-02-02" }
    ],
    5: [
        { sender: "Общий чат", message: "Вы вступили в общий чат!", time: "09:00", date: "2025-02-04" },
        { sender: "Иван Петров", message: "Привет всем! Как дела?", time: "09:05", date: "2025-02-04" },
        { sender: "Мария Сидорова", message: "Привет! Все отлично, спасибо.", time: "09:10", date: "2025-02-04" },
        { sender: "Алексей Иванов", message: "Привет! У меня все хорошо.", time: "09:15", date: "2025-02-04" },
        { sender: "Ольга Кузнецова", message: "Привет! Все в порядке.", time: "09:20", date: "2025-02-04" },
        { sender: "Иван Петров", message: "Кто-нибудь знает, когда будет следующее собрание?", time: "09:25", date: "2025-02-04" },
        { sender: "Мария Сидорова", message: "На следующей неделе, в среду.", time: "09:30", date: "2025-02-04" },
        { sender: "Алексей Иванов", message: "Да, в 10:00.", time: "09:35", date: "2025-02-04" },
        { sender: "Ольга Кузнецова", message: "Я буду присутствовать.", time: "09:40", date: "2025-02-04" },
        { sender: "Иван Петров", message: "Отлично, спасибо за информацию.", time: "09:45", date: "2025-02-04" },
        { sender: "Мария Сидорова", message: "Пожалуйста!", time: "09:50", date: "2025-02-04" },
        { sender: "Алексей Иванов", message: "Кто-нибудь уже видел новый отчет?", time: "09:55", date: "2025-02-04" },
        { sender: "Ольга Кузнецова", message: "Да, я его уже просмотрела.", time: "10:00", date: "2025-02-04" },
        { sender: "Иван Петров", message: "Я еще не видел, но планирую сегодня.", time: "10:05", date: "2025-02-04" },
        { sender: "Мария Сидорова", message: "Он очень информативный.", time: "10:10", date: "2025-02-04" },
        { sender: "Алексей Иванов", message: "Согласен, хорошая работа.", time: "10:15", date: "2025-02-04" },
        { sender: "Ольга Кузнецова", message: "Спасибо!", time: "10:20", date: "2025-02-04" },
        { sender: "Иван Петров", message: "Кто-нибудь знает, когда будет следующий релиз?", time: "10:25", date: "2025-02-04" },
        { sender: "Мария Сидорова", message: "На следующей неделе, в пятницу.", time: "10:30", date: "2025-02-04" },
        { sender: "Алексей Иванов", message: "Да, планируем выпустить в 15:00.", time: "10:35", date: "2025-02-04" },
        { sender: "Ольга Кузнецова", message: "Я уже готовлю документацию.", time: "10:40", date: "2025-02-04" },
        { sender: "Иван Петров", message: "Отлично, спасибо всем за информацию.", time: "10:45", date: "2025-02-04" },
        { sender: "Мария Сидорова", message: "Пожалуйста!", time: "10:50", date: "2025-02-04" },
        { sender: "Алексей Иванов", message: "Кто-нибудь уже видел новый дизайн?", time: "10:55", date: "2025-02-04" },
        { sender: "Ольга Кузнецова", message: "Да, он выглядит очень современно.", time: "11:00", date: "2025-02-04" },
        { sender: "Иван Петров", message: "Я тоже его видел, мне нравится.", time: "11:05", date: "2025-02-04" },
        { sender: "Мария Сидорова", message: "Согласна, отличная работа.", time: "11:10", date: "2025-02-04" },
        { sender: "Алексей Иванов", message: "Спасибо всем за отзывы!", time: "11:15", date: "2025-02-04" }
    ]
};

const confidentialHistory = [
    { sender: "Мария Сидорова", message: "Иванов Петр Алексеевич 27.08.1998 нужна кредитная история ", date: "2025-02-05", time: "10:10" },
    { sender: "Ольга Кузнецова", message: "Всволодови  Третьов : Данные банковской карты 25768  63497  17904  81359, срок действия: 81/22", date: "2025-02-06", time: "12:17" }
];

// Имя пользователя
let userName = "Вы";

// Фильтры для конфиденциальной информации
let filterRules = [
    { pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, description: 'Номер банковской карты' },
    { pattern: /\b\d{4}[\s-]?\d{6}\b/, description: 'Паспортные данные' },
    { pattern: /\b[А-Яа-я]+\s[А-Яа-я]+\s[А-Яа-я]+\b/, description: 'ФИО' },
    { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, description: 'Email адрес' },
    { pattern: /\+?\d[\d -]{8,}\d/, description: 'Телефонный номер' },
    { pattern: /(ул|улица|пер|переулок|пр|проспект|д|дом|кв|квартира|г|город|пос|поселок|бульвар|набережная|аллея|проезд|шоссе)\s*[-№0-9а-яА-Я]+/, description: 'Адрес' }
];
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
    let lastDate = null;

    chatHistory[chatId].forEach(msg => {
        const currentDate = msg.date;
        if (currentDate !== lastDate) {
            const dateDivider = document.createElement('div');
            dateDivider.classList.add('date-divider');
            dateDivider.textContent = currentDate;
            chatMessages.appendChild(dateDivider);
            lastDate = currentDate;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (msg.blocked) {
            messageElement.classList.add('blocked-message');
        }
        if (msg.file) {
            messageElement.innerHTML = `<strong>${msg.sender}</strong><p>Прикрепленный файл: <i>${msg.file}</i></p><span class="message-time">${msg.time}</span>`;
        } else {
            messageElement.innerHTML = `<strong>${msg.sender}</strong><p>${msg.message}</p><span class="message-time">${msg.time}</span>`;
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

document.getElementById('send-button').addEventListener('click', async function() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    const chatMessages = document.getElementById('chat-messages');
    const chatWarning = document.getElementById('chat-warning');
    const fileInput = document.getElementById('file-input');
    const fileName = document.getElementById('file-name');

    if (messageText === '' && !fileInput.files[0]) {
        return;
    }

    const activeChat = document.querySelector('.chat-item.active');
    const chatId = activeChat.getAttribute('data-chat');
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toISOString().split('T')[0];
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

function containsConfidentialInfo(text) {
    if (!text || text.trim() === "") return false;
    return filterRules.some(rule => rule.pattern.test(text));
}


// Обновление истории опасных запросов
function updateConfidentialHistory() {
    const historyList = document.getElementById('confidential-history-list');
    historyList.innerHTML = '';
    confidentialHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Попытка отправить конфиденциальную информацию: ${item.message} (${item.date} ${item.time})`;
        historyList.appendChild(listItem);
    });
}

// График аналитики
const analyticsChart = new Chart(document.getElementById('analytics-chart'), {
    type: 'bar',
    data: {
        labels: [], // Подписи оси X (даты)
        datasets: [{
            label: 'Количество заблокированных запросов', // Подпись для легенды
            data: [], // Данные для графика
            backgroundColor: '#1abc9c', // Цвет столбца,
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
                    text: 'Дата' // Подпись оси X
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
            }
        }
    }
});

// График всех сообщений
const messagesChart = new Chart(document.getElementById('messages-chart'), {
    type: 'bar',
    data: {
        labels: [], // Подписи оси X (даты)
        datasets: [{
            label: 'Количество отправленных сообщений', // Подпись для легенды
            data: [], // Данные для графика
            backgroundColor: '#3498db', // Цвет столбца,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true, // Начинать ось Y с нуля
                title: {
                    display: true,
                    text: 'Количество сообщений' // Подпись оси Y
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Дата' // Подпись оси X
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Отправлено: ${context.raw}`; // Подпись при наведении
                    }
                }
            }
        }
    }
});

// Обновление графика аналитики
function updateAnalyticsChart() {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < 5; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i * 3); // Разница в 3 дня
        dates.push(date.toISOString().split('T')[0]);
    }
    dates.reverse(); // Чтобы последняя дата была справа

    const data = dates.map(date => confidentialHistory.filter(item => item.date === date).length); // Данные для графика

    analyticsChart.data.labels = dates;
    analyticsChart.data.datasets[0].data = data;
    analyticsChart.update();
}

// Обновление графика всех сообщений
function updateMessagesChart() {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < 5; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i * 3); // Разница в 3 дня
        dates.push(date.toISOString().split('T')[0]);
    }
    dates.reverse(); // Чтобы последняя дата была справа

    const data = dates.map(date => {
        let count = 0;
        Object.values(chatHistory).forEach(chat => {
            chat.forEach(msg => {
                if (msg.date === date) {
                    count++;
                }
            });
        });
        return count;
    });

    messagesChart.data.labels = dates;
    messagesChart.data.datasets[0].data = data;
    messagesChart.update();
}

function updateMessageLogs() {
    const logsList = document.getElementById('message-logs-list');
    logsList.innerHTML = '';
    const allMessages = [];
    Object.values(chatHistory).forEach(chat => {
        chat.forEach(message => {
            allMessages.push(message);
        });
    });

    // Добавляем сообщения из confidentialHistory
    confidentialHistory.forEach(message => {
        allMessages.push({ ...message, blocked: true }); // Добавляем флаг blocked
    });

    // Сортировка по дате
    allMessages.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

    allMessages.forEach(message => {
        const logItem = document.createElement('li');
        logItem.textContent = `${message.sender}: ${message.message || message.file} (${message.date} ${message.time})`;
        
        // Если сообщение заблокировано, добавляем класс blocked-log
        if (message.blocked || containsConfidentialInfo(message.message)) {
            logItem.classList.add('blocked-log');
        }
        
        logsList.prepend(logItem); // Добавляем логи снизу вверх
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
document.getElementById('active-chat-name').textContent = "Выберите, кому хотели бы написать";
updateAnalyticsChart(); // Инициализация графика
updateMessagesChart(); // Инициализация графика всех сообщений

// Открытие/закрытие настроек
const settingsIcon = document.getElementById('settings-icon');
const settingsSidebar = document.getElementById('settings-sidebar');
const closeSettings = document.getElementById('close-settings');

settingsIcon.addEventListener('click', function() {
    settingsSidebar.classList.add('open');
    updateConfidentialHistory(); // Обновляем историю опасных запросов при открытии настроек
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
