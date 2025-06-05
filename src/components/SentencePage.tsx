import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import forestBg from "../assets/forest_bg2.jpg";

const TOTAL_TIME = 90;

const SentencePage = () => {
  const [input, setInput] = useState("");
  const [time, setTime] = useState(TOTAL_TIME);
  const [words, setWords] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  // ✅ 모달용 상태 추가
const [feedback, setFeedback] = useState<string | null>(null);
  const [scoreModalOpen, setScoreModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (input.trim() === "") return;

    const level = searchParams.get("level");
    if (!level) {
      alert("레벨 정보가 없습니다.");
      return;
    }

    try {
  const res = await fetch("http://localhost:8080/api/sentence/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      level: Number(level),
      words: words,
      sentenceText: input,
    }),
  });

  const resJson = await res.json();

if (resJson.isSuccess) {
  const feedback = resJson.result.feedback;
  console.log("✅ 피드백:", feedback);

  setFeedback(feedback);            // ✅ 피드백 저장
  setScoreModalOpen(true);          // ✅ 모달 열기
}
 else {
    console.warn("⚠ 실패:", resJson.message);
  }
} catch (error) {
  console.error("❌ 요청 중 에러 발생:", error);
}


  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      const level = searchParams.get("level");
      if (!level) {
        alert("레벨 정보가 없습니다.");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/sentence/random", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ level: level }),
        });

        const json = await res.json();

        if (json.isSuccess && Array.isArray(json.result)) {
          setWords(json.result);
        } else {
          alert("단어 불러오기 실패");
        }
      } catch (error) {
        console.error("단어 불러오기 중 에러:", error);
        alert("서버 오류가 발생했습니다.");
      }
    };

    fetchWords();
  }, [searchParams]);

  return (
    <div className="relative min-h-screen bg-black font-ansim overflow-hidden flex flex-col items-center pt-[120px] px-8">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 z-0">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center space-y-10 w-full max-w-6xl">

        <h1 className="text-3xl font-bold text-green-400 mb-4">이번 이야기 단어</h1>

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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
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

      {/* ✅ 채점 결과 모달 */}
      {scoreModalOpen && feedback && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center max-w-md">
      <h2 className="text-2xl text-green-500 font-bold">피드백</h2>
      <p className="text-white mt-6 text-xl whitespace-pre-wrap">{feedback}</p>
      <button
        className="mt-8 bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-full"
        onClick={() => {
          setScoreModalOpen(false);
          setFeedback(null);
        }}
      >
        확인
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default SentencePage;
