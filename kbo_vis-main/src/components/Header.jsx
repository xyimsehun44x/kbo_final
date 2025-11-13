// src/components/Header.jsx
import React from 'react';
import '../styles/header.css';
import kbologo from '/images/kbo_logo.JPG'
import tvinglogo from '/images/tving_logo.png';
export default function Header({ onToggleSidebar }) {
  return (
    <div className="header tving-header">
      {/* 상단 */}
      <div className="tving-header-top">
        <div className="tving-header-top-left">
          <img
            src={tvinglogo}
            alt="TVing Logo"
            className="tving_logo"
          />
        </div>
        <div className="tving-header-top-right">
          <span className="user-id-dropdown">
            <span className="user-id-label">
              사용자 이름 ▾
            </span>
          </span>
        </div>
      </div>

      {/* 하단 */}
      <div className="tving-header-bottom">
        <div className="tving-header-bottom-left">
          <img
            src={kbologo}
            alt="KBO Logo"
            className="kbo_logo"
          />
          <div className="nav-total">
            <span className="nav-total-label">홈</span>
            <span className="nav-total-label">영상</span>
            <span className="nav-total-label">일정</span>
            <span className="nav-total-label">순위/기록</span>
          </div>
        </div>
        <div className="tving-header-bottom-right">
          {/* data URI 아이콘들 */}
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHElEQVR4nO2ZO47CMBRFU7GDQbCVge3xW9YQAQJRQcEGCNs4IyMXIDlgjINjck8TRUlsH737nMJFIYToFkAPWAAX2k8FzMyaXSJz8mPqEjGWht83qnol9HtfgJGdqmpkEZ8SeTiXRNpeEWAFlDf3ZU3DlW0XKYGlh8jyFRGgD6yBv4+IhPBsDCtxtK9tsxQBfoCDfeUEDLLrEe4rYa79dySS9EgTEkmiBexjS3RThEg9kjxaRPyPJG32EF7cfodZijgqsyty6pEaGbMBbIrceqQJSBmtmCARD1SRAFC0PFC0AkDR8kDRCgBFywNFKwAULQ8UrQDoQrQq+2wUffDIAGM71dn10JyS5sak7nh6dlOZNnM2Es7jaSHEd/MPu2sQZoVbkpAAAAAASUVORK5CYII="
            alt="hide-sidepanel"
            className="sidebar-toggle-icon"
            onClick={onToggleSidebar}
            style={{ cursor: 'pointer' }}
          />
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuklEQVR4nO2Zy05TURSGNwNx6oTWcBmgj+AAxMsrmCiYQk2I+gAmqLEhAZ0BL2DiSB2YkMaBWsJYixNvb+DEqTrCiEKrn1l0nbg9aaAb1ml76vmTk5708v/rb/dae+1V5zJk6D4Ax4FrwGPgA/AV2NHrC/BeX7sK5F23ATgPVIAarUPe+wI41w0GTgLrXnB14BUwB4wBOeCIXnI/DtwEqvreCGvAiU6ZKALfNJDvwBIwEPB5MbYMbCnHJjCdbNQxAIvet7kKDLkDAhgGyh7fwkG5ggDcU8Hfet9nxHsD+NUWMzSWEyo4mQD/lGemYM3vJ3aUE3cSEWnolLycGU1CIKpOq+bk/+r0eTlTSWKfQCvMiCl5c70hrYSCs5bEstkJlsxI99eU0ix4btl21HQDa3mfMNCVfaau7U3OgvC6fjMvTSIM095Q7VkLMmnyBHMm0YVp31LthxZk0sUKxkyiC9OeUO23FmTSitPO/PC086r92YJsW8n6TaIL0z6q2j97xchmryytj5bJPm4SXZj2GdXe6JXy+8CCTIYJgqpJdGHar1X7otU6jVqUw7cK4S1KDThmRSrTDsGyCWFrmiuqWbYkPa2kPzrQxp+yJo9a+bLVOX2Pg9VT1XqWhMCoHj8FJXOBvzrzqiGTycGkRKZVRAYEUwnwX/aGDxes+eNiC56ZksUy0+U075mQx6JNxK2ZiXJm+BBcI15O+JDSO2MbefMACl7ObOkZOxe4T6xoJdxtDGPz4MhM8mNULQCVmHBVW4sJ3Uz79crrc7f1CFuPjV0H5RfomBmBjGxk2hH4t4IcD57Em9E9zBRcu6DLZRZ4BLzTErqtm9sn4A1wX5flwD7VsbNmjOfAtSZmrrgeMlN0aQM9ZmbyfzAz41JqZiczk5ICsOjSCOCSt8zuujSDRs605+/sDBncLv4AqVXBkihc3DUAAAAASUVORK5CYII="
            alt="search-v1"
          />
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbElEQVR4nO2Za4hVVRTHj/aamnzko0bTQJQoLEO0QIe0pMD8IJif/RBpai+jiEB8UIRFaFhookQSBpGEqRhhL8tIKjUoK/qQaWalk5mpmWOPnyznf2hxO/dc7z77MDeYP1y4nLX3f639WmvttZOkC13oQukAugHXAbOB54EtwHfAYeAv/Q7r2xa1mQWMsL6NMIAbgGXAfsKxXxzXd8bs3w5srzBoH7AGuBe4BRgKXAKcA5yr/0MlszYvAd9XcHwCTCl9lYDRUpbiELBE37sFTspocfzieD8GRpUxAJvRJ4E/pegnzWpTRB0XAvcDB6TDdC0y3bEU9AfeE7kd2qeB5ijk2fouBpZKF3IO/YuSDga+FuGPwI3RLK6te7xWHtkwKJToMmC3iD4DBka3trYNA4HPZcM3wKUh+9UOnGGHeZzSrK1tSx/gU9nyUV3nEnhGHfcALYEG2GRMAKbpd5N9C+QaAOyVTUvPttPNwD/AKXONAUrPB54AjmcEvyPAXKB7YPA9JdvG12rc3S3jwgBl5wFvOsPtsL6rbfqb+/5y4GAeVf+duf2BqS5K170NgMfV/2/gbovqTtYErHaDmR7Af5FLh6bkNTSfbbgvQEkzcFT9V+bEiLbUE9arwwA8oP5vJzkxw/bfMaBHUieAiW62J+S0W+fa1Z0ZAL2A32Xrf0OC0mrDunrJ1X+OM7Cqvwdede16BeraoP4zsoQvSjgrkLxJGW7VmAP0lucytIXoMej8GVYnlXDeakxSApTp+tV4rABXqzh2ZAkP1toWBQexwg3iHXPVBfhaxHMgS3hSwguKGp7BvdgN4oMQZ+JhNorrZJbwRKgnyQMw0w3iwxhXADrOo+GPLOEPEg4oqshx9nOH21Lx3pF4W/K2loV9Q2sMZeK8w63GuIi8reLcniVcJeGciAqXpzMXs6AA3CPeF7KE0yXcFFHhK+LcFYvTAGwU751JJczt6sLfbpeZpEFBR9A9ocQ0+64EvKGRzk0aFMCDsnFzXiMrnqX1qp4RlD4CrLVfUS6XPafedXKSB2CrGi5P4u1linIZVOdCF7V856HCcrvS5FuTBhkIMFZn2M7G2LPtNE/6rYx5ZQHlw6z0WbT8CVzu6sRP1dPR7u7r1dFqW0OSTgIdlc60trW17lxQV9e0tmWzMbw0a6vbMBj40qU4fUOJerp7vJV3pkW3Nt+Dtkn3F6H1tcpCW3p7NKyJZm31O/kKOZsz8SJ4JaoomFE1dY4XIx5WDEOec74vKcVSZK9Nhn0ROc2pjAGedem+4X3gmlh6qqXk66tcdDYBrwEL9DR3tarpzdqeffTtNqUZa92jjh/AxFIG4Ix9K6sEo1pvWp4Jwbd6ehtR6gBk7BWKqO3+4GnGt8mgn4G79ET3OvCVypvHVFA7JBdqh/c5rfBVpRvv4SogZ+pI2iqWEP7qHmGuTRoZdOReVs43PKS3k7R0hEqgUe7ipUFv5PZKlAV7pp6U/B/Av8njcb0Y2dvHQmBkZ9vWhaTBcRpUhP4DZQIkTgAAAABJRU5ErkJggg=="
            alt="ask-question-v1"
          />
        </div>
      </div>
    </div>
  );
}
