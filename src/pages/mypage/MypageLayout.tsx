import { Link, useLocation } from "react-router-dom";
const MypageLayout = () => {
  const location = useLocation();
    return (
      <ul className="flex h-[5rem] items-center gap-[0.5rem] outline outline-[#cacaca] outline-offset-[-1px] outline-[1px] mb-[1rem]">
        <li
          className={`${location.pathname == '/mypage' ? 'text-[#219653]' : 'text-black'}`}
        >
          <Link to="/mypage"> 개인정보수정 </Link>
        </li>
        <li
          className={`${location.pathname == '/mypage/buy-list' ? 'text-[#219653]' : 'text-black'}`}
        >
          <Link to="/mypage/buy-list"> 구매내역 </Link>
        </li>
        <li
          className={`${location.pathname == '/mypage/like-list' ? 'text-[#219653]' : 'text-black'}`}
        >
          <Link to="/mypage/like-list"> 추천글목록 </Link>
        </li>
        <li
          className={`${location.pathname == '/mypage/sell-list' ? 'text-[#219653]' : 'text-black'}`}
        >
          <Link to="/mypage/sell-list"> 판매내역 </Link>
        </li>
      </ul>
    );
};
export default MypageLayout