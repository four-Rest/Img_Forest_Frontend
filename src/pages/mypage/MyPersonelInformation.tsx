import MypageLayout from "./MypageLayout";

const MyPersonelInformation = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <MypageLayout />
      <div className="flex h-full w-full justify-center">
        <div className="flex w-full max-w-[20rem] flex-col items-center gap-[1rem]">
          <h3>개인정보수정 </h3>
          <div className="flex w-full flex-col gap-[0.25rem]">
            <span> ID </span>
            <input
              type={'text'}
              placeholder={'ID를 입력해주세요'}
              className={'bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner rounded-md'}
            />
          </div>
          <div className="flex w-full flex-col gap-[0.25rem]">
            <span> 비밀번호 </span>
            <input
              type={'password'}
              placeholder={'비밀번호를 입력해주세요'}
              className={'bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner rounded-md'}
            />
          </div>
          <div className="flex w-full flex-col gap-[0.25rem]">
            <span> 비밀번호 확인 </span>
            <input
              type={'password'}
              placeholder={'비밀번호를 입력해주세요'}
              className={'bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner rounded-md'}
            />
          </div>
          <div className="flex w-full flex-col gap-[0.25rem]">
            <span> 이메일 </span>
            <input
              type={'email'}
              placeholder={'이메일을 입력해주세요'}
              className={'bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner rounded-md'}
            />
          </div>
          <div className="flex w-full flex-col gap-[0.25rem]">
            <span> 닉네임 </span>
            <input
              type={'text'}
              placeholder={'닉네임을 입력해주세요'}
              className={'bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner rounded-md'}
            />
          </div>
          <button
            onClick={() => ''}
            className="h-[3rem] w-full rounded-md bg-gray-100 outline outline-offset-[-1px] outline-[1px] outline-[#aaa]"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyPersonelInformation