/*esLint-disable */

import {
  faAddressCard,
  faDoorClosed,
  faDoorOpen,
  faPen,
  faRectangleList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import { toastNotice } from '../toastr/ToastrConfig';
import LoginModal from '../modal/LoginModal';
import SignupModal from '../modal/SignupModal';
import {
  useShowLoginModal,
  useShowSingUpModal,
} from '../../store/display/displayState';

const Header = () => {
  const [searchTag, setSearchTag] = useState('');

  /* 24.03.14 메모. news 기본값은 data fetch로 설정? */
  const testNewsValue = true; /* 24.03.14 메모. 테스트 임시 변수 */
  const [news, setNews] = useState(testNewsValue);
  const [isLogin, setIsLogin] = useState(false);
  const [userNick, setUserNick] = useState('');
  const [iconVisible, setIconVisible] = useState(true); // 돋보기 svg를 위한 변수
  const [searchVisible, setSearchVisible] = useState(false); // 검색창
  const { showLoginModal, setShowLoginModal } = useShowLoginModal();
  const { showSignUpModal, setShowSignupModal } = useShowSingUpModal();
  const [showModifyModal, setShowModifyModal] = useState(false); // 회원정보수정을 위한 변수
  const searchRef = useRef(null); // 입력 필드에 대한 참조
  const navigate = useNavigate();
  const storedNick = localStorage.getItem('nickname');
  // console.log(storedNick);
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const frontUrl = process.env.REACT_APP_CORE_FRONT_BASE_URL;

  const logoutProcess = async () => {
    toastNotice('로그아웃 되었습니다.');
  };

  const handleShowLoginModal = () => {
    setShowSignupModal(false); // 회원가입 모달이 열려있을 수 있으므로 닫는다
    setShowLoginModal(true);
  };

  const handleShowSignupModal = () => {
    setShowLoginModal(false); // 로그인 모달이 열려있을 수 있으므로 닫는다

    setShowSignupModal(true);
  };

  const handleButtonClick = () => {
    setIconVisible(false);
    setSearchVisible(true);
  };

  const handleInputChange = (e: any) => {
    setSearchTag(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      navigate(`/article/${searchTag}`);
    }
  };

  const showNotification = () => {
    console.log('showNotification');
    setNews(false);
    /* 24.03.14 메모. news 값을 계정별로 저장하는 방법? */
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        searchRef.current &&
        !(searchRef.current as any).contains(event.target)
      ) {
        setSearchVisible(false);
      }
    }
    // 입력 필드가 표시될 때만 이벤트 리스너를 추가
    if (searchVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // 컴포넌트 정리 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchVisible]);

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      fetch(`${apiUrl}/api/member/checkAccessToken`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.resultCode === '200') {
            console.log('유효!!!!');
          } else {
            console.log('유효하지 않은 토큰입니다.');
          }
        })
        .catch((error) => {
          console.error('에러 발생 :', error);
        });
    }
  }, []);

  useEffect(() => {
    const storedNick = localStorage.getItem('nickname');
    if (storedNick) {
      setUserNick(storedNick);
    }
  }, []);

  return (
    <>
      <div
        className="navbar bg-base-100"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '40px',
          width: '100%',
          zIndex: 9999,
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {isLogin ? (
                <>
                  <li>
                    <Link
                      to=""
                      className="nav-link"
                      onClick={() => {
                        setShowSignupModal(false);
                        setShowLoginModal(false);
                        setShowModifyModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faAddressCard} /> 내 정보 수정
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/myarticle/${storedNick !== null ? storedNick : ''}`}
                    >
                      <FontAwesomeIcon icon={faRectangleList} /> 내 글 보기
                    </Link>
                  </li>
                  <li>
                    <Link to={`/article`}>
                      <FontAwesomeIcon icon={faPen} /> 글 쓰기
                    </Link>
                  </li>
                  <li>
                    <button className="nav-link" onClick={logoutProcess}>
                      <FontAwesomeIcon icon={faDoorClosed} />
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={``}
                      className="nav-link"
                      onClick={handleShowLoginModal}
                    >
                      <FontAwesomeIcon icon={faDoorOpen} />
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={``}
                      className="nav-link"
                      onClick={handleShowSignupModal}
                    >
                      <FontAwesomeIcon icon={faDoorOpen} />
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost text-xl" to={`/`}>
            Img_Forest
          </Link>
        </div>
        <div className="navbar-end">
          {/* 검색버튼 있는곳  */}

          {!searchVisible && (
            <button
              className="btn btn-circle btn-ghost"
              onClick={handleButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}
          {searchVisible && (
            <div className="search-wrapper" ref={searchRef}>
              <input
                type="text"
                placeholder="Type here"
                className="w-170 input input-bordered max-w-xs"
                value={searchTag}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          {/* 24.03.14 메모. 알림 버튼은 추후 isLogin을 해야지만 보이도록 설정. 
           현재 개발단계로 isLogin이 false 일 때 보이게 함.*/}
          {/* 24.03.14 메모. open or close를 위한
          Dropdown menu using <details> tag 선택지는 잠시 보류 */}
          {isLogin ? (
            ''
          ) : (
            <>
              <div className="dropdown dropdown-end dropdown-bottom">
                {/* <div tabIndex={0} role="button"> */}
                <button
                  className="btn btn-circle btn-ghost"
                  onClick={showNotification}
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {news ? (
                      <span className="badge indicator-item badge-primary badge-xs"></span>
                    ) : (
                      ''
                    )}
                  </div>
                </button>
                {/* </div> */}
                {/* 24.03.14 메모. img 크기 고정 필요성 고민*/}
                {/* 24.03.14 메모. img 주소 백엔드에서 임의 string으로 변환하는 게 좋을듯 */}
                {/* 24.03.14 메모. Link 누르면 클릭 배경색 고정되는 것(로그인 모달도 동일)*/}
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] w-80 rounded-box bg-base-100 p-2 shadow"
                >
                  {/* 24.03.14 메모. data fetch로 새 알림을 map 으로 생성해야 할듯 */}
                  <li>
                    <Link to={`/`}>
                      <p>👍 {'user1'}님이 좋아합니다.</p>
                      <img src="https://www.allrecipes.com/thmb/eKu_vXTbZJMdFsd5JdbY7kvDy80=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-DDMFS-4x3-b79a6ea27e0344399257ca1df67ca1cd.jpg" />
                    </Link>
                  </li>
                  <li>
                    <Link to={`/`}>
                      <div>
                        <p>💬 {'user2'}님이 댓글을 남겼습니다.</p>
                        <p>{'"맨유 화이팅"'}</p>
                      </div>
                      <img src="https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F08%2Fadidas-signs-premier-league-record-1-15-billion-manchester-united-sponsorship-with-increased-focus-on-womens-team-info-01.jpg?cbr=1&q=90" />
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      <LoginModal />
      <SignupModal />
      {/* <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
      <SignupModal
        showModal={showSignupModal}
        setShowModal={setShowSignupModal}
      />
      <ModifyModal
        showModal={showModifyModal}
        setShowModal={setShowModifyModal}
      /> */}
    </>
  );
};

export default Header;
