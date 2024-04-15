import React from 'react';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useShowLoginModal } from '../../store/display/displayState';
import { useLogin } from '../../api/reactQuery/loginQuery';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
const schema = z.object({
  username: z.string(),
  password: z.string(),
});
type LoginUserData = z.infer<typeof schema>;
const LoginModal = () => {
  const login = useLogin();
  const { register, handleSubmit } = useForm<LoginUserData>();
  const onSubmit: SubmitHandler<LoginUserData> = (data) => login.mutate(data);
  const { showLoginModal, setShowLoginModal } = useShowLoginModal();
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  // if (!showModal) return null;
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;
    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };
  return (
    <>
      <button className="btn" onClick={() => setShowLoginModal(true)}>
        로그인
      </button>

      {showLoginModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowLoginModal(false)}
              >
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">로그인</h3>
              <div className="form-control w-full mb-4 flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">ID</span>
                </label>
                <input
                  type="text"
                  placeholder="ID를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('username', { required: true })}
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
                  {...register('password', { required: true })}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                >
                  로그인
                </button>
              </div>
              <div className="modal-action flex justify-center w-full">
                <button
                  type="button"
                  className="btn btn-warning w-full max-w-xs"
                  onClick={handleKakaoLogin}
                >
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

export default LoginModal;
