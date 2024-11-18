//Lockal Host
//const BACKEND_URL = "http://localhost:8080";
const BACKEND_URL = "https://chat-bot-backend-24f4.onrender.com"

document.addEventListener('DOMContentLoaded', () => {
    const chat = document.getElementById('chat');
    const sendBtn = document.getElementById('send');
    const messageInput = document.getElementById('message');
    const usernameInput = document.getElementById('username');
    const loadingSpinner = document.getElementById('loading'); // Loading spinner element

    // Set up WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${BACKEND_URL.replace('http', 'ws')}/ws`);

    ws.onopen = () => {
        fetchWelcomeMessage(); // Fetch a welcome message when connected
        appendSystemMessage('Connected to the chat.');
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
    
        if (msg.username === "Gemini Bot") {
            appendMessage(`Gemini: ${msg.content}`, 'bot'); // Gemini response
        } else if (msg.username === currentUsername) {
            appendMessage(`${currentUsername}: ${msg.content}`, 'user'); // Ваше сообщение
        } else {
            appendMessage(`${msg.username}: ${msg.content}`, 'other'); // Сообщение от другого пользователя
        }
    
        hideLoading(); // Hide loading spinner once the message is received
    };
    

    ws.onclose = () => {
        appendSystemMessage('Disconnected from the chat.');
        hideLoading(); // Hide loading spinner if WebSocket disconnects
    };

    ws.onerror = (error) => {
        appendSystemMessage('Error with WebSocket connection.');
        console.error('WebSocket error:', error);
        hideLoading(); // Hide loading spinner on error
    };

    sendBtn.onclick = sendMessage;
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        const username = usernameInput.value.trim() || 'Anonymous';
        currentUsername = username; // Save the username
        if (message === '') return; // Prevent sending empty messages
    
        appendMessage(`${currentUsername}: ${message}`, 'user'); // Display the user's message
        showLoading(); // Показать индикатор загрузки
    
        const msg = { username, content: message };
        ws.send(JSON.stringify(msg)); // Send the message to the server
        messageInput.value = ''; // Clear the input field
    }
    
    function showLoading() {
        loadingSpinner.style.display = 'block';
    }

    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

    function appendMessage(message, sender) {
        const p = document.createElement('p');
        p.textContent = message;
        p.className = sender; // Add a class for styling
        chat.appendChild(p);
        chat.scrollTop = chat.scrollHeight; // Scroll the chat to the bottom
    }

    function appendSystemMessage(message) {
        const p = document.createElement('p');
        p.innerHTML = `<em>${message}</em>`;
        chat.appendChild(p);
        chat.scrollTop = chat.scrollHeight; // Scroll to the latest message
    }

    async function fetchWelcomeMessage() {
        try {
            const response = await fetch(`${BACKEND_URL}/api/welcome`);
            const data = await response.json();
            appendSystemMessage(data.message);
        } catch (error) {
            console.error('Error fetching welcome message:', error);
        }
    }
    setInterval(updateClientCount, 5000);
});
