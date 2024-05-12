import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

const getArticleData = async (pageParam = 1, keyword?: string | null) => {
  const tagName =
    keyword == '' || keyword == undefined || keyword == null ? 'null' : keyword;
  const response = await fetch(
    `${apiUrl}/api/article/page?pageNo=${pageParam - 1}&tagName=${tagName}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const articleListData = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get('search');
  return useInfiniteQuery({
    queryKey: ['articleListData', keyword],
    queryFn: ({ pageParam }) => getArticleData(pageParam, keyword),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage?.data.content?.length < 10 ? undefined : nextPage;
    },
    initialPageParam: 1,
    select: (data) => {
      return data;
    },
  });
};
  
