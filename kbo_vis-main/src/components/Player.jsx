// src/components/Player.jsx
import React from 'react';
import '../styles/player.css';
import kbologo from '/images/kbo중계.JPG'; // KBO 중계 이미지
export default function Player() {
  return (
    <div className="player">
      <img
        src={kbologo}
        alt="KBO 중계"
        className="kbo-image"
      />
    </div>
  );
}
