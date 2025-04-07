import { useNavigate } from "react-router-dom";

const GameLoadingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/gamepage"); // 실제 게임 경로에 맞게 수정
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-ansim px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-10 w-full max-w-xl text-center">
        <h1 className="text-green-400 text-3xl font-bold font-ansim2 mb-6">
          단어 게임 🎯
        </h1>
        <div className="text-gray-300 text-base text-lg leading-relaxed mb-8">
          <p>어휘력 숲을 키우는 단어게임에 오신 걸 환영해요!</p>
          <p>단어게임을 통해 어휘력 숲을 키워봐요!</p>
          <p>단어는 나이에 맞게 설정되고, 점점 어려워져요.</p>
          <br/>
          <p>🐰게임방법🐰</p>
          <p>✅ 단어와 뜻을 맞추며 블록을 없애요</p>
          <p>✅ 모든 블록을 없애보세요!</p>
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

export default GameLoadingPage;
