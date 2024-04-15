import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer, useRef } from 'react';
import CommentAPI from '../../api/CommentAPI';
import { useLoginState } from '../../store/auth/loginState';
import { timeFunction } from '../../utils/function/timeFunction';
import Textarea from '../common/textarea/Textarea';
import CreateSubCommentBox from './CreateSubCommentBox';
import SubCommentBox from './SubCommentBox';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MainCommentBox.tsx
 * @version 0.0.1 "2024-04-14 11:05:20"
 * @description 설명
 */
type MainCommentBoxType = {
  id: number; // comment id
  commentId: null; // null
  content: string;
  username: string;
  createdDate: string;
  modifiedDate: string;
  childComments: [childCommentsType];
  articleId: number;
};

type childCommentsType = {
  id: number;
  commentId: number;
  content: string;
  username: string;
  createdDate: string;
  modifiedDate: string;
};

const MainCommentBox = (props: MainCommentBoxType) => {
  const { username } = useLoginState();
  const [isShowSubCommentList, IsShowSubCommentListToggle] = useReducer(
    (state) => !state,
    false,
  );
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isModifyStatus, isModifyStatusToggle] = useReducer((state) => {
    if (state) textRef.current!.value = props.content;
    return !state;
  }, false);

  const updateCommentMutation = CommentAPI.updateMainComment();
  const deleteCommentMutation = CommentAPI.deleteMainComment();
  const updateCommentHandler = () => {
    updateCommentMutation.mutate({
      articleId: props.articleId!,
      username: username,
      content: textRef.current!.value,
      commentId: props.id,
    });
  };
  const deleteCommentHandler = () => {
    deleteCommentMutation.mutate({
      articleId: props.articleId!,
      username: username,
      commentId: props.id,
    });
  };

  // TODO : username 로그인 사용자와 비교해서 닉네임 일치할 경우 변경해주기, 또한 수정,삭제도 불가능하게 변경하기
  return (
    <div
      id={'main-comment'}
      className={
        'flex flex-col gap-2 rounded-md p-2  outline outline-4 outline-offset-[-1px]'
      }
    >
      <div className={'flex flex-col gap-2 rounded-lg bg-orange-200 p-2'}>
        <div className={'flex items-center gap-4'}>
          {/* 인증관련 수정 필요 */}
          <div className={'font-bold'}>{props.username}</div>
          <span className={'text-sm text-gray-400'}>
            {timeFunction.timeFromToday(new Date(props.createdDate))}
          </span>
        </div>
        <Textarea
          ref={textRef}
          defaultValue={props.content}
          disabled={!isModifyStatus}
        />
        <div className={'flex justify-end gap-2 '}>
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
          <button
            className={'flex gap-2 align-middle'}
            onClick={IsShowSubCommentListToggle}
          >
            <div> 댓글 {props.childComments.length} </div>
            <div>
              {isShowSubCommentList ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              )}
            </div>
          </button>
        </div>
      </div>
      {isShowSubCommentList && (
        <div className={'flex flex-col gap-4'}>
          {props.childComments.map((j: childCommentsType) => (
            <SubCommentBox key={j.id} {...j} parentCommentId={props.id} />
          ))}
          <CreateSubCommentBox commentId={props.id} />
        </div>
      )}
    </div>
  );
};
export default MainCommentBox;
