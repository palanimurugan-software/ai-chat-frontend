// const API ='http://localhost:5000';
const API ='https://ai-chat-backend-cyr9.onrender.com';

export async function sendChatMessage(message) {
  try {
    const response = await fetch(`${API}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error calling backend:", error);
    return "⚠️ Backend error. Please try again later.";
  }
}
