/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CommentContainer.tsx
 * @version 0.0.1 "2024-04-12 05:51:58"
 * @description 단일 이미지 글 댓글
 */

import { useLoginState } from '../../store/auth/loginState';
import CreateCommentBox from './CreateMainCommentBox';
import MainCommentBox from './MainCommentBox';

type childCommentsType = {
  id: number;
  commentId: number;
  content: string;
  username: string;
  createdDate: string;
  modifiedDate: string;
};

type commentListType = {
  id: number; // comment id
  commentId: null;
  content: string;
  username: string;
  createdDate: string;
  modifiedDate: string;
  childComments: [childCommentsType];
};

type ICommentType = {
  username: string;
  articleId: number;
  commentList: [commentListType];
};

const CommentContainer = (props: ICommentType) => {
  const { loginState } = useLoginState();
  return (
    <div className={'flex flex-col gap-4 '}>
      {loginState && <CreateCommentBox {...props} />}
      <div className={"py-[1rem] bg-gray-100"}>
      <div> 댓글 갯수 : {props.commentList.length} </div>
      {props.commentList?.map((i: commentListType) => (
        <div
        key={i.id}
        id={'comment-main-container'}
        className={'flex flex-col gap-2'}
        >
          <MainCommentBox {...i} articleId={props.articleId} />
        </div>
      ))}
      </div>
    </div>
  );
};
export default CommentContainer;
