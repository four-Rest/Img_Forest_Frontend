import { useRef } from 'react';
import CommentAPI from '../../api/CommentAPI';
import { useLoginState } from '../../store/auth/loginState';
import Textarea from '../common/textarea/Textarea';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateMainCommentBox.tsx
 * @version 0.0.1 "2024-04-14 13:23:15"
 * @description 댓글 작성 컴포넌트
 */
type ICommentType = {
  username?: string;
  articleId: number;
};

const CreateMainCommentBox = (props: ICommentType) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const createCommentMutation = CommentAPI.createMainComment();
  const { username } = useLoginState();
  const createCommentHandler = () => {
    createCommentMutation.mutate({
      articleId: props.articleId!,
      username: username,
      content: textRef.current!.value,
    });
  };

  return (
    <div
      id={'create-comment'}
      className={
        'flex flex-col justify-between gap-2 rounded-lg bg-orange-300 p-2'
      }
    >
      <Textarea placeholder={'댓글 작성'} ref={textRef} />
      <div className={'flex justify-end gap-2'}>
        <div className={'flex justify-end gap-2'}>
          <button onClick={createCommentHandler}> 제출 </button>
        </div>
      </div>
    </div>
  );
};
export default CreateMainCommentBox;
