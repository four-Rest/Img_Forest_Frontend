/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file ArticleAPI.tsx
 * @version 0.0.1 "2024-04-13 02:09:38"
 * @description 설명 
 */

import { useQuery } from "@tanstack/react-query";


const readArticle = (id: string| undefined) => {
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  const result = useQuery({
    queryKey: ['readArticle', id],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/api/article/detail/${id}`);
      const data = await response.json();
      return data;
    },
  })
  return result;
}


const ArticleAPI = {
  readArticle,
};
export default ArticleAPI
