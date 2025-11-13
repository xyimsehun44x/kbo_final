// src/components/Scoreboard.jsx
import React from 'react';
import '../styles/scoreboard.css';

export default function Scoreboard({ onShowPopup }) {
  return (
    <div className="scoreboard-root">
      {/* 메인 스코어보드 */}
      <div className="main-scoreboard">
        {/* 키움 팀 정보 */}
        <div className="team-info">
          <img
            src="/kbo_vis/images/kw.PNG"
            alt="키움"
            className="team-logo-big"
          />
          <div className="team-name-big">키움</div>
          <div className="pitcher">투: 주승우</div>
        </div>

        {/* 중앙 게임 정보 */}
        <div className="game-info">
            <div
            className="score-line"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '180px'
            }}
            >
            <div className="score-big">0</div>
            <div
                className="score-center"
                style={{ textAlign: 'center' }}
            >
                <div className="status">5회말</div>
                <div className="date">사직</div>
                <div className="location">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGN0lEQVR4nO2dW6hVRRjHR62TQllZWmpqSUEkRUZBERaJhnVM66G3oLcTGklBVo899JLisQtJVEYXONGNrCDQKKzoIQs9VnTvGJ1jF82uZKbmLz7Wd2AcZu2zPXtvZ82a+T3qPnv/Z/3XmjXzzXzfGJPJZDKZTCaTyWQymUwmc0QAJwCXA8uAR4FNwIfAV8DPwD7gX+BX4FvgY+BN4BHgNuBqYHK+7KMEOAa4CugFvgAO0TryHduBB4DrgAm1MghYCuzSO3RJm75zPvAssIfO8wewHrgCGGNiB9hpNW6ohe85DrgZ6Ccc3wC3iBYTK26LRvH3xwK3Az82ccH+Az4H+oCVwLXApcC5wOnAeKALOBmYDZyvT7B89glgC3Cwid+Rm+yOKLuzVgzRl+xnI1ycX7RLkYt/fBv0TtR3x1pgcITfHgC6Td0NAWYAGxpciP3AM8ACebF3UPtY/Q35rb0N9IjWmaaOhgCL9a73sU8vztlHR/1huiYD9wK/NXj532jqYogOYVeVDF0PahcSfI4ATFKd8pS6HFKdXSZmQ7SR75XceR8BF5mKAcwBNpdoflcGDiZGQ3T0IzNml390dDXOVBRgDLBctbpIm6aZmAwBZmlYw0VGN5eYSADmlrTjO+AcE4MhwFnA955GvC9PjYkMiuGyxM5cdlTqSfEZouI/9Yjvi3kWTDHplDb4uq9qvFM84sYBb3j+/cVOzimOFjp3WVfyog8/+vIIkyiqy6sSIjE1gcIU35PSW0VDXN6KuZsaofva5JmntCXiPWpGMGMImGJqCsW70h19yZLBGSFFlXEAmGdqDkVE2Y2DvRRSUBl3mUSgWFJ2uSaUmHazI1hjWpvRb/Ysdo0PIaYTDJnIAM7zBCRXhBDSCQZNhACr3XYc9RFmB8wYABaZCNGo9p9Oe3pC60oairUUm69rsZslVoDTPMPg2g//K43uKbN5LLSmpKHYTWPze5RbiuoCRcRbwkY2cW0nqhvAg44ha0JrShqKHZM2W0NrShrgJGfbqmyDPSW0rqSh2OJkszC0pqQBnnQMuTW0pqQB7nYMeSi0pqQBrncM2RhaU9IAFzqGbA+tKWkoNgvaDESRU1hXgFMdQ3ZXNqcwBSjyJm32deJHJA/cJvxuvQqjewQ62mW52U959tkA2bChS7mDHVkJ1S34NrPa/iOZ5gE+cQy5IF+/gGjtEJulIfUkjxZysVmZ/EUJiWz+cgx5PKig1PGsF28qxSlpNMHezjWXRZgTQ+tKGq03ZbM4tKak0WoGNmtDa0oaraZjI7PQsaF1JYvWpXKLtCwIrStptCCYzdOhNSUNcKVjiNQDmRpaV7JoGpekbdncH1pX0mjBSBtJVplk4g2TD9BmQqyIuZuKV5kIYeT6i9U3RBsi1Tvd/PToQvL4KxdFacgELettszm2NC6Kqqc7ojdEG9Pt0bLcJAJwT6UMUVEbPBVGK1dLsUPD/wNVNGSmnkpgI4VZJpqaQlFP"
                    alt="update-left-rotation"
                />
                </div>
                <button className="play-summ"
                onClick={onShowPopup}>

                    ▶ Play
                </button>            
            </div>

            <div className="score-big">4</div>
            </div>
        </div>
        <div className="team-info">
            <img
                src="/kbo_vis/images/lt.PNG"
                alt="Lotte"
                className="team-logo-big"
            />
            <div className="team-name-big">롯데</div>
            <div className="pitcher">투: 김원중</div>
          </div>
        </div>
      {/* 이닝 테이블 */}
      <div className="inning-table-wrapper">
        <table className="inning-table">
          <thead>
            <tr>
              <th>팀명</th>
              <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
              <th>6</th><th>7</th><th>8</th><th>9</th>
              <th>R</th><th>H</th><th>E</th><th>B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>키움</td>
              <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
              <td className="empty">-</td><td className="empty">-</td>
              <td className="empty">-</td><td className="empty">-</td>
              <td>6</td><td>11</td><td>2</td><td>2</td>
            </tr>
            <tr>
              <td>롯데</td>
              <td>4</td><td>0</td><td>0</td><td>0</td><td>0</td>
              <td className="empty">-</td><td className="empty">-</td>
              <td className="empty">-</td><td className="empty">-</td>
              <td>5</td><td>9</td><td>0</td><td>1</td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* 다른 경기 카드 목록 */}
      <div className="scoreboard-container">
        {/** 롯데 vs 삼성 **/}
        <div className="match-card">
          <div className="match-status">경기 종료</div>
          <div className="team-row">
            <img src="/kbo_vis/images/lt.PNG" alt="롯데" className="team-logo" />
            <span className="team-name">롯데</span>
            <span className="team-score">3</span>
          </div>
          <div className="team-row">
            <img src="/kbo_vis/images/ss.PNG" alt="삼성" className="team-logo" />
            <span className="team-name">삼성</span>
            <span className="team-score">9</span>
          </div>
        </div>
        {/** 두산 vs KT **/}
        <div className="match-card">
          <div className="match-status">경기 종료</div>
          <div className="team-row">
            <img src="/kbo_vis/images/ds.PNG" alt="두산" className="team-logo" />
            <span className="team-name">두산</span>
            <span className="team-score">2</span>
          </div>
          <div className="team-row">
            <img src="/kbo_vis/images/kt.PNG" alt="KT" className="team-logo" />
            <span className="team-name">KT</span>
            <span className="team-score">12</span>
          </div>
        </div>
        {/** NC vs SSG **/}
        <div className="match-card">
          <div className="match-status">경기 종료</div>
          <div className="team-row">
            <img src="/kbo_vis/images/nc.PNG" alt="NC" className="team-logo" />
            <span className="team-name">NC</span>
            <span className="team-score">5</span>
          </div>
          <div className="team-row">
            <img src="/kbo_vis/images/ssg.PNG" alt="SSG" className="team-logo" />
            <span className="team-name">SSG</span>
            <span className="team-score">6</span>
          </div>
        </div>
        {/** 한화 vs LG **/}
        <div className="match-card">
          <div className="match-status">경기 종료</div>
          <div className="team-row">
            <img src="/kbo_vis/images/hh.PNG" alt="한화" className="team-logo" />
            <span className="team-name">한화</span>
            <span className="team-score">1</span>
          </div>
          <div className="team-row">
            <img src="/kbo_vis/images/lg.PNG" alt="LG" className="team-logo" />
            <span className="team-name">LG</span>
            <span className="team-score">3</span>
          </div>
        </div>
        {/** 키움 vs KIA **/}
        <div className="match-card">
          <div className="match-status">경기 종료</div>
          <div className="team-row">
            <img src="/kbo_vis/images/kw.PNG" alt="키움" className="team-logo" />
            <span className="team-name">키움</span>
            <span className="team-score">3</span>
          </div>
          <div className="team-row">
            <img src="/kbo_vis/images/kia.PNG" alt="KIA" className="team-logo" />
            <span className="team-name">KIA</span>
            <span className="team-score">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
