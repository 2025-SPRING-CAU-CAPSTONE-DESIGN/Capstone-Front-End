import React, { useState, useEffect } from "react";
import forestBg from "../assets/forest_bg2.jpg";
import tree from "../assets/tree.svg";
import leaf1 from "../assets/leaf_1.svg";
import leaf2 from "../assets/leaf_2.svg";
import leaf3 from "../assets/leaf_3.svg";
import leaf4 from "../assets/leaf_4.svg";
import leaf5 from "../assets/leaf_5.svg";
import acorn1 from "../assets/acron_1.svg";
import acorn2 from "../assets/acron_2.svg";
import acorn3 from "../assets/acron_3.svg";
import acorn4 from "../assets/acron_4.svg";
import acorn5 from "../assets/acron_5.svg";
import blue1 from "../assets/blue_1.svg";
import blue2 from "../assets/blue_2.svg";
import blue3 from "../assets/blue_3.svg";
import blue4 from "../assets/blue_4.svg";
import blue5 from "../assets/blue_5.svg";
import red1 from "../assets/red_1.svg";
import red2 from "../assets/red_2.svg";
import red3 from "../assets/red_3.svg";
import red4 from "../assets/red_4.svg";
import red5 from "../assets/red_5.svg";
import apple1 from "../assets/apple_1.svg";
import apple2 from "../assets/apple_2.svg";
import apple3 from "../assets/apple_3.svg";
import apple4 from "../assets/apple_4.svg";
import apple5 from "../assets/apple_5.svg";
import cherry1 from "../assets/cherry_1.svg";
import cherry2 from "../assets/cherry_2.svg";
import cherry3 from "../assets/cherry_3.svg";
import cherry4 from "../assets/cherry_4.svg";
import cherry5 from "../assets/cherry_5.svg";
import peach1 from "../assets/peach_1.svg";
import peach2 from "../assets/peach_2.svg";
import peach3 from "../assets/peach_3.svg";
import peach4 from "../assets/peach_4.svg";
import peach5 from "../assets/peach_5.svg";
import candy1 from "../assets/candy_1.svg";
import candy2 from "../assets/candy_2.svg";
import candy3 from "../assets/candy_3.svg";
import candy4 from "../assets/candy_4.svg";
import candy5 from "../assets/candy_5.svg";
import star1 from "../assets/star_1.svg";
import star2 from "../assets/star_2.svg";
import star3 from "../assets/star_3.svg";
import star4 from "../assets/star_4.svg";
import star5 from "../assets/star_5.svg";
import sb1 from "../assets/sb_1.svg";
import sb2 from "../assets/sb_2.svg";
import sb3 from "../assets/sb_3.svg";
import sb4 from "../assets/sb_4.svg";
import sb5 from "../assets/sb_5.svg";
import leaf from "../assets/leaf.svg";
import acorn from "../assets/acorn.svg";
import blue from "../assets/blue.svg";
import red from "../assets/red.svg";
import apple from "../assets/apple.svg";
import cherry from "../assets/cherry.svg";
import peach from "../assets/peach.svg";
import candy from "../assets/candy.svg";
import sb from "../assets/sb.svg";
import star from "../assets/star.svg";

const tierImages: { [key: string]: string[] } = {
  leaf: [leaf1, leaf2, leaf3, leaf4, leaf5],
  acorn: [acorn1, acorn2, acorn3, acorn4, acorn5],
  blue: [blue1, blue2, blue3, blue4, blue5],
  red: [red1, red2, red3, red4, red5],
  apple: [apple1, apple2, apple3, apple4, apple5],
  strawberry: [sb1, sb2, sb3, sb4, sb5],
  cherry: [cherry1, cherry2, cherry3, cherry4, cherry5],
  peach: [peach1, peach2, peach3, peach4, peach5],
  candy: [candy1, candy2, candy3, candy4, candy5],
  star: [star1, star2, star3, star4, star5],
};

const tierImageMap: { [key: string]: string } = {
  leaf,
  acorn,
  blue,
  red,
  apple,
  strawberry: sb,
  cherry,
  peach,
  candy,
  star,
};

const tierNames: { [key: string]: string } = {
  leaf: "새싹나무",
  acorn: "도토리나무",
  blue: "파란꽃나무",
  red: "빨간꽃나무",
  apple: "사과나무",
  strawberry: "딸기나무",
  cherry: "체리나무",
  peach: "복숭아나무",
  candy: "사탕나무",
  star: "별나무",
};

const getUserTierImages = (
  storyCount: number
): { image: string; name: string }[] => {
  const tierImagesToShow: { image: string; name: string }[] = [];

  const tierThresholds = [
    { tier: "leaf", threshold: 5 },
    { tier: "acorn", threshold: 5 },
    { tier: "blue", threshold: 5 },
    { tier: "red", threshold: 5 },
    { tier: "apple", threshold: 5 },
    { tier: "strawberry", threshold: 5 },
    { tier: "cherry", threshold: 5 },
    { tier: "peach", threshold: 5 },
    { tier: "candy", threshold: 5 },
    { tier: "star", threshold: 5 },
  ];

  let remaining = storyCount;

  for (const { tier, threshold } of tierThresholds) {
    const tierImagesArr = tierImages[tier];

    if (remaining >= threshold) {
      tierImagesToShow.push({
        image: tierImagesArr[threshold - 1],
        name: tierNames[tier],
      });
      remaining -= threshold;
    } else if (remaining > 0) {
      tierImagesToShow.push({
        image: tierImagesArr[remaining - 1],
        name: tierNames[tier],
      });
      remaining = 0;
    } else {
      tierImagesToShow.push({
        image: tree,
        name: tierNames[tier],
      });
    }
  }

  return tierImagesToShow;
};

const ForestPage: React.FC = () => {
  const [storyCount, setStoryCount] = useState<number>(0);
  const [imagesToShow, setImagesToShow] = useState<
    { image: string; name: string }[]
  >([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(
    null
  );
  const [selectedStory, setSelectedStory] = useState<{
    storyId: number;
    title: string;
    content: string;
    score: number;
  } | null>(null);

  useEffect(() => {
    const getStoryCount = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch("http://localhost:8080/users/tier", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        const totalStory = data.result?.totalStory;

        if (typeof totalStory === "number") {
          setStoryCount(totalStory);
          console.log("Total Story Count:", totalStory);
        }
      } catch (error) {
        console.error("Error fetching story count:", error);
      }
    };

    getStoryCount();
  }, []);

  useEffect(() => {
    if (storyCount >= 0) {
      const images = getUserTierImages(storyCount);
      setImagesToShow(images);
    }
  }, [storyCount]);

  useEffect(() => {
  if (selectedModalIndex !== null) {
    const tierThreshold = 5;
    const ownedCount = Math.min(
      Math.max(storyCount - selectedModalIndex * tierThreshold, 0),
      5
    );
    if (ownedCount > 0) {
      const firstStoryId = selectedModalIndex * tierThreshold + 1;
      fetchStoryDetail(firstStoryId);
    } else {
      setSelectedStory(null); // 이야기 없을 땐 초기화
    }
  }
}, [selectedModalIndex]);


  const fetchStoryDetail = async (storyId: number) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`http://localhost:8080/users/${storyId}/story`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (json.isSuccess) {
        setSelectedStory({
          storyId: storyId,
          title: json.result.title,
          content: json.result.content,
          score: json.result.score,
        });
      } else {
        setSelectedStory(null);
      }
    } catch (error) {
      console.error("Error fetching story detail:", error);
      setSelectedStory(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-black font-ansim overflow-x-auto overflow-y-hidden">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 z-0">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* 나무 리스트 */}
      <div className="relative z-10 flex items-center min-h-screen px-10 mt-20">
        <div className="flex gap-6">
          {imagesToShow.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[30rem] h-[40rem] overflow-hidden shadow-lg flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedModalIndex(index)}
            >
              <img
                src={item.image}
                alt={`Tier ${index + 1}`}
                className="w-[20rem] h-[30rem] rounded-xl shadow-lg object-cover"
              />
              <p className="text-white mt-6 text-2xl font-bold text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {selectedModalIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-gray-800 w-[80%] h-[80%] rounded-xl shadow-xl p-8 relative overflow-y-auto">

            {/* 닫기 버튼 */}
            <button
              onClick={() => {
                setSelectedModalIndex(null);
                setSelectedStory(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
            >
              &times;
            </button>

            {/* 티어 이름 */}
            <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
              {imagesToShow[selectedModalIndex].name}
            </h2>

            {/* 열매 5개 이미지 */}
            <div className="flex justify-center gap-4 mb-8">
              {(() => {
                const tierOrder = [
                  'leaf', 'acorn', 'blue', 'red', 'apple',
                  'strawberry', 'cherry', 'peach', 'candy', 'star'
                ];
                const currentTier = tierOrder[selectedModalIndex];
                const tierThreshold = 5;
                const tierImage = tierImageMap[currentTier];

                const ownedCount = Math.min(
                  Math.max(storyCount - selectedModalIndex * tierThreshold, 0),
                  5
                );

                return Array.from({ length: 5 }).map((_, i) => {
                  const isUnlocked = i < ownedCount;
                  const isLastUnlocked =
                    selectedStory && selectedStory.storyId === (selectedModalIndex * tierThreshold + i + 1);

                  const sizeClass = isLastUnlocked ? "w-40 h-40" : "w-24 h-24";
                  const opacityClass = isUnlocked ? "opacity-100" : "opacity-30";
                  const storyId = selectedModalIndex * tierThreshold + i + 1;

                  return (
                    <img
                      key={i}
                      src={tierImage}
                      alt={`${currentTier} 열매 ${i + 1}`}
                      className={`${sizeClass} ${opacityClass} transition-all duration-300 rounded-xl cursor-pointer`}
                      onClick={() => isUnlocked && fetchStoryDetail(storyId)}
                    />
                  );
                });
              })()}
            </div>

            {/* 확장 영역 - 선택한 스토리 정보 출력 */}
            {(() => {
              const tierThreshold = 5;
              const ownedCount = Math.min(
                Math.max(storyCount - selectedModalIndex * tierThreshold, 0),
                5
              );

              if (ownedCount === 0) {
                return (
                  <p className="text-white text-center text-lg mt-6">
                    아직 이야기가 없어요. 이야기를 만들어봐요!
                  </p>
                );
              }

              if (selectedStory) {
                return (
                  <div className="text-white text-center">
                    <h3 className="text-2xl mb-2">나의 {selectedStory.storyId}번째 이야기</h3>
                    <p className="mb-1">제목: {selectedStory.title}</p>
                    <p className="mb-1">내용: {selectedStory.content}</p>
                    <p className="mb-1">점수: {selectedStory.score}점</p>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForestPage;
