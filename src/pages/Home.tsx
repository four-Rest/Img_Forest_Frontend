import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImageData } from '../api/reactQuery/imageDataQuery';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const target = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // 표시할 이미지의 시작 인덱스
  const [endIndex, setEndIndex] = useState(10); // 표시할 이미지의 마지막 인덱스
  const apiBaseUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;

  const { isPending, data, articleData } = useImageData();

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
          <div ref={target}></div>
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};
export default Home;
