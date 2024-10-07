// Function to load messages from localStorage when the page loads
function loadMessages() {
    const chatBox = document.getElementById('chat-box');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.forEach(message => {
        const p = document.createElement('p');
        p.textContent = message;
        chatBox.appendChild(p);
    });
}

// Function to send and store the message
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (message) {
        // Add the message to the chat box
        const chatBox = document.getElementById('chat-box');
        const p = document.createElement('p');
        p.textContent = message;
        chatBox.appendChild(p);

        // Store the message in localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));

        // Clear the input field
        input.value = '';
    }
}

// Load messages when the page loads
window.onload = loadMessages;
