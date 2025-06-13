import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Friend {
  id: number;
  username: string;
}

interface FriendRequest {
  requestId: number;
  fromUsername: string;
}

const FriendPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [nickname, setNickname] = useState("");

  const token = localStorage.getItem("accessToken");

  const [friends, setFriends] = useState<string[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const navigate = useNavigate();

  // 친구 목록 & 요청 목록 불러오기
  useEffect(() => {
    if (!token) return;

    const fetchFriends = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        console.log("친구 목록 불러오기 결과:", json);
        if (json.isSuccess) {
          console.log(token);
          setFriends((json.result as Friend[]).map((f) => f.username));
        }
      } catch (e) {
        console.error("친구 목록 불러오기 실패:", e);
      }
    };

    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/friends/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.isSuccess) setRequests(json.result);
        console.log("요청 목록 불러오기 결과:", json);
      } catch (e) {
        console.error("요청 목록 불러오기 실패:", e);
      }
    };

    fetchFriends();
    fetchRequests();
  }, [token]);

  // SSE 연결
  useEffect(() => {
    if (!token) return;
    const eventSource = new EventSource(
      `http://localhost:8080/api/friends/notifications/stream?token=${token}`
    );

    eventSource.addEventListener("friend-request", (event) => {
      const data = JSON.parse(event.data);
      setRequests((prev) => [
        ...prev,
        { requestId: data.requestId, fromUsername: data.fromUsername },
      ]);
    });

    eventSource.addEventListener("friend-request-accepted", (event) => {
      const data = JSON.parse(event.data);
      console.log("✅ 친구 요청 수락됨:", data);
    });

    eventSource.onerror = (err) => {
      console.error("❌ SSE 오류:", err);
    };

    return () => {
      eventSource.close();
    };
  }, [token]);

  const handleDelete = async (nickname: string) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `http://localhost:8080/api/friends/${nickname}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await response.json();

    if (json.isSuccess) {
      // 성공 시 리스트에서 제거
      setFriends((prev) => prev.filter((friend) => friend !== nickname));
    } else {
      console.error("삭제 실패:", json.message);
    }
  } catch (error) {
    console.error("삭제 중 오류 발생:", error);
  }
};


  const handleSendRequest = async () => {
    if (!nickname.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/api/friends/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUsername: nickname }),
      });

      const json = await res.json();
      if (json.isSuccess) {
        console.log("✅ 친구 요청 성공:", json);
        alert(`${nickname}님에게 친구 요청을 보냈어요!`);
        setNickname("");
        setShowAddModal(false);
      } else {
        alert("친구 요청 실패: " + json.message);
      }
    } catch (err) {
      console.error("❌ 친구 요청 에러:", err);
      alert("에러 발생");
    }
  };

  const handleAccept = async (requestId: number, fromUsername: string) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/friends/requests/${requestId}/accept`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const json = await res.json();
      if (json.isSuccess) {
        setFriends((prev) => [...prev, fromUsername]);
        setRequests((prev) => prev.filter((r) => r.requestId !== requestId));
      } else {
        alert("요청 수락 실패: " + json.message);
      }
    } catch (err) {
      console.error("❌ 요청 수락 중 에러:", err);
    }
  };

  const handleReject = (requestId: number) => {
    setRequests((prev) => prev.filter((r) => r.requestId !== requestId));
  };

  const handleViewFriendForest = (friendName: string) => {
    // 친구의 숲 페이지로 이동
    navigate(`/forest?username=${friendName}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-ansim">
      <h1 className="text-green-400 text-3xl font-bold text-center font-ansim2 mb-10">
        내 친구 보기
      </h1>

      <div className="flex justify-center items-start gap-20">
        {/* 친구 리스트 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md w-[300px]">
          내 친구 목록
          <br/>
          {friends.map((friend) => (
            <div
              key={friend}
              className="flex justify-between items-center mb-3"
            >
              <span className="text-lg">{friend}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/forest?username=${friend}`)}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded"
                >
                  이야기 보기
                </button>
                <button
                  onClick={() => handleDelete(friend)}
                  className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 우측 버튼들 */}
        <div className="flex flex-col gap-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-[150px] h-[60px] bg-green-600 hover:bg-green-500 text-white text-lg rounded shadow"
          >
            친구추가하기
          </button>

          <div className="relative">
            <button
              onClick={() => setShowRequestModal(true)}
              className="w-[150px] h-[60px] bg-gray-700 hover:bg-gray-600 text-white text-lg rounded shadow"
            >
              친구신청
            </button>
            {requests && requests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                {requests.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 친구추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-white text-black w-[400px] p-8 rounded-xl shadow-xl font-ansim">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-600">친구 추가</h2>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-green-500"
            />
            <button
              onClick={handleSendRequest}
              className="mt-4 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded text-lg"
            >
              친구 신청하기
            </button>
          </div>
        </div>
      )}

      {/* 친구신청 모달 */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-white text-black w-[400px] p-8 rounded-xl shadow-xl font-ansim">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-600">
              친구 신청 내역
            </h2>

            {(requests ?? []).length === 0 ? (
              <p className="text-gray-500">신청 내역이 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {(requests ?? []).map(({ requestId, fromUsername }) => (
                  <div
                    key={requestId}
                    className="flex justify-between items-center"
                  >
                    <span>{fromUsername}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(requestId, fromUsername)}
                        className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => handleReject(requestId)}
                        className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
                      >
                        거절
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendPage;
