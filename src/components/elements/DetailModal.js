import React, { useEffect, useState } from "react";
import "../../styles/DetailModal.css"; // DetailModal에 대한 스타일시트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDown,
  faHeart,
  faHeartCrack,
  faComment,
  faTag,
  faPaperPlane,
  comments,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toastNotice } from "../ToastrConfig";

function DetailModal({ showModal, setShowModal, articleId }) {
  const [detail, setDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글 내용
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
      setDetail((prevDetail) => ({
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
      setDetail((prevDetail) => ({
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
        setDetail((prevDetail) => ({
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
  const handleDeleteComment = async (commentId) => {
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
      setDetail((prevDetail) => ({
        ...prevDetail,
        listCommentResponses: prevDetail.listCommentResponses.filter(
          (comment) => comment.id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (commentId, content) => {
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
      setDetail((prevDetail) => ({
        ...prevDetail,
        listCommentResponses: prevDetail.listCommentResponses.map((comment) =>
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
    (comment) => comment.removedTime === null
  ).length;
  //이미지 다운로드
  const downloadImage = (path, filename) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = filename;
    document.body.appendChild(link); // DOM에 링크 추가
    link.click(); // 링크 클릭
    document.body.removeChild(link); // DOM에서 링크 제거
  };

  const handleDownload = () => {
    const imagePath = `/imgFiles/${imgFilePath}/${imgFileName}`;
    downloadImage(imagePath, imgFileName);
  };

  //아티클 삭제
  const handleDeleteArticle = async () => {
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
      toastNotice("삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  const calculateTimeAgo = (createdDate) => {
    const date1 = new Date(createdDate);
    const date2 = new Date();
    const difference = date2 - date1;

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

  return (
    <div
      className="detailModalBackdrop"
      style={{ display: showModal ? "flex" : "none" }}>
      <div className="detailModalContent">
        <label
          htmlFor="login-modal"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => setShowModal(false)}>
          ✕
        </label>
        <div className="detailModalLeft">
          <img src={`/imgFiles/${imgFilePath}/${imgFileName}`} alt="Article" />
        </div>
        <div className="detailModalRight">
          <div className="tags-container">
            <FontAwesomeIcon icon={faTag} />
            {tags.map((tag, index) => (
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
                <a
                  href={`/article/modify/${articleId}`}
                  className="btn btn-outline mr-2">
                  수정
                </a>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    handleDeleteArticle();
                  }}>
                  삭제
                </button>
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
                  }}>
                  <FontAwesomeIcon icon={faHeart} />
                  {likes}
                </span>
              ) : (
                <span
                  className="canHeart"
                  onClick={() => {
                    handleLike();
                  }}>
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
                .filter((comment) => comment.removedTime === null)
                .map((comment, index) => (
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
                        <button
                          onClick={() =>
                            handleEditComment(comment.id, comment.content)
                          }>
                          수정
                        </button>
                      </div>
                    )}
                  </li>
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
            }}>
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
                }}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            )}
            {/* 댓글 작성 모드일 때 "전송" 버튼 표시 */}
            {!isEditing && comment && (
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
                }}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
