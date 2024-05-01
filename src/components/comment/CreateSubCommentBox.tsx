import { useRef } from 'react';
import CommentAPI from '../../api/CommentAPI';
import Textarea from '../common/textarea/Textarea';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateSubCommentBox.tsx
 * @version 0.0.1 "2024-04-14 13:23:15"
 * @description 댓글 작성 컴포넌트
 */
type ICommentType = {
  username?: string;
  articleId?: number;
  commentId?: number;
};

const CreateSubCommentBox = (props: ICommentType) => {
  const createCommentMutation = CommentAPI.createSubComment();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const createCommentHandler = () => {
    createCommentMutation.mutate({
      commentId: props.commentId as number,
      content: (textRef.current as any).value,
    });
  };

  return (
    <div
      id={'create-comment'}
      className={'flex flex-col gap-2 rounded-lg bg-orange-300 p-2'}
    >
      <div> {props.username} </div>
      <Textarea placeholder={'댓글 작성'} ref={textRef} />
      <div className={'flex justify-end gap-2'}>
        <div className={'flex justify-end gap-2'}>
          <button onClick={createCommentHandler}> 제출 </button>
        </div>
      </div>
    </div>
  );
};
export default CreateSubCommentBox;
