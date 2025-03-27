import { useEffect, useState } from "react";

const TOTAL_TIME = 90; // 1분 30초

type WordItem = {
  word: string;
  meaning: string;
};

const words: WordItem[] = [
  { word: "사과", meaning: "달콤한 빨간 과일" },
  { word: "강아지", meaning: "작고 귀여운 동물" },
  { word: "연필", meaning: "글을 쓸 때 쓰는 도구" },
  { word: "학교", meaning: "공부하러 가는 곳" },
  { word: "책상", meaning: "공부할 때 앉는 자리" },
  { word: "우산", meaning: "비가 올 때 쓰는 것" },
  { word: "자전거", meaning: "두 바퀴로 달리는 탈것" },
  { word: "물고기", meaning: "물속에 사는 동물" },
  { word: "텔레비전", meaning: "프로그램을 보는 전자제품" },
  { word: "가방", meaning: "물건을 넣어 다니는 것" },
  { word: "별", meaning: "밤하늘에서 반짝이는 것" },
  { word: "눈", meaning: "하늘에서 내리는 하얀 것" },
  { word: "코끼리", meaning: "코가 긴 큰 동물" },
  { word: "우유", meaning: "소에서 나오는 흰 액체" },
  { word: "냉장고", meaning: "음식을 차게 보관하는 기계" },
  { word: "나무", meaning: "숲에 있는 초록 식물" },
  { word: "자동차", meaning: "길 위를 달리는 탈것" },
  { word: "시계", meaning: "시간을 알려주는 물건" },
  { word: "바다", meaning: "넓고 푸른 물의 공간" },
  { word: "모자", meaning: "머리에 쓰는 물건" },
];

const shuffle = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

const GamePage = () => {
  const [shuffledWords, setShuffledWords] = useState(() => shuffle(words));
  const [shuffledMeanings, setShuffledMeanings] = useState(() =>
    shuffle(words)
  );
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
  const [showModal, setShowModal] = useState<"timeout" | "success" | null>(null);


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
      <h1 className="text-green-400 text-3xl font-bold text-center font-ansim2 mb-8">
        단어 게임
      </h1>

      {/* 전체 줄 나눔 */}
      <div className="flex gap-10 justify-center items-start">
        {/* 왼쪽: 단어 카드 */}
        <div className="grid grid-cols-4 gap-3">
          {shuffledWords.map((item) => (
            <button
              key={item.word}
              onClick={() => handleSelect("word", item.word)}
              className={`w-[100px] h-[70px] bg-gray-800 rounded shadow text-lg hover:bg-green-500 transition-all
          ${matched.includes(item.word) ? "opacity-0 pointer-events-none" : ""}
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
                className={`w-[250px] h-[48px] bg-gray-700 rounded shadow text-middle px-3 hover:bg-green-500 transition-all
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
