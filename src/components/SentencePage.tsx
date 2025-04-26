import { useState, useEffect } from "react";
import forestBg from "../assets/forest_bg2.jpg"; // 배경 이미지

const TOTAL_TIME = 90; // 1분 30초

const SentencePage = () => {
  const words = ["토끼", "숲", "모험", "친구", "용기"]; // 예시 단어
  const [input, setInput] = useState("");
  const [time, setTime] = useState(TOTAL_TIME);

  const handleSubmit = () => {
    if (input.trim() === "") return;
    console.log("제출한 문장:", input);
    setInput("");
  };

  // 타이머 감소
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black font-ansim overflow-hidden flex flex-col items-center pt-[120px] px-8">
      
      {/* 고정된 배경 이미지 */}
      <div className="fixed inset-0 z-0">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center space-y-10 w-full max-w-6xl">

        {/* 타이틀 */}
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          이번 이야기 단어
        </h1>

        {/* 단어 박스 */}
        <div className="flex gap-4 flex-wrap justify-center">
          {words.map((word, idx) => (
            <div
              key={idx}
              className="bg-gray-800 text-white px-6 py-4 rounded-2xl text-xl shadow-md"
            >
              {word}
            </div>
          ))}
        </div>

        {/* 입력창 */}
        <div className="w-full flex flex-col items-center gap-4 px-4">
          <textarea
            className="w-full bg-gray-800 text-white rounded-2xl p-6 text-lg focus:outline-none resize-none h-40"
            placeholder="이야기를 이어서 써보세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-full text-lg transition"
          >
            제출하기
          </button>
        </div>

        {/* 시간바 */}
        <div className="w-full mt-8 px-4">
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-1000"
              style={{ width: `${(time / TOTAL_TIME) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm mt-2 text-gray-300">
            남은 시간: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SentencePage;
