import {Link} from "react-router-dom";
import forestBg from "../assets/forest_bg2.jpg";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-ansim">
      
      {/* 고정된 배경 이미지 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="bg-gray-900/70 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-green-400 text-3xl font-bold mb-6 text-center font-ansim2">
          로그인
        </h1>

        <div className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label className="text-white block mb-1">닉네임</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
                placeholder="닉네임을 입력하세요"
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="text-white block mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="mt-6">
            <button className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded text-lg font-bold">
              로그인
            </button>
          </div>

          {/* 회원가입 문구 */}
          <div className="text-center mt-6">
              <Link
                to="/join"
                className="text-green-400 hover:underline cursor-pointer"
              >
                회원가입하고 나만의 이야기숲 만들어요!
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
