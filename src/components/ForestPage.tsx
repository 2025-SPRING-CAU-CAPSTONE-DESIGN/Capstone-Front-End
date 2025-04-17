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
  { id: 1, src: img1, alt: "Story 1" },
  { id: 2, src: img2, alt: "Story 2" },
  { id: 3, src: img3, alt: "Story 3" },
  { id: 4, src: img4, alt: "Story 4" },
  { id: 5, src: img5, alt: "Story 5" },
  { id: 6, src: img6, alt: "Story 6" },
  { id: 7, src: img7, alt: "Story 7" },
  { id: 8, src: img8, alt: "Story 8" },
  { id: 9, src: img9, alt: "Story 9" },
  { id: 10, src: img10, alt: "Story 10" }
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
      <div className="relative z-10 flex items-center min-h-screen px-10">
        <div className="flex gap-6">
          {forestImages.map((img) => (
            <div
              key={img.id}
              className="flex-shrink-0 w-[30rem] h-[30rem] overflow-hidden shadow-lg"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForestPage;
