import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { articleListData } from '../api/reactQuery/imageDataQuery';
import SearchBar from '../components/modules/SearchBar';
import useIntersection from '../hooks/useIntersection';

const Home = () => {
  const apiBaseUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  const { data, fetchNextPage, hasNextPage, isFetching } = articleListData();

  const infiniteScrollRef = useIntersection((entry, observer) => {
    // ref를 감지할 경우 실행되는 로직 작성
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const breakpointColumns = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  // 데이터가 없거나 pages가 비어 있는 경우 0으로 설정
  const totalElements = data?.pages?.[0]?.content?.length || 0;

  return (
    <div className="px-[1rem]">
      <SearchBar articleDataCount={totalElements} />
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid flex gap-3"
        columnClassName="my-masonry-grid_column"
      >
        {data?.pages?.map((page) => {
          return page.content.map((article: any) => (
            <Link key={article.id} to={`/article/detail/${article.id}`} className='cursor-pointer'>
              <div className="box mb-3">
                <img
                  className="rounded-2xl"
                  src={`${apiBaseUrl}/${article.imgFilePath}/${article.imgFileName}`}
                  alt={article.title || ''} // alt 속성 추가
                />
              </div>
            </Link>
          ));
        })}
      </Masonry>
      <div ref={infiniteScrollRef}></div>
    </div>
  );
};

export default Home;
