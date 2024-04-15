/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ArticleAPI.tsx
 * @version 0.0.1 "2024-04-13 02:09:38"
 * @description 설명
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

type createMainCommentType = {
  content: string;
  articleId: number;
  username?: string;
};

const createMainComment = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: createMainCommentType) => {
    const response = await fetch(`${apiUrl}/api/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...reqData }),
    });
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['readArticle', id] });
    },
    // onSettled: (data, error, variables, context) => {},
  });
  return mutate;
};

type updateMainCommentType = {
  content: string;
  articleId: number;
  username?: string;
  commentId: number;
};

const updateMainComment = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: updateMainCommentType) => {
    const response = await fetch(`${apiUrl}/api/comment/${reqData.commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...reqData }),
    });
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['readArticle', id] });
    },
    // onSettled: (data, error, variables, context) => {},
  });
  return mutate;
};

type deleteMainCommentType = {
  commentId: number;
  articleId: number;
  username: string;
};

const deleteMainComment = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: deleteMainCommentType) => {
    const response = await fetch(`${apiUrl}/api/comment/${reqData.commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...reqData }),
    });
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['readArticle', id] });
    },
    // onSettled: (data, error, variables, context) => {},
  });
  return mutate;
};

type createSubCommentType = {
  content: string;
  commentId: number;
};

const createSubComment = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: createSubCommentType) => {
    const response = await fetch(
      `${apiUrl}/api/comment/${reqData.commentId}/reply`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          content: reqData.content,
        }),
      },
    );
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['readArticle', id] });
    },
    // onSettled: (data, error, variables, context) => {},
  });
  return mutate;
};

type updateSubCommentType = {
  content: string;
  username?: string;
  replyId: number; // 본인 식별자 댓글 ID
  commentId?: number; // 부모 댓글 ID
};

const updateSubComment = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: updateSubCommentType) => {
    const response = await fetch(
      `${apiUrl}/api/comment/${reqData.commentId}/reply/${reqData.replyId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          content: reqData.content,
          username: reqData.username,
          replyId: reqData.replyId,
        }),
      },
    );
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['readArticle', id] });
    },
    // onSettled: (data, error, variables, context) => {},
  });
  return mutate;
};

type deleteSubCommentType = {
  username?: string;
  replyId: number; // 본인 식별자 댓글 ID
  commentId?: number; // 부모 댓글 ID
};

const deleteSubComment = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: deleteSubCommentType) => {
    const response = await fetch(
      `${apiUrl}/api/comment/${reqData.commentId}/reply/${reqData.replyId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['readArticle', id] });
    },
    // onSettled: (data, error, variables, context) => {},
  });
  return mutate;
};

const CommentAPI = {
  createMainComment,
  updateMainComment,
  deleteMainComment,
  createSubComment,
  updateSubComment,
  deleteSubComment,
};
export default CommentAPI;
