window.send = send;
window.insta = insta;

async function send() {
    const input_msg = document.getElementById('msg_text').value;
    const tab = document.getElementById('tab');

    if (input_msg.trim() !== '') {
        const new_msg = document.createElement('div');
        new_msg.setAttribute('class', 'msg');
        const user_msg_id = generateUniqueId();
        new_msg.setAttribute('id', user_msg_id);
        tab.appendChild(new_msg);

        const msg_text = document.createElement('span');
        msg_text.innerText = input_msg;
        new_msg.appendChild(msg_text);
        document.getElementById('msg_text').value = '';

        tab.scrollTop = tab.scrollHeight;

        const ai_response = await getAIResponse(input_msg);

        const ai_msg = document.createElement('div');
        ai_msg.setAttribute('class', 'msg1');
        const ai_msg_id = generateUniqueId();
        ai_msg.setAttribute('id', ai_msg_id);
        tab.appendChild(ai_msg);

        const ai_msg_text = document.createElement('span');
        ai_msg_text.innerText = ai_response;
        ai_msg.appendChild(ai_msg_text);


        tab.scrollTop = tab.scrollHeight;
    }
}


async function getAIResponse(userMessage) {
    try {
        const response = await fetch('https://aichat-bot-2.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        return data.answer || "No response received from AI.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error: Unable to fetch response from AI.";
    }
}

function generateUniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

