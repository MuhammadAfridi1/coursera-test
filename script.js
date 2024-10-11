        // Import Firebase SDK
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
        import { getDatabase, ref, onChildAdded, push, remove, get, child } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
        import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

        const firebaseConfig = {
            apiKey: "AIzaSyBScJODyKPfXr59q2cLalFMtk_yDSM2WyA",
            authDomain: "saad-82b8f.firebaseapp.com",
            databaseURL: "https://saad-82b8f-default-rtdb.firebaseio.com",
            projectId: "saad-82b8f",
            storageBucket: "saad-82b8f.appspot.com",
            messagingSenderId: "973441769275",
            appId: "1:973441769275:web:572afd367cb5c3b6c9a11e",
            measurementId: "G-83R61P5P8G"
        };

        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const storage = getStorage(app);

        function loadMessages() {
            const chatBox = document.getElementById('chat-box');
            const messagesRef = ref(database, 'messages');

            onChildAdded(messagesRef, (data) => {
                const messageData = data.val();
                const p = document.createElement('p');

                // Check if the message is an image URL
                if (messageData.message.startsWith('https://')) {
                    const img = document.createElement('img');
                    img.src = messageData.message;
                    img.width = 100;
                    p.appendChild(img);
                } else {
                    p.textContent = `${messageData.username}: ${messageData.message}`;
                }

                chatBox.appendChild(p);
            });
        }

        function sendMessage() {
            const input = document.getElementById('chat-input');
            const username = document.getElementById('username').value.trim() || "Anonymous";
            const message = input.value.trim();

            if (message) {
                const messagesRef = ref(database, 'messages');
                push(messagesRef, { username, message })
                    .then(() => {
                        input.value = '';
                    })
                    .catch((error) => {
                        console.error('Error sending message:', error);
                    });
            }
        }

        function clearChat() {
            const messagesRef = ref(database, 'messages');
            get(messagesRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        snapshot.forEach((childSnapshot) => {
                            remove(ref(database, `messages/${childSnapshot.key}`))
                                .catch((error) => {
                                    console.error('Error removing message:', error);
                                });
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error getting messages:', error);
                });
        }

        function uploadImage() {
            const fileInput = document.getElementById('file-input');
            const file = fileInput.files[0];

            if (file) {
                const storageRefPath = storageRef(storage, 'images/' + file.name);
                uploadBytes(storageRefPath, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        const username = document.getElementById('username').value.trim() || "Anonymous";
                        const messagesRef = ref(database, 'messages');
                        push(messagesRef, { username, message: url });
                    });
                });
            }
        }

        window.onload = () => {
            loadMessages();
            document.getElementById('send-button').onclick = sendMessage;
            document.getElementById('clear-button').onclick = clearChat;
            document.getElementById('upload-button').onclick = uploadImage;
        };
