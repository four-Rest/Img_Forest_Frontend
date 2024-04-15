import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ArticleAPI from '../api/ArticleAPI';
import TempAuth from '../api/tempAuth';
import ArticleDetailContainer from '../components/article/ArticleDetailContainer';
import CommentContainer from '../components/comment/CommentContainer';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CommentContainer.tsx
 * @version 0.0.1 "2024-04-12 05:51:58"
 * @description 단일 이미지 글 + 댓글
 */

interface IArticleResDataType {
  content: string;
  id: number;
  imgFileName: string;
  imgFilePath: string;
  likeValue: false;
  likes: number;
  listCommentResponses: [
    {
      id: number;
      commentId: number;
      content: string;
      username: string;
      createDate: string;
      modifiedDate: string;
      childComments: [
        {
          id: number;
          commentId: number;
          content: string;
          username: string;
          createDate: string;
          modifiedDate: string;
        },
      ];
    },
  ];
  paid: false;
  price: null | number;
  tags: string[];
  username: string;
}

const ArticleDetail = () => {
  TempAuth();
  const { id } = useParams();
  const articleResData = ArticleAPI.readArticle(id);
  return (
    <Suspense fallback={<div> 로딩중 </div>}>
      {articleResData?.data && (
        <div className={'flex flex-col justify-start gap-8 px-4 pb-16'}>
          <ArticleDetailContainer data={articleResData?.data?.data} />
          <CommentContainer
            articleId={articleResData?.data?.data.id}
            username={articleResData?.data?.data.username}
            commentList={articleResData?.data?.data?.listCommentResponses}
          />
        </div>
      )}
    </Suspense>
  );
};

export default ArticleDetail;
