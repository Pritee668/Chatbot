let userMessage;

function toggleChatbot() {
    const chatbot = document.querySelector(".chatbot");
    const openIcon = document.querySelector(".open-icon");
    const closeIcon = document.querySelector(".close-icon");
    chatbot.classList.toggle("show-chatbot");
    openIcon.style.opacity = chatbot.classList.contains("show-chatbot") ? "0" : "1";
    closeIcon.style.opacity = chatbot.classList.contains("show-chatbot") ? "1" : "0";
}

function closeChatbot() {
    const chatbot = document.querySelector(".chatbot");
    const openIcon = document.querySelector(".open-icon");
    const closeIcon = document.querySelector(".close-icon");
    chatbot.classList.remove("show-chatbot");
    openIcon.style.opacity = "1";
    closeIcon.style.opacity = "0"; 
}

const createChatLi = (message, className) => {
    const chatLi = document.createElement("div");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" 
        ? `<p>${message}</p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "o3R8nsxbdcKumuHJwiZ0ZdC2xbDy2yjzx47rhbB2nwXSvTfBNG");
    myHeaders.append("x-apihub-host", "GPT-4-and-Gemini-Advance.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "909a510a-36c7-44e5-afa1-b62f28eb7993");

    const encodedPrompt = encodeURIComponent(userMessage);
    const url = `https://GPT-4-and-Gemini-Advance.proxy-production.allthingsdev.co/gpt/4?prompt=${encodedPrompt}`;

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            messageElement.textContent = result.reply;
        })
        .catch((error) => console.error(error))
        .finally(() => {
            const chatbox = document.getElementById("chatbox");
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
};

function handleChat() {
    const chatInput = document.getElementById("chatInput");
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    const chatbox = document.getElementById("chatbox");
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
        chatInput.value = ""; // Clear input after sending
    }, 600);
}
