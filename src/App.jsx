import { useState } from "react";
import { sendChatMessage } from "./services/chatService";
import ReactMarkdown from "react-markdown";

function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // 👈 new

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { from: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true); // 👈 show loader

    try {

      const botReply = await sendChatMessage(input);

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);

    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Error: Could not connect to server." },
      ]);
    }

    setLoading(false); // 👈 hide loader
  };


  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3 text-center text-blue-600">🤖 CHAT Vibezzz</h1>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-xl shadow-inner space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[75%] whitespace-pre-wrap break-words leading-relaxed ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
               <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>

        ))}

        {/* 👇 Show typing indicator when loading */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-600 p-3 rounded-2xl max-w-[75%] animate-pulse">
              🤖 Typing...
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`ml-2 px-5 py-3 rounded-xl text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
// npm run dev
export default App;
