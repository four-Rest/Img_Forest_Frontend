import {
  faComment,
  faHeart,
  faPaperPlane,
  faTag
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toastNotice } from "../toastr/ToastrConfig";
import "./DetailModal.css"; // DetailModal에 대한 스타일시트

function DetailModal({ showModal, setShowModal, articleId }: any) {
  const [detail, setDetail] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState<any>(""); // 대댓글 내용
  const [commentId, setCommentId] = useState(null); // 대댓글 작성할 댓글의 commentId 추가

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글 내용

  const [isReplyEditing, setIsReplyEditing] = useState(false); // 대댓글 수정 모드 상태
  const [editingReplyId, setEditingReplyId] = useState(null); // 현재 대댓글 수정 중인 댓글 ID
  const [replyEditingContent, setReplyEditingContent] = useState(""); // 수정 중인 대댓글 내용

  const [isReplyButtonClicked, setIsReplyButtonClicked] = useState(false); // 대댓글 버튼 클릭 여부 상태
  const [isReplyEditingButtonClicked, setIsReplyEditingButtonClicked] = useState(false); // 대댓글 수정 버튼 클릭 여부 상태

  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!articleId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
            `${apiUrl}/api/article/detail/${articleId}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        setDetail(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching article detail:", error);
      }
    };

    fetchData();
  }, [articleId, apiUrl]);

  // 추천
  const handleLike = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/article/like/${articleId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: articleId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setDetail((prevDetail: any) => ({
        ...prevDetail,
        likes: prevDetail.likes + 1, // 추천 수 증가
        likeValue: true, // 추천 상태로 변경
      }));
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  //추천 취소
  const handledisLike = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/article/like/${articleId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: articleId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setDetail((prevDetail: any) => ({
        ...prevDetail,
        likes: prevDetail.likes - 1, // 추천 수 감소
        likeValue: false, // 추천 취소 상태로 변경
      }));
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  //댓글 작성
  const handleCommentSubmit = async () => {
    try {
      const name = localStorage.getItem("username");
      const response = await fetch(`${apiUrl}/api/comment/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: articleId,
          username: name,
          content: comment,
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json(); // 새 댓글 데이터
        const newComment = {
          ...newCommentData.data,
          username: name, // 새 댓글 객체에 username 추가
          removedTime: null,
        };

        // 새 댓글을 목록에 추가
        setDetail((prevDetail: any) => ({
          ...prevDetail,
          listCommentResponses: [
            ...prevDetail.listCommentResponses,
            newComment,
          ],
        }));
        setComment(""); // 입력 필드 초기화
      } else {
        console.error("댓글 생성 실패");
        // 실패 시 사용자에게 알림
      }
    } catch (error) {
      console.error("에러 발생:", error);
      // 네트워크 오류 처리
    }
  };

  //댓글 삭제
  const handleDeleteComment = async (commentId: any) => {
    try {
      const response = await fetch(`${apiUrl}/api/comment/${commentId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: editingCommentId,
          articleId: articleId,
          username: localStorage.getItem("username"),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const deletedComment = await response.json();
      // 성공적으로 삭제된 후 UI에서 댓글 제거
      setDetail((prevDetail: any) => ({
        ...prevDetail,
        listCommentResponses: prevDetail.listCommentResponses.filter(
            (comment: any) => comment.id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (commentId: any, content: any) => {
    setIsEditing(true);
    setEditingCommentId(commentId);
    setEditingContent(content); // 현재 댓글 내용으로 초기화
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
          `${apiUrl}/api/comment/${editingCommentId}`,
          {
            method: "PUT", // 또는 "PATCH", 서버 API에 따라 다름
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              commentId: editingCommentId,
              articleId: articleId,
              username: localStorage.getItem("username"),
              content: editingContent, // 수정된 댓글 내용
            }),
          }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // 성공적으로 수정된 후 UI 업데이트
      const updatedComment = await response.json();
      setDetail((prevDetail: any) => ({
        ...prevDetail,
        listCommentResponses: prevDetail.listCommentResponses.map((comment: any) =>
            comment.id === editingCommentId
                ? { ...comment, content: updatedComment.data.content }
                : comment
        ),
      }));
      // 수정 모드 종료
      setIsEditing(false);
      setEditingCommentId(null);
      setEditingContent("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (!showModal) return null;

  if (!detail) {
    return <div>Loading...</div>;
  }

  const {
    content,
    username,
    paid,
    price,
    tags,
    imgFilePath,
    imgFileName,
    likes,
    likeValue,
    listCommentResponses,
  } = detail;

  const visibleCommentsCount = listCommentResponses.filter(
      (comment: any) => comment.removedTime === null
  ).length;

  //이미지 다운로드
  const downloadImage = (path: any, filename: any) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = filename;
    document.body.appendChild(link); // DOM에 링크 추가
    link.click(); // 링크 클릭
    document.body.removeChild(link); // DOM에서 링크 제거
  };

  const handleDownload = () => {
    const imagePath = `${apiUrl}/gen/${imgFilePath}/${imgFileName}`;
    downloadImage(imagePath, imgFileName);
  };

  //아티클 삭제
  const handleDeleteArticle = async() => {
    try {
      const response = await fetch(`${apiUrl}/api/article/${articleId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: articleId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setShowModal(false);
      navigate("/", { replace: true });
      toastNotice('삭제되었습니다.');

    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  const calculateTimeAgo = (createdDate: any) => {
    const date1: any = new Date(createdDate);
    const date2: any = new Date();
    const difference = (date2 - date1);

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor(difference / 1000);

    if (days >= 1) {
      return `${days}일`;
    } else if (hours >= 1) {
      return `${hours}시간`;
    } else if (minutes >= 1) {
      return `${minutes}분`;
    } else {
      return `${seconds}초`;
    }
  };

// 대댓글 작성
  const handleReplySubmit = async (commentId?: any) => {
    try {
      const name = localStorage.getItem("username");
      const response = await fetch(`${apiUrl}/api/comment/${commentId}/reply`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          content: reply,
        }),
      });

      if (response.ok) {
        const newReplyData = await response.json();
        const newReply = {
          ...newReplyData.data,
          username: name,
          removedTime: null,
        };

        // 새 대댓글을 목록에 추가
        setDetail((prevDetail: any) => {
          const updatedComments = prevDetail.listCommentResponses.map((comment: any) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                listReplies: comment.listReplies ? [...comment.listReplies, newReply] : [newReply],
              };
            }
            return comment;
          });
          return {
            ...prevDetail,
            listCommentResponses: updatedComments,
          };
        });
        setReply(""); // 대댓글 입력 상태 초기화
      } else {
        console.error("대댓글 생성 실패");
        // 실패 시 사용자에게 알림
      }
    } catch (error) {
      console.error("에러 발생:", error);
      // 네트워크 오류 처리
    }
  };

  //대댓글 삭제
  const handleDeleteReply = async (commentId: any, replyId: any) => {
    try {
      const response = await fetch(`${apiUrl}/api/comment/${commentId}/reply/${replyId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: commentId,
          replyId: replyId,
          username: localStorage.getItem("username"),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // 삭제된 대댓글을 UI에서 제거
      setDetail((prevDetail: any) => ({
        ...prevDetail,
        listCommentResponses: prevDetail.listCommentResponses.map((comment: any) =>
            comment.id === commentId
                ? {
                  ...comment,
                  listReplies: comment.listReplies.filter(
                      (reply: any) => reply.id !== replyId
                  ),
                }
                : comment
        ),
      }));
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const handleSaveEditReply = async () => {
    try {
      const editedReply = {
        commentId: editingCommentId,
        replyId: editingReplyId,
        content: replyEditingContent,
      };
      console.log(editedReply);
      const response = await fetch(
          `${apiUrl}/api/comment/${editingCommentId}/reply/${editingReplyId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedReply),
          }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // 성공적으로 수정된 후 UI 업데이트
      const updatedReply = await response.json();

      // 수정된 대댓글을 상태에 반영
      setDetail((prevDetail: any) => {
        const updatedComments = prevDetail.listCommentResponses.map((comment: any) => {
          if (comment.id === editingCommentId) {
            const updatedReplies = comment.listReplies.map((reply: any) => {
              if (reply.id === editingReplyId) {
                return { ...reply, content: updatedReply.data.content };
              }
              return reply;
            });
            return { ...comment, listReplies: updatedReplies };
          }
          return comment;
        });
        return { ...prevDetail, listCommentResponses: updatedComments };
      });
      setIsReplyEditing(false);
      setEditingReplyId(null);
      setReplyEditingContent("");
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  // 대댓글 버튼 클릭 시 호출되는 함수
  const handleReplyButtonClick = (commentId: any) => {
    setIsReplyButtonClicked(true); // 대댓글 버튼 클릭 상태로 변경
    setIsEditing(false); // 수정 모드 비활성화
    setIsReplyEditing(false); // 대댓글 작성 모드 비활성화
    setCommentId(commentId); // 대댓글 작성할 댓글의 commentId 설정
  };

  // 대댓글 작성 후 전송 버튼 클릭 시 호출되는 함수
  const handleReplySendClick = () => {
    handleReplySubmit(commentId); // 대댓글 작성 로직 호출
    setIsReplyButtonClicked(false); // 대댓글 버튼 클릭 상태 초기화
    setReply(""); // 대댓글 입력 상태 초기화
  };

  // 대댓글 수정 버튼 클릭 시 호출되는 함수
  const handleEditReplyButtonClick = (commentId: any, replyId: any) => {
    setIsReplyEditingButtonClicked(true); // 대댓글 수정 버튼 클릭 상태로 변경
    setIsReplyEditing(true);  // 대댓글 수정 모드 활성화
    setEditingCommentId(commentId); // 수정 중인 댓글 ID 설정
    setEditingReplyId(replyId); // 수정 중인 대댓글 ID 설정
    const editedReply = detail.listCommentResponses
        .flatMap((o: any, k: any) => {
          return o.childComments.find((comment: any) => comment.id === commentId);
        })
        .filter(Boolean);
    setReplyEditingContent(editedReply.content);
  };

  // 대댓글 수정 후 전송 버튼 클릭 시 호출되는 함수
  const handleEditReplySendClick = () => {
    handleSaveEditReply();
    setIsReplyEditing(false); // 대댓글 수정 모드 비활성화
    setIsReplyEditingButtonClicked(false); // 대댓글 버튼 클릭 상태 초기화
    setEditingReplyId(null); // 수정 중인 대댓글 ID 초기화
    setReply(""); // 대댓글 입력 상태 초기화
  };

  return (
      <div
          className="detailModalBackdrop"
          style={{ display: showModal ? "flex" : "none" }}
      >
        <div className="detailModalContent" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
          <label
              htmlFor="login-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowModal(false)}
          >
            ✕
          </label>
          <div className="detailModalLeft">
            <img src={`${apiUrl}/gen/${imgFilePath}/${imgFileName}`} alt="Article" />
          </div>
          <div className="detailModalRight">
            <div className="tags-container">
              <FontAwesomeIcon icon={faTag} />
              {tags.map((tag: string, index: number) => (
                  <span key={index} className="tag">
                {tag}
              </span> // 스타일 클래스 적용
              ))}
            </div>
            <h2 className="title mt-3">작성자 : {username}</h2>
            <h2 className="mb-3">{imgFilePath}</h2>
            <textarea className="disabledTextarea" disabled value={content} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <p className="info" style={{ margin: 0 }}>
                {paid ? "유료" : "무료"}
              </p>
              {paid && (
                  <p className="price" style={{ margin: "0 10px" }}>
                    {price}원
                  </p>
              )}
              <button onClick={handleDownload} className="downloadBtn">
                저장
              </button>
              {localStorage.getItem("username") === username && (
                  <div className="articleAction flex align-se">
                    <a href={`/article/modify/${articleId}`} className="btn btn-outline mr-2">수정</a>
                    <button className="btn btn-outline" onClick={() => {handleDeleteArticle()}}>삭제</button>
                  </div>
              )}
            </div>
            <div style={{ textAlign: "left" }}>
              <p className="likes">
                {likeValue ? (
                    <span
                        className="heart"
                        onClick={() => {
                          handledisLike();
                        }}
                    >
                  <FontAwesomeIcon icon={faHeart} />
                      {likes}
                </span>
                ) : (
                    <span
                        className="canHeart"
                        onClick={() => {
                          handleLike();
                        }}
                    >
                  <FontAwesomeIcon icon={faHeart} />
                      {likes}
                </span>
                )}
              </p>
            </div>
            <div className="comments">
              <FontAwesomeIcon icon={faComment} />
              댓글 {visibleCommentsCount}개
            </div>
            <div>
              <ul>
                {listCommentResponses
                    .filter((comment: any) => comment.removedTime === null)
                    .map((comment: any, index: any) => (
                        <>
                          <li key={index} className="commentItem">
                            <div className="commentContent">
                              <strong>{comment.username}</strong>: {comment.content}
                              <br />
                              <span className="commentTime">
            {calculateTimeAgo(comment.createdDate)}
          </span>
                            </div>
                            {localStorage.getItem("username") === comment.username && (
                                <div className="commentActions">
                                  <button onClick={() => handleDeleteComment(comment.id)}>
                                    삭제
                                  </button>
                                  <button onClick={() => handleEditComment(comment.id, comment.content)}>
                                    수정
                                  </button>
                                </div>
                            )}
                            <button className="replyButton" onClick={() => handleReplyButtonClick(comment.id)}>
                              대댓글
                            </button>
                          </li>
                          {
                            comment.childComments
                                ?
                                comment.childComments.map((o: any, k: any) => (
                                    <li key={k} className="replyItem">
                                      <div className="replyContent">
                                        <strong>{o.username}</strong>: {o.content}
                                        <br />
                                        <span className="replyTime">
                                    {calculateTimeAgo(o.createdDate)}
                                  </span>
                                      </div>
                                      {localStorage.getItem("username") === o.username && (
                                          <div className="replyActions">
                                            <button onClick={() => handleDeleteReply(o.id, reply.id)}>
                                              삭제
                                            </button>
                                            <button onClick={() => handleEditReplyButtonClick(o.id, reply.id)}>
                                              수정
                                            </button>
                                          </div>
                                      )}
                                    </li>
                                ))
                                :
                                <>
                                </>
                          }
                        </>
                    ))}
                {listCommentResponses
                    .filter((comment: any) => comment.removedTime === null)
                    .map((comment: any) => (
                        comment.listReplies && comment.listReplies.map((reply: any, replyIndex: any) => (
                            <li key={replyIndex} className="replyItem">
                              <div className="replyContent">
                                <strong>{reply.username}</strong>: {reply.content}
                                <br />
                                <span className="replyTime">
                                  {calculateTimeAgo(reply.createdDate)}
                                </span>
                              </div>
                              {localStorage.getItem("username") === reply.username && (
                                  <div className="replyActions">
                                    <button onClick={() => handleDeleteReply(comment.id, reply.id)}>
                                      삭제
                                    </button>
                                    <button onClick={() => handleEditReplyButtonClick(comment.id, reply.id)}>
                                      수정
                                    </button>
                                  </div>
                              )}
                            </li>
                        ))
                    ))}
              </ul>
            </div>
            <div
                className="comment-input-container"
                style={{
                  marginTop: "20px",
                  background: "#f0f0f0",
                  borderRadius: "5px",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
            >
              {/* 댓글 입력 필드 */}
              {!isReplyButtonClicked && !isReplyEditingButtonClicked && (
                  <input
                      type="text"
                      value={isEditing ? editingContent : comment}
                      onChange={(e) =>
                          isEditing
                              ? setEditingContent(e.target.value)
                              : setComment(e.target.value)
                      }
                      placeholder={isEditing ? "댓글 수정..." : "댓글을 입력하세요..."}
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#e9ecef",
                        marginRight: "10px", // 버튼과의 간격 조정
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // 엔터 키로 인한 폼 제출 동작을 방지
                          isEditing ? handleSaveEdit() : handleCommentSubmit();
                        }
                      }}
                  />
              )}
              {/* 대댓글 입력 필드 */}
              {isReplyButtonClicked && !isReplyEditing && (
                  <input
                      type="text"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="대댓글을 입력하세요..."
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#e9ecef",
                        marginRight: "10px", // 버튼과의 간격 조정
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // 엔터 키로 인한 폼 제출 동작을 방지
                          handleReplySubmit();
                        }
                      }}
                  />
              )}
              {/* 대댓글 수정 필드 */}
              {isReplyEditingButtonClicked && isReplyEditing && (
                  <input
                      type="text"
                      value={replyEditingContent}
                      onChange={(e) => setReplyEditingContent(e.target.value)}
                      placeholder="대댓글 수정..."
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#e9ecef",
                        marginRight: "10px", // 버튼과의 간격 조정
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // 엔터 키로 인한 폼 제출 동작을 방지
                          handleSaveEditReply();
                        }
                      }}
                  />
              )}

              {/* 댓글 작성 모드일 때 "전송" 버튼 표시 */}
              {!isEditing && !isReplyButtonClicked && !isReplyEditingButtonClicked && (
                  <button
                      onClick={handleCommentSubmit}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#007bff",
                        color: "white",
                        cursor: "pointer",
                      }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
              )}
              {/* 수정 모드일 때 "저장" 버튼 표시 */}
              {isEditing && (
                  <button
                      onClick={handleSaveEdit}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#007bff",
                        color: "white",
                        cursor: "pointer",
                      }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
              )}
              {/* 대댓글 작성 모드일 때 "전송" 버튼 표시 */}
              {isReplyButtonClicked && (
                  <button
                      onClick={handleReplySendClick}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#007bff",
                        color: "white",
                        cursor: "pointer",
                      }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
              )}
              {/* 대댓글 수정 모드일 때 "전송" 버튼 표시 */}
              {isReplyEditingButtonClicked && isReplyEditing && (
                  <button
                      onClick={handleEditReplySendClick}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#007bff",
                        color: "white",
                        cursor: "pointer",
                      }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}


//push 전

export default DetailModal;