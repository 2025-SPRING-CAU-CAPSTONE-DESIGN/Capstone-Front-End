import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="w-full h-[100px] fixed top-0 left-0 bg-black shadow-md z-50 px-8 flex items-center justify-between">
      <div className="shrink-0 -mr-5">
        <Link to = '/'>
        <img src = {logo} alt="logo" className="w-[7rem] h-[7rem]"/>
        </Link>
      </div>
      <div className="shrink-0 mr-20">
        <Link to='/' className="w-[30%] font-ansim2 text-green-400 text-4xl font-bold hover:text-green-300 transition-colors">
          이야기숲
        </Link>
      </div>
      <div className="ml-20 flex-grow flex justify-between  font-ansim text-2xl flex items-center ">
        <Link to='/storypage' className="text-white  hover:text-green-300 transition-colors">
          동화만들기
        </Link>
        <Link to='/wordpage' className="text-white hover:text-green-300 transition-colors">
          문장만들기
        </Link>
        <Link to='/gameLoading' className="text-white  hover:text-green-300 transition-colors">
          단어게임
        </Link>
        <Link to='/myactivity' className="text-white  hover:text-green-300 transition-colors">
          내 활동보기
        </Link>
        <Link to='/login' className="text-white text-lg border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition-all">
          로그인
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
