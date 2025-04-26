import { useNavigate } from "react-router-dom";
import forestBg from "../assets/forest_bg2.jpg";

const SentenceLoadingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/sentencepage"); // 실제 게임 경로에 맞게 수정
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-ansim px-4">
      {/* 고정된 배경 이미지 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="bg-gray-900 rounded-2xl shadow-xl p-10 w-full max-w-xl text-center">
        <h1 className="text-green-400 text-3xl font-bold font-ansim2 mb-6">
          문장 만들기 게임 🎯
        </h1>
        <div className="text-gray-300 text-base text-lg leading-relaxed mb-8">
          <p>문장력 숲을 키우는 문장 만들기 게임에 오신 걸 환영해요!</p>
          <p>문장을 만들어 상상력 숲을 키워봐요!</p>
          <p>Ai 도우미가 문장 수준을 평가해줘요!</p>
          <br/>
          <p>🐰게임방법🐰</p>
          <p>✅ 제시된 모든 단어를 이용해 문장을 만들어보세요!</p>
          <p>✅ 단어의 쓰임새를 고려해보세요!</p>
          <p>✅ 제한 시간은 1분 30초</p>
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

export default SentenceLoadingPage;
