import forestBg from "../assets/forest_bg2.jpg";
import img1 from '../assets/Group 12.svg';
import img4 from '../assets/Group 13.svg';
import img5 from '../assets/Group 14.svg';
import img7 from '../assets/Group 15.svg';
import img6 from '../assets/Group 16.svg';
import img8 from '../assets/Group 17.svg';
import img3 from '../assets/Group 18.svg';
import img2 from '../assets/Group 19.svg';
import img9 from '../assets/Group 20.svg';
import img10 from '../assets/Group 21.svg';

const forestImages = [
  { id: 1, src: img1, label: "1단계 - 새싹나무" },
  { id: 2, src: img2, label: "2단계 - 도토리나무" },
  { id: 3, src: img3, label: "3단계 - 파란꽃나무" },
  { id: 4, src: img4, label: "4단계 - 빨간꽃나무" },
  { id: 5, src: img5, label: "5단계 - 사과나무" },
  { id: 6, src: img6, label: "6단계 - 딸기나무" },
  { id: 7, src: img7, label: "7단계 - 체리나무" },
  { id: 8, src: img8, label: "8단계 - 복숭아나무" },
  { id: 9, src: img9, label: "9단계 - 사탕나무" },
  { id: 10, src: img10, label: "10단계 - 별나무" },
];

const ForestPage = () => {
  return (
    <div className="relative min-h-screen bg-black font-ansim overflow-x-auto overflow-y-hidden">
      
      {/* ✅ 고정된 배경 이미지 */}
      <div className="fixed inset-0 z-0">
        <img
          src={forestBg}
          alt="Forest Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* ✅ 메인 콘텐츠 */}
      <div className="relative z-10 flex items-center min-h-screen px-10 mt-20">
  <div className="flex gap-6">
    {forestImages.map((img) => (
      <div
        key={img.id}
        className="flex-shrink-0 w-[30rem] h-[40rem] overflow-hidden shadow-lg flex flex-col items-center"
      >
        <img
          src={img.src}
          alt={img.label}
          className="w-[20rem] h-[30rem] rounded-xl shadow-lg object-cover"
        />
        <p className="text-white mt-6 text-2xl font-bold text-center">
          {img.label}
        </p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ForestPage;
