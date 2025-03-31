import { useState } from "react";

const FriendPage = () => {
  const [friends, setFriends] = useState(["김현수", "홍희훈", "김철수", "김영희"]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [requests, setRequests] = useState(["이민지", "박서준", "최유진"]);

  const handleDelete = (name: string) => {
    setFriends(friends.filter(friend => friend !== name));
  };

  const handleSendRequest = () => {
    if (nickname.trim()) {
      alert(`${nickname}님에게 친구 신청을 보냈어요!`);
      setNickname("");
      setShowAddModal(false);
    }
  };

  const handleAccept = (name: string) => {
    setFriends([...friends, name]);
    setRequests(requests.filter(request => request !== name));
  };

  const handleReject = (name: string) => {
    setRequests(requests.filter(request => request !== name));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-ansim">
      <h1 className="text-green-400 text-3xl font-bold text-center font-ansim2 mb-10">
        내 친구 보기
      </h1>

      <div className="flex justify-center items-start gap-20">
        {/* 친구 리스트 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md w-[300px]">
          {friends.map((friend) => (
            <div key={friend} className="flex justify-between items-center mb-3">
              <span className="text-lg">{friend}</span>
              <button
                onClick={() => handleDelete(friend)}
                className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
              >
                삭제
              </button>
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
            {requests.length > 0 && (
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
            <h2 className="text-xl font-bold mb-4 text-green-600">친구 신청 내역</h2>

            {requests.length === 0 ? (
              <p className="text-gray-500">신청 내역이 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {requests.map((name) => (
                  <div key={name} className="flex justify-between items-center">
                    <span>{name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(name)}
                        className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => handleReject(name)}
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
