// import { useEffect } from "react";

// const Home = () => {

//   const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
//   useEffect(()=>{
//       const login = async () => {
//           const response = await fetch(`${apiUrl}/api/member/login`, {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               method: "POST",
//               credentials: "include",
//               body: JSON.stringify({
//                 username: "test666",
//                 password: "test666",
//               }),
//             }).catch(err => {
//               return null;
//             })
//             if (response != null) {
//               const res = await response.json(); // 응답이 성공적인 경우에만 JSON 파싱
//               localStorage.setItem("username", res.data.username);
//               localStorage.setItem("nickname", res.data.nickname);
//               localStorage.setItem('isLogin', 'true');
//               console.log("로그인")
//             }
//       }
//       login();
//   },[])

//   return (
//      <div> 123456 </div>
//   );
// };
// export default Home


import { useEffect, useRef, useState } from "react";
import './styles.css';

function Home() {
  const [articleData, setArticleData] = useState([]); // 이미지 데이터 배열
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [startIndex, setStartIndex] = useState(0); // 표시할 이미지의 시작 인덱스
  const [endIndex, setEndIndex] = useState(30); // 표시할 이미지의 마지막 인덱스
  const apiBaseUrl = process.env.REACT_APP_CORE_API_BASE_URL; // 환경 변수에서 API 기본 URL을 가져옴
  const imgBaseUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;
  const target = useRef(null); // IntersectionObserver를 위한 ref 생성

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트되었을 때, 데이터를 가져오는 비동기 함수 호출
    const fetchData = async () => {
      setLoading(true); // 로딩 상태를 true로 설정
        const res = await fetch(`${apiBaseUrl}/api/article/page?pageNo=2`, {
          method: 'GET',
        }); // API에서 이미지 데이터를 가져옴
      const data = await res.json(); // 응답 데이터를 JSON 형식으로 변환
        setArticleData((prevData) => prevData.concat(data.data.content)); // 기존 이미지 데이터에 새로운 데이터를 추가
        console.log('데이터 개수:', data.data.content.length); // 데이터 개수를 콘솔에 출력
      setLoading(false); // 로딩 상태를 false로 설정
    };
    fetchData(); // fetchData 함수 호출
  }, [apiBaseUrl]); // apiBaseUrl이 변경될 때만 useEffect 실행

  useEffect(() => {
    // useEffect를 사용하여 target 요소의 가시성을 감시하고 스크롤 시 추가 데이터 로드
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // target 요소가 화면에 나타났고 로딩 중이 아닌 경우
          setLoading(true); // 로딩 상태를 true로 설정
          setEndIndex((prevEndIndex) =>
            Math.max(
              prevEndIndex + 10,
              Math.min(prevEndIndex + 10, articleData.length)
            )
          ); // endIndex를 업데이트하여 추가 이미지를 표시
          //setEndIndex(prevEndIndex => Math.min(prevEndIndex + 10, articleData.length));
          // 현재 ArticleData.length=45, 어떨때는 40개 렌더링 어떨때는 50개 렌더링
        }
      },
      { threshold: 0 }
    ); // IntersectionObserver 옵션 설정

    if (!loading && target.current) {
      // 로딩 중이 아니고 target이 현재 존재하는 경우
      observer.observe(target.current); // IntersectionObserver를 target에 등록하여 가시성 감시
    }

    console.log("Home.tsx 파일 : ",articleData);

    return () => {
      if (target.current) {
        observer.unobserve(target.current); // 컴포넌트 언마운트 시 IntersectionObserver에서 target 제거
      }
    };
  }, [loading, articleData]); // loading 또는 articleData가 변경될 때만 useEffect 실행

  return (
    <div className="container">
      {/* {articleData.slice(startIndex, endIndex).map((article: any) => ( */}
      {articleData.map((article: any) => (
        <div key={article.id} className="box" onClick={()=>{window.location.href=`/article/detail/${article.id}`}}>
          <img
            src={`${imgBaseUrl}/${article.imgFilePath}/${article.imgFileName}`}
            alt=""
          />
        </div>
      ))}
      <div ref={target}></div>
    </div>
  );
}

export default Home; // Home 컴포넌트를 내보냄
