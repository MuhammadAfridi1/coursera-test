// Send message function
window.sendMessage = function() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    console.log('Sending message:', message); // Debug log

    if (message) {
        const messagesRef = ref(database, 'messages');
        push(messagesRef, message) // Store the message
            .then(() => {
                console.log('Message sent successfully'); // Success log
                input.value = ''; // Clear input
            })
            .catch((error) => {
                console.error('Error sending message:', error); // Error log
            });
    } else {
        console.warn('Empty message, not sent'); // Warn for empty messages
    }
};
