// App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Player from './components/Player';
import Scoreboard from './components/Scoreboard';
import Sidebar from './components/Sidebar';
import WinProbChart from './components/Popup';
import './styles/main.css';

export default function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarKey, setSidebarKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const toggleSidebar = () => {
    const newState = !showSidebar;
    setShowSidebar(newState);

    if (newState) {
      // 0.5초 후 Sidebar 컴포넌트 재생성
      setTimeout(() => {
        setSidebarKey(prev => prev + 1);
      }, 500);
    }
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <div className="content">
        <div
          className="left-content"
          style={{ width: showSidebar ? '70%' : '100%' }}
        >
          <Player />
          <Scoreboard onShowPopup={() => setShowPopup(true)} />
        </div>

        {/* ✅ Sidebar는 열릴 때 0.5초 후 새로 렌더링됨 */}
        {showSidebar && <Sidebar key={sidebarKey} />}
      </div>

      <WinProbChart visible={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}
