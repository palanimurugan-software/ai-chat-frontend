// import { useState } from "react";

// export default function App() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello 👋! I'm your AI assistant. How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;
//     const newMessage = { sender: "user", text: input };
//     setMessages([...messages, newMessage]);
//     setInput("");

//     // Temporary bot reply (you'll connect backend later)
//     // setTimeout(() => {
//     //   setMessages(prev => [
//     //     ...prev,
//     //     { sender: "bot", text: "🤖 I'm still learning. Soon I'll respond intelligently!" },
//     //   ]);
//     // }, 600);

//     // For now, we simulate a bot reply:
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `You said: "${input}" 🤖 (Backend reply coming soon)` },
//       ]);
//     }, 600);

//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-indigo-600 text-white text-center py-4 text-2xl font-bold shadow-md">
//         CHITI AI Chatbot
//       </header>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`px-4 py-2 rounded-2xl max-w-xs ${
//                 msg.sender === "user"
//                   ? "bg-indigo-500 text-white rounded-br-none"
//                   : "bg-white text-gray-800 rounded-bl-none shadow"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="bg-white p-3 flex border-t">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//           onClick={handleSend}
//           className="ml-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-medium"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { sendChatMessage } from "./services/chatService";
import ReactMarkdown from "react-markdown";

function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // ✨ Use the service
    const botReply = await sendChatMessage(input);

    setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3 text-center text-blue-600">💬 Chat Vibezzz</h1>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-xl shadow-inner space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >

           
            
            <div
              className={`p-3 rounded-2xl max-w-[75%] ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
               <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
