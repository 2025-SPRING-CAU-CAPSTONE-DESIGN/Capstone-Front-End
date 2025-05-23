import { Link } from "react-router-dom";
import { useState } from "react";
import forestBg from "../assets/forest_bg2.jpg";

const JoinPage = () => {
  const [nickname, setNickname] = useState("");
  const [isNicknameTaken, setIsNicknameTaken] = useState(false); // 중복 상태
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [birthDate, setBirthDate] = useState("");

  const handleCheckNickname = async () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8080/users/${nickname}/check`);
  
      if (res.status === 200) {
        setIsNicknameTaken(false); // 닉네임 사용 가능
        alert("사용 가능한 닉네임입니다.");
      } else if (res.status === 400) {
        const errJson = await res.json();
        setIsNicknameTaken(true); // 닉네임 사용 불가
        alert(errJson.message || "이미 사용 중인 닉네임입니다.");
      } else {
        // 그 외의 상태 코드에 대한 처리
        setIsNicknameTaken(true);
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("닉네임 중복 확인 실패:", err);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  
  


  // 비밀번호 일치 여부 확인
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setIsPasswordMismatch(value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setIsPasswordMismatch(password !== value);
  };

  const handleJoin = async () => {
    if (isPasswordMismatch || !nickname || !password || !birthDate) {
      alert("입력값을 모두 확인해주세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: nickname,
          password: password,
          passwordConfirm: confirmPassword,
          birthDate: birthDate,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        alert("회원가입 실패: " + (errJson.message || res.status));
        return;
      }

      alert("회원가입 성공!");
      // TODO: 여기서 로그인 페이지로 이동하거나 자동 로그인 시도 가능
    } catch (err) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      console.error(err);
    }
  };

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

      <div className="bg-gray-900/70 p-10 rounded-2xl shadow-xl w-full max-w-md mt-10">
        <h1 className="text-green-400 text-3xl font-bold mb-6 text-center font-ansim2">
          회원가입
        </h1>

        <div className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label className="text-white block mb-1">닉네임</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="basis-3/4 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
                placeholder="닉네임을 입력하세요"
              />
              <button
                type="button"
                onClick={handleCheckNickname}
                className="basis-1/4 bg-green-500 hover:bg-green-400 text-white px-4 rounded"
              >
                중복 확인
              </button>
            </div>
            {isNicknameTaken && (
              <p className="text-sm text-red-400 mt-1 ml-1">
                사용할 수 없는 닉네임입니다.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="text-white block mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="text-white block mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              placeholder="비밀번호를 다시 입력하세요"
            />
            {isPasswordMismatch && (
              <p className="text-sm text-red-400 mt-1 ml-1">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          {/* 생년월일 */}
          <div>
            <label className="text-white block mb-1">생년월일</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
          </div>

          {/* 회원가입 버튼 */}
          <div className="mt-6">
            <button
              onClick={handleJoin}
              disabled={isNicknameTaken || isPasswordMismatch}
              className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded text-lg font-bold"
            >
              회원가입
            </button>
          </div>

          {/* 로그인 문구 */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-300">
              <Link
                to="/login"
                className="text-green-400 hover:underline cursor-pointer"
              >
                로그인하고 나만의 이야기숲 만들어요!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
