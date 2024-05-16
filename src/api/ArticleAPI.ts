/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ArticleAPI.tsx
 * @version 0.0.1 "2024-04-13 02:09:38"
 * @description 설명
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
const readArticle = () => {
  const { id } = useParams();
  const result = useQuery({
    staleTime: 1,
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

const createArticle = () => {
  const history = useNavigate();
  const mutationFn = async ({
    content,
    tagString,
    multipartFile,
    price,
    paid,
  }: {
    content: string;
    tagString: string;
    multipartFile: File | undefined;
    price: number;
    paid: boolean;
  }) => {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('tagString', tagString);
    formData.append('multipartFile', multipartFile as File);
    formData.append('price', price.toString());
    formData.append('paid', paid.toString());
    const response = await fetch(`${apiUrl}/api/article`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    return response.json();
  };

  return useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data) => {
      const id = data.data;
      history(`/article/detail/${id}`, { replace: true });
      return data;
    },
    // onSettled: (data, error, variables, context) => {},
  });
};

const updateArticle = () => {
  const { id } = useParams();
  const mutationFn = async ({
    content,
    tagString,
    multipartFile,
    price,
    paid,
  }: {
    content: string;
    tagString: string;
    multipartFile: File | undefined;
    price: number;
    paid: boolean;
  }) => {
    const formData = new FormData();
    formData.append('content', content);
    if (tagString.length > 0) {
      formData.append('tagString', tagString);
    }
    if (multipartFile != undefined) {
      formData.append('multipartFile', multipartFile as File);
    }
    formData.append('price', price.toString());
    formData.append('paid', paid.toString());
    const response = await fetch(`${apiUrl}/api/article/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });

    return response.json();
  };

  return useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    retry: 1,
    onSuccess: (data, variables, context) => {
      // history.back();
      return data;
    },
    // onSettled: (data, error, variables, context) => {},
    onError: () => {
      alert('요청에 실패했습니다.');
    },
  });
};

const ArticleAPI = {
  readArticle,
  createDeleteLikeArticle,
  createArticle,
  updateArticle,
};
export default ArticleAPI;
