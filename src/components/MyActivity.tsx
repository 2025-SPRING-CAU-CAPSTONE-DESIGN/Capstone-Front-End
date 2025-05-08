import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import forestBg from "../assets/forest_bg2.jpg";

// 티어 이름 배열
const tierNames = [
  "새싹", "도토리", "파란꽃", "빨간꽃", "사과",
  "딸기", "체리", "복숭아", "사탕", "별"
];

const MyActivity = () => {
  const [tier, setTier] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);
  const [storiesToNext, setStoriesToNext] = useState(0);

  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    const fetchTierInfo = async () => {
      const token = localStorage.getItem("accessToken");
    
      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }
    
      try {
        const response = await fetch("http://localhost:8080/users/tier", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        const { tier, progressPercent, storiesToNextTier } = data.result;
    
        // 예시: 상태 업데이트
        setTier(tier);
        setProgressPercent(progressPercent);
        setStoriesToNext(storiesToNextTier);
    
      } catch (error) {
        console.error("티어 정보를 불러오지 못했습니다:", error);
      }
    };
    

    fetchTierInfo();
  }, [nickname]);

  return (
    <div className="min-h-screen bg-black text-white font-ansim p-10">

      {/* 배경 이미지 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <h1 className="text-center text-4xl font-bold text-green-400 font-ansim2 mb-12">
        내 활동 보기
      </h1>

      <div className="flex justify-center gap-8 flex-wrap">
        {/* 이야기숲 보기 */}
        <Link
          to="/forest"
          className="bg-gray-800/60 rounded-xl p-6 w-[20vw] h-[70vh] shadow text-white hover:bg-gray-700 transition"
        >
          <h2 className="text-3xl font-bold text-green-400 mb-10 mt-2 text-center">내 이야기숲 보기</h2>
          <h3 className="text-xl font-bold text-green-300 mb-4">최근 작성한 이야기</h3>
          <p className="text-lg text-gray-300 leading-8">
            ✏️ “용감한 토끼의 모험”<br />
            ✏️ “바다 괴물의 비밀”<br />
            ✏️ “시간 여행을 떠난 아이”<br />
            ✏️ “잃어버린 마법의 돌”
          </p>
        </Link>

        {/* 친구 보기 */}
        <Link
          to="/friendPage"
          className="bg-gray-800/60 rounded-xl p-6 w-[20vw] h-[70vh] shadow text-white hover:bg-gray-700 transition"
        >
          <h2 className="text-3xl font-bold text-green-400 mb-10 mt-2 text-center">내 친구 보기</h2>
          <p className="text-lg text-gray-300 leading-8">
            👥 총 친구: 4명<br />
            최근 추가: 김영희, 이민지<br />
            대기 중 요청: 2건
          </p>
        </Link>

        {/* 내 레벨 보기 */}
        <Link
          to="/myLevel"
          className="bg-gray-800/60 rounded-xl p-6 w-[20vw] h-[70vh] shadow text-white hover:bg-gray-700 transition"
        >
          <h2 className="text-3xl font-bold text-green-400 mb-10 mt-2 text-center">내 레벨 보기</h2>
          <p className="text-lg text-gray-300 mb-4 leading-8">
            🌱 {tierNames[tier - 1]} 단계<br />
            다음 단계까지 {100 - progressPercent}% 남음
          </p>
          <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <br /><br />
          {storiesToNext > 0
            ? `${storiesToNext}개의 이야기를 더 만들고 ${tierNames[tier]} 단계로 올라가요!`
            : "최고 티어에 도달했어요! ✨"}
        </Link>
      </div>
    </div>
  );
};

export default MyActivity;
