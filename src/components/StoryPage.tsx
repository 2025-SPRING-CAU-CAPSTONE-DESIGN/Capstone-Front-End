import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import fairy from "../assets/fairy.png";
import forestBg from "../assets/forest_bg2.jpg"; // 배경 이미지 추가

const StoryPage = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "나랑 같이 동화를 만들자! 먼저 시작해줘!" },
  ]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");
  const [storyId, setStoryId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState(""); // 사용자가 직접 제목을 입력하거나 자동 생성 가능
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("❌ 토큰이 없습니다.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok && data.isSuccess) {
          console.log("✅ 사용자 정보:", data.result);
          setUserId(data.result.id); // 필요하면 저장
        } else {
          console.error("❌ 사용자 정보 요청 실패:", data.message);
        }
      } catch (error) {
        console.error("❌ 사용자 정보 요청 중 에러:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // 먼저 사용자의 입력을 채팅창에 추가
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const userInput = input;
    setInput("");

    try {
      const res = await fetch(
        "https://4eb8-165-194-17-158.ngrok-free.app/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId, // 필요 시 동적으로 대체 가능
            book_num: 1402, // 필요 시 선택된 책 번호 등으로 대체 가능
            input: userInput,
            max_new_tokens: 200,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("응답 실패");
      }

      const data = await res.json();
      const cleanText = data.response.replaceAll('"', "");
      setMessages((prev) => [...prev, { sender: "ai", text: cleanText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "응답을 불러오지 못했어요. 다시 시도해볼래?" },
      ]);
    }
  };

  const handleFinishStory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const fullContent = messages
      .slice(1) // 👉 첫 번째 메시지("AI: 나랑 같이 동화를 만들자!") 제거
      .map((msg) => msg.text) // 👉 sender 제거하고 순수한 text만 저장
      .join("\n");

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("http://localhost:8080/api/stories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: fullContent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.isSuccess) {
        alert("🎉 동화가 저장되었어요!");
      } else {
        console.error("동화 저장 실패:", data.message);
        alert("저장 실패: " + data.message);
      }
    } catch (err) {
      console.error("에러:", err);
      alert("서버 오류가 발생했어요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col font-ansim pt-[120px] p-6 overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src={forestBg}
        alt="Forest Background"
        className="fixed top-0 left-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center z-10">
        <div className="w-full max-w-6xl flex-1 overflow-y-auto mb-4 space-y-6 px-8">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "ai" ? "justify-start" : "justify-end"
              } items-center gap-4`}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full transition"
          >
            보내기
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-full transition"
          >
            동화 완성
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] text-black relative shadow-xl">
              <button
                className="absolute top-2 right-4 text-xl font-bold"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-green-600">
                동화 제목을 입력하세요
              </h2>
              <input
                type="text"
                className="w-full px-4 py-2 rounded border border-gray-300 mb-4"
                placeholder="예: 모험을 떠난 고양이"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={() => {
                  setShowModal(false);
                  handleFinishStory();
                }}
                disabled={isSaving}
                className="w-full bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded"
              >
                {isSaving ? "저장 중..." : "완성하기"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPage;
