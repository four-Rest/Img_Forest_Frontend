import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSignUp } from '../../api/reactQuery/signUpQuery';
import { useShowSingUpModal } from '../../store/display/displayState';
import { toastWarning } from '../../components/toastr/ToastrConfig';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
const schema = z.object({
  username: z.string(),
  password1: z.string(),
  password2: z.string(),
  email: z.string().email(),
  nickname: z.string(),
});
type SignUpUserData = z.infer<typeof schema>;
const SignupModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUserData>();
  const onSubmit: SubmitHandler<SignUpUserData> = (data) => {
    console.log(data);
    if (!blankCheck(data)) {
      toastWarning('필수 정보를 모두 입력해주세요.');
      return;
    }
    if (data.password1 !== data.password2) {
      return toastWarning('비밀번호가 일치하지 않습니다.');
    } else {
      signUp.mutate(data);
    }
  };
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const { showSignUpModal, setShowSignupModal } = useShowSingUpModal();

  const signUp = useSignUp();
  function blankCheck(data: SignUpUserData) {
    return (
      data.username &&
      data.password1 &&
      data.password2 &&
      data.email &&
      data.nickname
    );
  }

  if (!showSignUpModal) return null;

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${apiUrl}/oauth2/authorization/kakao`;

    // 사용자를 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginUrl;
  };

  return (
    <>
      <button className="btn" onClick={() => setShowSignupModal(true)}>
        회원가입
      </button>

      {showSignUpModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="login-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowSignupModal(false)}
              >
                ✕
              </label>
              <h3 className="font-bold text-3xl text-center mb-4">회원가입</h3>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">ID</span>
                </label>
                <input
                  type="text"
                  placeholder="ID를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('username', {})}
                />
              </div>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('password1')}
                />
              </div>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">비밀번호 확인</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('password2')}
                />
              </div>
              <div className="form-control w-full  flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">이메일</span>
                </label>
                <input
                  type="email"
                  placeholder="이메일를 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('email')}
                />
              </div>
              <div className="form-control w-full flex flex-col items-center">
                <label className="label w-full max-w-md">
                  <span className="label-text">닉네임</span>
                </label>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  className="input input-bordered w-full max-w-md"
                  {...register('nickname')}
                />
              </div>

              <div className="modal-action flex justify-center w-full">
                <button
                  type="submit"
                  className="btn btn-outline w-full max-w-xs"
                >
                  회원가입
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

export default SignupModal;
