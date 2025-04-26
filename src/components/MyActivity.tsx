import { Link } from "react-router-dom";
import forestBg from "../assets/forest_bg2.jpg";

const MyActivity = () => {
  return (
    <div className="min-h-screen bg-black text-white font-ansim p-10">

      {/* 고정된 배경 이미지 */}
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
        {/* 내 이야기숲 */}
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

        {/* 내 친구 보기 */}
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
          <h2 className="text-3xl font-bold text-green-400 mb-10 mt-2 text-center ">내 레벨 보기</h2>
          <p className="text-lg text-gray-300 mb-4 leading-8">
            🌱 새싹 단계<br />
            다음 단계까지 60% 남음
          </p>
          <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: "40%" }}
            />
          </div>
          <br /><br />
            6개의 이야기를 더 만들고 도토리 단계로 올라가요!
        </Link>
      </div>
    </div>
  );
};

export default MyActivity;
