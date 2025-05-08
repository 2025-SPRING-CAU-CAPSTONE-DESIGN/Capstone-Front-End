import React, { useState, useEffect } from 'react';
import forestBg from "../assets/forest_bg2.jpg";
import tree from "../assets/tree.svg";
import leaf1 from '../assets/leaf_1.svg';
import leaf2 from '../assets/leaf_2.svg';
import leaf3 from '../assets/leaf_3.svg';
import leaf4 from '../assets/leaf_4.svg';
import leaf5 from '../assets/leaf_5.svg';
import acorn1 from '../assets/acron_1.svg';
import acorn2 from '../assets/acron_2.svg';
import acorn3 from '../assets/acron_3.svg';
import acorn4 from '../assets/acron_4.svg';
import acorn5 from '../assets/acron_5.svg';
import blue1 from '../assets/blue_1.svg';
import blue2 from '../assets/blue_2.svg';
import blue3 from '../assets/blue_3.svg';
import blue4 from '../assets/blue_4.svg';
import blue5 from '../assets/blue_5.svg';
import red1 from '../assets/red_1.svg';
import red2 from '../assets/red_2.svg';
import red3 from '../assets/red_3.svg';
import red4 from '../assets/red_4.svg';
import red5 from '../assets/red_5.svg';
import apple1 from '../assets/apple_1.svg';
import apple2 from '../assets/apple_2.svg';
import apple3 from '../assets/apple_3.svg';
import apple4 from '../assets/apple_4.svg';
import apple5 from '../assets/apple_5.svg';
import cherry1 from '../assets/cherry_1.svg';
import cherry2 from '../assets/cherry_2.svg';
import cherry3 from '../assets/cherry_3.svg';
import cherry4 from '../assets/cherry_4.svg';
import cherry5 from '../assets/cherry_5.svg';
import peach1 from '../assets/peach_1.svg';
import peach2 from '../assets/peach_2.svg';
import peach3 from '../assets/peach_3.svg';
import peach4 from '../assets/peach_4.svg';
import peach5 from '../assets/peach_5.svg';
import candy1 from '../assets/candy_1.svg';
import candy2 from '../assets/candy_2.svg';
import candy3 from '../assets/candy_3.svg';
import candy4 from '../assets/candy_4.svg';
import candy5 from '../assets/candy_5.svg';
import star1 from '../assets/star_1.svg';
import star2 from '../assets/star_2.svg';
import star3 from '../assets/star_3.svg';
import star4 from '../assets/star_4.svg';
import star5 from '../assets/star_5.svg';
import sb1 from '../assets/sb_1.svg';
import sb2 from '../assets/sb_2.svg';
import sb3 from '../assets/sb_3.svg';
import sb4 from '../assets/sb_4.svg';
import sb5 from '../assets/sb_5.svg';

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

const tierNames: { [key: string]: string } = {
  leaf: '새싹나무',
  acorn: '도토리나무',
  blue: '파란꽃나무',
  red: '빨간꽃나무',
  apple: '사과나무',
  strawberry: '딸기나무',
  cherry: '체리나무',
  peach: '복숭아나무',
  candy: '사탕나무',
  star: '별나무',
};

const getUserTierImages = (storyCount: number): { image: string; name: string }[] => {
  const tierImagesToShow: { image: string; name: string }[] = [];
  const tierThresholds = [
    { tier: 'leaf', threshold: 5 },
    { tier: 'acorn', threshold: 10 },
    { tier: 'blue', threshold: 15 },
    { tier: 'red', threshold: 20 },
    { tier: 'apple', threshold: 25 },
    { tier: 'strawberry', threshold: 30 },
    { tier: 'cherry', threshold: 35 },
    { tier: 'peach', threshold: 40 },
    { tier: 'candy', threshold: 45 },
    { tier: 'star', threshold: 50 },
  ];

  let remainingStories = storyCount;
  
  // 모든 티어를 출력할 것임으로 이미지와 이름을 10개 다 띄운다.
  tierThresholds.forEach(({ tier, threshold }, index) => {
    const imagesForTier = tierImages[tier];
    const countForTier = Math.min(Math.floor(remainingStories / threshold), imagesForTier.length);

    // 해당 티어에 맞는 이미지를 포함한 배열 추가
    if (countForTier > 0) {
      tierImagesToShow.push({
        image: imagesForTier[0],  // 해당 티어에서 첫 번째 이미지를 보여줌
        name: tierNames[tier],
      });
    } else {
      tierImagesToShow.push({
        image: tree,  // 티어를 충족하지 않으면 'tree' 이미지를 표시
        name: tierNames[tier],
      });
    }
  });

  // 티어명을 모두 10개로 고정하여 반환
  return tierImagesToShow;
};

const ForestPage: React.FC = () => {
  const [storyCount, setStoryCount] = useState<number>(0);
  const [imagesToShow, setImagesToShow] = useState<{ image: string; name: string }[]>([]);

  useEffect(() => {
    const getStoryCount = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch('http://localhost:8080/users/tier', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const totalStory = data.totalStory;
        setStoryCount(totalStory);
      } catch (error) {
        console.error('Error fetching story count:', error);
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

  return (
    <div className="relative min-h-screen bg-black font-ansim overflow-x-auto overflow-y-hidden">
      <div className="fixed inset-0 z-0">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 flex items-center min-h-screen px-10 mt-20">
        <div className="flex gap-6">
          {imagesToShow.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[30rem] h-[40rem] overflow-hidden shadow-lg flex flex-col items-center">
              <img
                src={item.image}
                alt={`Tier ${index + 1}`}
                className="w-[20rem] h-[30rem] rounded-xl shadow-lg object-cover"
              />
              <p className="text-white mt-6 text-2xl font-bold text-center">
                {item.name} {/* 티어명 출력 */}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForestPage;
