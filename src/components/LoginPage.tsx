import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import forestBg from "../assets/forest_bg2.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error("로그인 실패");
      }

      const data = await res.json();
      console.log("로그인 성공:", data);

      // 예: 토큰 저장, 페이지 이동 등
      localStorage.setItem("token", data.accesstoken);
      navigate("/"); // 로그인 성공 시 이동할 페이지
    } catch (err) {
      console.error("로그인 중 오류 발생:", err);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-ansim">
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
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              placeholder="닉네임을 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="text-white block mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded text-lg font-bold"
            >
              로그인
            </button>
          </div>

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
