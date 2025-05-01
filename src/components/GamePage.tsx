import { useEffect, useState } from "react";
import forestBg from "../assets/forest_bg2.jpg";
import stone from "../assets/stone.png";
import { useLocation } from "react-router-dom";

const TOTAL_TIME = 90;

type WordItem = {
  word: string;
  meaning: string;
};

type ApiWord = {
  id: number;
  term: string;
  meaning: string;
  difficulty: number;
};


const shuffle = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

const GamePage = () => {
  const [words, setWords] = useState<WordItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<WordItem[]>([]);

  const [selected, setSelected] = useState<{
    type: "word" | "meaning";
    value: string;
  } | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [time, setTime] = useState(TOTAL_TIME);
  const [justMatched, setJustMatched] = useState<string | null>(null);
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);
  const [wrongMatchMeaning, setWrongMatchMeaning] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState<"timeout" | "success" | null>(
    null
  );
  
const location = useLocation();
const [userLevel, setUserLevel] = useState<number | null>(null);

// ✅ 1. 사용자 정보 받아서 level 가져오기
useEffect(() => {
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch("http://localhost:8080/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    const levelFromUser = json.result.level;
    setUserLevel(levelFromUser); // ✅ 이후에 단어 fetch로 연결됨
  };

  fetchUserInfo();
}, []);

  // ✅ API 호출
  useEffect(() => {
    if (userLevel === null) return;

    const fetchWords = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ 토큰 꺼내기
  
      const res = await fetch("http://localhost:8080/api/words/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ 헤더에 토큰 넣기
        },
        body: JSON.stringify({ level: userLevel })

      });

      const json = await res.json();
      const result: ApiWord[] = json.result;

      const cleaned: WordItem[] = result.map((item) => ({
        word: item.term,
        meaning: cleanMeaning(item.meaning),
      }));

      setWords(cleaned);
      setShuffledWords(shuffle(cleaned));
      setShuffledMeanings(shuffle(cleaned));
    };

    fetchWords();
  }, []);

  // ✅ 의미에서 품사/기호 제거
  const cleanMeaning = (raw: string): string => {
    // "「명사」 의미" → "의미"
    return raw.replace(/^「[^」]*」\s*/g, "").trim();
  };

  // 타이머 감소
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0 && matched.length < words.length) {
      setShowModal("timeout");
    }
  }, [time, matched]);

  useEffect(() => {
    if (matched.length === words.length) {
      setShowModal("success");
    }
  }, [matched]);

  // 카드 선택
  const handleSelect = (type: "word" | "meaning", value: string) => {
    // 이미 매칭된 건 무시
    if (matched.includes(value)) return;

    // 아무것도 선택 안 했을 때 → 선택 저장
    if (!selected) {
      setSelected({ type, value });
      return;
    }

    // 같은 타입 두 번 누르면 선택 변경
    if (selected.type === type) {
      setSelected({ type, value });
      return;
    }

    // 서로 다른 타입 선택되었을 때 → 매칭 체크
    const word = type === "word" ? value : selected.value;
    const meaning = type === "meaning" ? value : selected.value;

    const match = words.find((w) => w.word === word && w.meaning === meaning);

    if (match) {
      setJustMatched(match.word);
      setTimeout(() => {
        setMatched((prev) => [...prev, match.word]);
        setJustMatched(null);
      }, 600);
      setSelected(null);
    } else {
      setWrongMatch(word);
      setWrongMatchMeaning(meaning);
      setTimeout(() => {
        setSelected(null);
        setWrongMatch(null);
        setWrongMatchMeaning(null);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white font-ansim">
      {/* 고정된 배경 이미지 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <h1 className="text-green-400 text-3xl font-bold text-center font-ansim2 mb-8">
        단어 게임
      </h1>

      {/* 전체 줄 나눔 */}
      <div className="flex gap-10 justify-center items-start mt-10">
        {/* 왼쪽: 단어 카드 */}
        <div className="grid grid-cols-4 gap-3">
          {shuffledWords.map((item) => (
            <button
              key={item.word}
              onClick={() => handleSelect("word", item.word)}
              style={{
                backgroundColor: "black",
                backgroundImage: `url(${stone})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={`w-[100px] h-[70px] rounded shadow text-lg brightness-100 hover:brightness-75 transition-all
              ${
                matched.includes(item.word)
                  ? "opacity-0 pointer-events-none"
                  : ""
              }
              ${
                selected?.type === "word" && selected.value === item.word
                  ? "ring-4 ring-green-400"
                  : ""
              }
              ${
                justMatched && item.word === justMatched
                  ? "border-4 border-yellow-300 animate-ping-fast"
                  : ""
              }
              ${
                wrongMatch === item.word
                  ? "border-4 border-red-500 animate-shake"
                  : ""
              }
            `}
            >
              {item.word}
            </button>
          ))}
        </div>

        {/* 오른쪽: 의미 카드 2줄 */}
        <div className="grid grid-cols-2 gap-2">
          {shuffledMeanings.map((item) => {
            const matchedWord = words.find(
              (w) => w.meaning === item.meaning
            )?.word;
            const isMatched = matched.includes(matchedWord ?? "");

            return (
              <button
                key={item.meaning}
                onClick={() => handleSelect("meaning", item.meaning)}
                style={{
                  backgroundColor: "black",
                  backgroundImage: `url(${stone})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className={`w-[250px] h-[48px] rounded shadow text-middle px-3 brightness-100 hover:brightness-75 transition-all
    ${isMatched ? "opacity-0 pointer-events-none" : ""}
    ${
      selected?.type === "meaning" && selected.value === item.meaning
        ? "ring-4 ring-green-400"
        : ""
    }
    ${
      justMatched &&
      item.meaning === words.find((w) => w.word === justMatched)?.meaning
        ? "border-4 border-yellow-300 animate-ping-fast"
        : ""
    }
    ${
      wrongMatchMeaning === item.meaning
        ? "border-4 border-red-500 animate-shake"
        : ""
    }
  `}
              >
                {item.meaning}
              </button>
            );
          })}
        </div>
      </div>

      {/* 타이머 바 */}
      <div className="w-full mt-5">
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all duration-1000"
            style={{ width: `${(time / TOTAL_TIME) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm mt-2 text-gray-300">
          남은 시간: {Math.floor(time / 60)}:
          {String(time % 60).padStart(2, "0")}
        </p>
      </div>

      {/* 타임아웃 모달 */}
      {showModal === "timeout" && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-2xl text-red-500 font-bold">시간 초과!</h2>
            <p className="text-gray-300 mt-4">
              단어를 모두 맞추지 못했어요. 다시 도전해보세요!
            </p>
          </div>
        </div>
      )}

      {/* 성공 모달 */}
      {showModal === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-2xl text-green-500 font-bold">축하합니다!</h2>
            <p className="text-gray-300 mt-4">
              모든 단어를 성공적으로 맞추셨어요.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
