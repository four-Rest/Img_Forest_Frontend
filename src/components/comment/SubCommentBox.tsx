import React, { useReducer, useRef } from 'react';
import CommentAPI from '../../api/CommentAPI';
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
};
const SubCommentBox = (props: SubCommentBoxType) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isModifyStatus, isModifyStatusToggle] = useReducer((state) => {
    if (state) textRef.current!.value = props.content;
    return !state;
  }, false);

  const updateCommentMutation = CommentAPI.updateSubComment();
  const deleteCommentMutation = CommentAPI.deleteSubComment();
  const updateCommentHandler = () => {
    updateCommentMutation({
      username: props.username!,
      content: textRef.current!.value,
      replyId: props.id,
      commentId: props.parentCommentId,
    });
  };
  const deleteCommentHandler = () => {
    deleteCommentMutation({
      username: props.username!,
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
        <div> {props.username} </div>
        <span className={'text-sm text-gray-400'}>
          {timeFunction.timeFromToday(new Date(props.createdDate))}
        </span>
      </div>
      <Textarea
        ref={textRef}
        defaultValue={props.content}
        disabled={!isModifyStatus}
      />
      <div className={'flex justify-end gap-2'}>
        {true && (
          <React.Fragment>
            {isModifyStatus && (
              <button onClick={updateCommentHandler}>제출</button>
            )}
            <button onClick={isModifyStatusToggle}>
              {isModifyStatus ? '수정취소' : '수정'}
            </button>
          </React.Fragment>
        )}
        {true && (
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
