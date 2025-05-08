import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import forestBg from "../assets/forest_bg2.jpg";


const GameLoadingPage = () => {
  const [level, setLevel] = useState<number | null>(null);
const navigate = useNavigate();

// ✅ 최상단 useEffect: 마운트 시 유저 정보 불러오기
useEffect(() => {
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:8080/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("유저 정보 불러오기 실패");
      return;
    }

    const json = await res.json();
    const levelFromUser = json.result.level;
    setLevel(levelFromUser);
  };

  fetchUserInfo();
}, []);

// ✅ 클릭 시 level이 있으면 이동
const handleStart = () => {
  if (level === null) {
    alert("레벨 정보를 불러오는 중입니다. 잠시만 기다려주세요.");
    return;
  }

  navigate(`/gamepage?level=${level}`);
};


  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-ansim px-4">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-xl p-10 w-full max-w-xl text-center">
        <h1 className="text-green-400 text-3xl font-bold font-ansim2 mb-6">
          단어 게임 🎯
        </h1>
        <div className="text-gray-300 text-base text-lg leading-relaxed mb-8">
          <p>어휘력 숲을 키우는 단어게임에 오신 걸 환영해요!</p>
          <p>단어는 나이에 맞게 설정되고, 점점 어려워져요.</p>
          <br />
          <p>🐰게임 방법🐰</p>
          <p>✅ 단어와 뜻을 맞추며 블록을 없애요</p>
          <p>✅ 모든 블록을 없애보세요!</p>
          <p>✅ 제한 시간은 1분 30초</p>
        </div>

        {/* ✅ 레벨 선택 */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`py-2 px-4 rounded-lg border font-bold ${
                level === l
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              레벨 {l}
            </button>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition-all text-lg"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default GameLoadingPage;
