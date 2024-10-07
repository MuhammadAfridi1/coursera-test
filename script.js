function sendMessage() {
    // Get the message input element
    var input = document.getElementById('chat-input');
    
    // Get the message container where the messages will be displayed
    var messageContainer = document.getElementById('message-container');
    
    // Create a new paragraph element
    var newMessage = document.createElement('p');
    
    // Set the text of the new message to the input value
    newMessage.textContent = input.value;
    
    // Add a class to the message for styling (optional)
    newMessage.className = 'message';
    
    // Append the new message to the message container
    messageContainer.appendChild(newMessage);
    
    // Clear the input field for the next message
    input.value = '';

    // Automatically scroll to the bottom of the message container
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
