import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
type ArticleData = {
  id: string;
  imgFileName: string;

  imgFilePath: string;
  likes: number;
  paid: boolean;
};

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
export function useImageData() {
  const [articleData, setArticleData] = useState<ArticleData[]>([]);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['imageData'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/api/article`); // API에서 이미지 데이터를 가져옴
      const data = await res.json(); // 응답 데이터를 JSON 형식으로 변환
      setArticleData(data.data.content);
      // 데이터를 반환할 필요가 있는지 여부에 따라 적절하게 수정

      return data;
    },
  });

  return { isPending, error, data, articleData, refetch };
}
