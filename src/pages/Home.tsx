import { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import { useImageData } from '../api/reactQuery/imageDataQuery';
import SearchBar from '../components/modules/SearchBar';

const Home = () => {
  const target = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // 표시할 이미지의 시작 인덱스
  const [endIndex, setEndIndex] = useState(0); // 표시할 이미지의 마지막 인덱스
  const [morePhoto, setMorePhto] = useState(true);
  const apiBaseUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;

  const { isPending, data, articleData, refetch } = useImageData();

  const breackpoindtColumns = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  const fetchData = () => {
    setTimeout(() => {
      setEndIndex((prev) => Math.min(prev + 10, data.data.totalElements));

      if (endIndex === data.data.totalElements) {
        // 현재 토탈데이터가 45로 되어있어 "마지막 이미지입니다" 문구가 출력되지 않음
        refetch();
        setMorePhto(false);
        return;
      }

      setMorePhto(true);
    }, 500);
  };

  return (
    <div>
      <SearchBar />
      <InfiniteScroll
        dataLength={articleData.slice(startIndex, endIndex).length} //This is important field to render the next data
        next={fetchData}
        hasMore={morePhoto}
        loader={<h4 className="flex justify-center">Loading...</h4>}
        endMessage={
          <h4 className="flex justify-center">마지막 이미지입니다.</h4>
        }
      >
        <Masonry
          breakpointCols={breackpoindtColumns}
          className="my-masonry-grid flex gap-3"
          columnClassName="my-masonry-grid_column"
        >
          {articleData.map((article) => (
            <div key={article.id} className="box mb-3">
              <img
                className="rounded-2xl"
                src={`${apiBaseUrl}/${article.imgFilePath}/${article.imgFileName}`}
                alt={``}
              />
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};
export default Home;
