import React, { useReducer, useRef } from 'react';
import CommentAPI from '../../api/CommentAPI';
import { useLoginState } from '../../store/auth/loginState';
import { timeFunction } from '../../utils/function/timeFunction';
import Textarea from '../common/textarea/Textarea';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file SubCommentBox.tsx
 * @version 0.0.1 "2024-04-14 11:05:20"
 * @description 설명
 */
type SubCommentBoxType = {
  id: number;
  commentId: number;
  content: string;
  username: string;
  createdDate: string;
  modifiedDate: string;
  parentCommentId: number;
  writer: string;
};
const SubCommentBox = (props: SubCommentBoxType) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isModifyStatus, isModifyStatusToggle] = useReducer((state) => {
    if (state) (textRef.current as any).value = props.content;
    return !state;
  }, false);
  const { username } = useLoginState();
  const updateCommentMutation = CommentAPI.updateSubComment();
  const deleteCommentMutation = CommentAPI.deleteSubComment();
  const updateCommentHandler = () => {
    updateCommentMutation.mutate({
      username: username as string,
      content: (textRef.current as any).value,
      replyId: props.id,
      commentId: props.parentCommentId,
    });
  };
  const deleteCommentHandler = () => {
    deleteCommentMutation.mutate({
      username: username as string,
      replyId: props.id,
      commentId: props.parentCommentId,
    });
  };
  return (
    <div
      key={props.id}
      id={'sub-comment'}
      className={'ml-4 flex flex-col gap-2 rounded-lg bg-orange-100 p-2'}
    >
      <div className={'flex items-center gap-4'}>
        {
          props.username == props.writer ?
          <div className={"font-bold bg-red-400 text-white rounded-lg px-[0.25rem]"}> 작성자 </div>  
          :
          <div> {props.username} </div>}
        <span className={'text-sm text-gray-400'}>
          {timeFunction.timeFromToday(new Date(props.createdDate))}
        </span>
      </div>
      <Textarea
        className={"bg-white p-[0.5rem] "}
        ref={textRef}
        defaultValue={props.content}
        disabled={!isModifyStatus}
      />
      <div className={'flex justify-end gap-2'}>
        {username == props.username && (
          <React.Fragment>
            {isModifyStatus && (
              <button onClick={updateCommentHandler}>제출</button>
            )}
            <button onClick={isModifyStatusToggle}>
              {isModifyStatus ? '수정취소' : '수정'}
            </button>
          </React.Fragment>
        )}
        {username == props.username && (
          <button
            className={'text-red-400 hover:font-bold'}
            onClick={deleteCommentHandler}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};
export default SubCommentBox;
