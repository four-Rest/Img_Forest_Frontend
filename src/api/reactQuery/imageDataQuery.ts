import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

const getArticleData = async (pageParam = 1, keyword?: string | null) => {
  const tagName = !keyword ? 'null' : keyword; // keyword가 null, undefined 또는 빈 문자열일 경우 'null'로 설정
  const response = await fetch(
    `${apiUrl}/api/article/page?pageNo=${pageParam - 1}&tagName=${tagName}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  // content가 없거나 null일 경우 빈 배열로 반환
  return {
    ...data,
    content: data.content || [], // content가 null인 경우 빈 배열로 대체
  };
};

export const articleListData = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get('tagName');

  return useInfiniteQuery({
    queryKey: ['articleListData', keyword],
    queryFn: ({ pageParam }) => getArticleData(pageParam, keyword),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.content) {
        const nextPage = lastPage.content.length < 10 ? undefined : lastPage.page + 1;
        return nextPage; // 다음 페이지 번호 반환
      }
      return undefined; // lastPage가 null이거나 content가 없을 경우
    },
    initialPageParam: 1,
    select: (data) => {
      return data;
    },
  });
};
