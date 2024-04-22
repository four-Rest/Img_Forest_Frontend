import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import '../styles/styles.css';
type ArticleData = {
  id: string;
  imgFileName: string;

  imgFilePath: string;
  likes: number;
  paid: boolean;
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const target = useRef<HTMLDivElement>(null);
  const [articleData, setArticleData] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // 표시할 이미지의 시작 인덱스
  const [endIndex, setEndIndex] = useState(10); // 표시할 이미지의 마지막 인덱스
  const apiBaseUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['imageData'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/api/article`); // API에서 이미지 데이터를 가져옴
      const data = await res.json(); // 응답 데이터를 JSON 형식으로 변환

      //데이터의 길이를 받아와 준다.?여기선안해도될듯
      setArticleData(data.data.content); // 기존 이미지 데이터에 새로운 데이터를 추가 일케하면 계속생기네?
      console.log(data.data.totalElements); // 이걸 안넘게하면되나?
      console.log('데이터 개수:', articleData);
      return data;
    },
  });

  useEffect(() => {
    if (!isPending && target.current) {
      const observer = new IntersectionObserver(
        async (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setEndIndex((prev) =>
                Math.min(prev + 10, data.data.totalElements),
              );
              console.log('관찰 대상 요소가 화면에 나타남');
              // 관련 작업 수행
            } else {
              return () => {
                if (target.current) observer.unobserve(target.current);
              };
            }
          });
        },
        { threshold: 0 },
      );

      observer.observe(target.current);

      // 컴포넌트가 언마운트될 때 옵저버를 정리하기 위해 cleanup 함수를 반환
    }
  }, [isPending]); // 빈 배열을 의존성 배열로 전달하여 한 번만 실행되도록 설정

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 480: 1, 768: 2, 1200: 3 }}>
        <Masonry gutter="20px">
          {articleData.slice(startIndex, endIndex).map((article) => (
            <div key={article.id} className="box">
              <img
                className="rounded-2xl"
                src={`${apiBaseUrl}/${article.imgFilePath}/${article.imgFileName}`}
                alt={``}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <div ref={target}></div>
    </div>
  );
};
export default Home;
