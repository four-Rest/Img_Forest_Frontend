/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ArticleAPI.tsx
 * @version 0.0.1 "2024-04-13 02:09:38"
 * @description 설명
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import TempAuth from './tempAuth';
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
const readArticle = () => {
  TempAuth();
  const { id } = useParams();
  const result = useQuery({
    queryKey: ['readArticle', id],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/api/article/detail/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    },
  });
  return result;
};

const createDeleteLikeArticle = ({
  onErrorHandler,
}: {
  onErrorHandler: () => void;
}) => {
  const { id } = useParams();
  const mutationFn = async (methods: 'create' | 'delete') => {
    const response = await fetch(`${apiUrl}/api/article/like/${id}`, {
      method: methods == 'create' ? 'POST' : 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

  return useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    onError: (error, variables, context) => {
      onErrorHandler();
    },
    // onSuccess: (data, variables, context) => {},
    // onSettled: (data, error, variables, context) => {},
  });
};

const ArticleAPI = {
  readArticle,
  createDeleteLikeArticle,
};
export default ArticleAPI;
