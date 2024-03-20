import React, { useState } from "react";
import { toastNotice, toastWarning } from "../ToastrConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./SignupModal.css";

const SignupModal = ({ showModal, setShowModal }) => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  /* 24.03.13 메모. 인증코드 변수명, 길이 지정 필요 */
  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState("");
  const [isSend, setIsSend] = useState(false);

  const signupData = {
    username,
    password1,
    password2,
    email,
    nickname,
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordCheck()) {
      toastWarning("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!blankCheck()) {
      toastWarning("필수 정보를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/member/signup`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        setShowModal(false); // 회원가입 성공 후 모달 닫기
        toastNotice("회원가입 완료.");
      } else {
        // 서버 에러 처리
        const errorData = await response.json();
        toastWarning("중복된 이름입니다.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  function passwordCheck() {
    return password1 === password2;
  }

  function blankCheck() {
    return (
      username.trim() &&
      password1.trim() &&
      password2.trim() &&
      email.trim() &&
      nickname.trim()
    );
  }

  function onSendCode() {
    /* random string을 생성*/
    setValidCode("123&abc");
    /* code를 보내는 로직 */
    /* 24.03.14 메모. crypto 사용? */

    alert("이메일로 인증코드가 전송되었습니다.");
    setIsSend(true);
  }

  function onEmailCheck() {
    // console.log(code);

    /* 입력한 code와 전송한 code가 일치하는지 확인 */
    if (code == validCode) toastNotice("일치합니다.");
    else toastWarning("틀렸습니다.");
    /* 일치하면 bool 변수로 회원가입 가능한 상태로 */
  }

  if (!showModal) return null;

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };

  return (
    <>
      <button className="btn" onClick={() => setShowModal(true)}>
        회원가입
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowModal(false)}>
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">회원가입</h3>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">ID</span>
                </label>
                <input
                  type="text"
                  placeholder="ID를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호 확인</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">이메일</span>
                </label>
                <div className="verify-email">
                  <input
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    className="input input-bordered w-full max-w-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="button" onClick={onSendCode} className="btn">
                    인증코드 발송
                  </button>
                </div>
                <p></p>
                {isSend ? (
                  <div className="verify-email">
                    <input
                      type="text"
                      placeholder="인증코드 입력"
                      className="input input-bordered w-full "
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={onEmailCheck}>
                      인증하기
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">닉네임</span>
                </label>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                  onClick={handleSignup}>
                  회원가입
                </button>
              </div>
              <div className="modal-action flex justify-center w-full">
                <button
                  type="button"
                  className="btn btn-warning w-full max-w-xs"
                  onClick={handleKakaoLogin}>
                  <FontAwesomeIcon icon={faComment} />
                  카카오 로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupModal;
