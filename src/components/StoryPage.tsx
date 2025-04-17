import { useState } from "react";
import { motion } from "framer-motion";
import fairy from "../assets/fairy.png";
import forestBg from "../assets/forest_bg2.jpg"; // 배경 이미지 추가

const StoryPage = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "나랑 같이 동화를 만들자! 먼저 시작해줘!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col font-ansim pt-[120px] p-6 overflow-hidden">
      
      {/* ✅ 반투명 배경 이미지 */}
      <img
        src={forestBg}
        alt="Forest Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* ✅ 메인 콘텐츠는 z-10 */}
      <div className="flex-1 flex flex-col items-center z-10">
        <div className="w-full max-w-6xl flex-1 overflow-y-auto mb-4 space-y-6 px-8">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"} items-center gap-4`}
            >
              {msg.sender === "ai" && (
                <img src={fairy} alt="AI" className="w-25 h-24 rounded-full" />
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`max-w-md p-4 rounded-2xl text-xl leading-relaxed ${
                  msg.sender === "ai"
                    ? "bg-gray-800 text-white"
                    : "bg-green-500 text-black"
                }`}
              >
                {msg.text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* 입력창 */}
        <div className="w-full max-w-4xl flex gap-2 mt-4 px-8">
          <input
            type="text"
            className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none"
            placeholder="이야기를 이어서 써보세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full transition"
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
