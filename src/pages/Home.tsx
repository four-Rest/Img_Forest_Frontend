import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { articleListData } from '../api/reactQuery/imageDataQuery';
import SearchBar from '../components/modules/SearchBar';
import useIntersection from '../hooks/useIntersection';

const Home = () => {
  const apiBaseUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;

  const infiniteScrollRef = useIntersection((entry, observer) => {
    // ref를 감지할 경우 실행되는 로직작성
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const breackpoindtColumns = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = articleListData();

  return (
    <div className="px-[1rem]">
      <SearchBar articleDataCount={data?.pages[0]?.data.totalElements} />
      <Masonry
        breakpointCols={breackpoindtColumns}
        className="my-masonry-grid flex gap-3"
        columnClassName="my-masonry-grid_column"
      >
        {data?.pages.map((i) => {
          return i.data.content.map((j: any) => (
            <Link key={j.id} to={`/article/detail/${j.id}`} className='cursor-pointer'>
              <div className="box mb-3">
                <img
                  className="rounded-2xl"
                  src={`${apiBaseUrl}/${j.imgFilePath}/${j.imgFileName}`}
                  alt={``}
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
