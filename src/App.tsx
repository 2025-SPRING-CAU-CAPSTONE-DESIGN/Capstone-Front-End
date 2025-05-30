import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root-Layout";
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import StoryPage from './components/StoryPage';
import SentencePage from './components/SentencePage';
import MyActivity from './components/MyActivity';
import JoinPage from './components/JoinPage';
import FriendPage from './components/FriendPage';
import GameLoadingPage from './components/GameLoadingPage';
import GamePage from './components/GamePage';
import ForestPage from './components/ForestPage';
import SentenceLoadingPage from './components/SentenceLoadingPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <Home />,
      },
      {
        path: "/storypage",
        element: <StoryPage />,
      },
      {
        path: "/sentencepage",
        element: <SentencePage />,
      },
      {
        path: "/gameLoading",
        element: <GameLoadingPage />,
      },
      {
        path: "/sentenceLoading",
        element: <SentenceLoadingPage />,
      },
      {
        path: "/myactivity",
        element: <MyActivity />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/join",
        element: <JoinPage />,
      },
      {
        path: "/friendpage",
        element: <FriendPage />,
      },
      {
        path: "/gamepage",
        element: <GamePage />,
      },
      {
        path: "/forest",
        element: <ForestPage />,
      },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
