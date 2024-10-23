const sendChatBtn=document.querySelector("#send-btn");
const chatInput=document.querySelector(".chat-input textarea");
const chatbox=document.querySelector(".chatbox");
const hide=document.querySelector("#hide");
const show=document.querySelector("#show");
const allHide=document.querySelector(".show-chatbot");
let userMessage;
const API_KEY="7fda445b2dmsh16f88518b3d03a1p19792ajsn8f0223daaca8";
const createChatLi=(message,className)=>{
const chatLi=document.createElement("li");
chatLi.classList.add("chat",className);
let chatContent=className=="outgoing"?`<p>${message}</p>`:`<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
chatLi.innerHTML=chatContent;
return chatLi;
}
const generateResponse=(incomingChatLi)=>{
    const messageElement=incomingChatLi.querySelector("p");
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "o3R8nsxbdcKumuHJwiZ0ZdC2xbDy2yjzx47rhbB2nwXSvTfBNG");
    myHeaders.append("x-apihub-host", "GPT-4-and-Gemini-Advance.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "909a510a-36c7-44e5-afa1-b62f28eb7993");
    
    const encodedPrompt = encodeURIComponent(userMessage); // Encoding the prompt to make it URL-safe
    
    const requestOptions = {
       method: "GET",
       headers: myHeaders,
       redirect: "follow"
    };
    
    const url = `https://GPT-4-and-Gemini-Advance.proxy-production.allthingsdev.co/gpt/4?prompt=${encodedPrompt}`;
    
    fetch(url, requestOptions)
       .then((response) => response.json())
       .then((result) =>{
        console.log(result.reply);
        messageElement.textContent=result.reply;
       })
       .catch((error) => console.error(error))
       .finally(()=> chatbox.scrollTo(0,chatbox.scrollHeight));

}



const handleChat=()=>{
    userMessage=chatInput.value.trim();
    console.log(userMessage);
    if(!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(()=>{
        const incomingChatLi=createChatLi("Thinking...","incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChatLi);
       chatInput.innerText="";
    },600);


}
sendChatBtn.addEventListener('click',handleChat);


// hide.addEventListener("click",()=>{
//     allHide.style.display="none";
// })