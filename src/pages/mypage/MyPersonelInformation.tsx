import { Suspense } from "react";
import { useForm } from "react-hook-form";
import PersonnelAPI from "../../api/PersonnelAPI";
import MypageLayout from "./MypageLayout";

const MyPersonelInformation = () => {

  // const personelInformationResData = PersonnelAPI.readPersonelInformation(); 
  const { data } = PersonnelAPI.readPersonelInformation(); 
  const updatePersonnelMutation = PersonnelAPI.updatePersonelInformation();

  const { handleSubmit,register } = useForm();

  const updatePersonnelHandler = (data: {
    nickname?: string;
    password1?: string;
    password2?: string;
  }) => {
    updatePersonnelMutation.mutate({
      ...data,
    });
  };



  return (
    <Suspense fallback={<div> 데이터 받아오는 중... </div>}>
      <form
        className="flex h-full w-full flex-col"
        onSubmit={handleSubmit(updatePersonnelHandler)}
      >
        <MypageLayout />
        <div className="flex h-full w-full justify-center px-[1rem]">
          <div className="flex w-full max-w-[20rem] flex-col items-center gap-[1rem]">
            <p className="text-[1.4rem] font-[800]">개인정보수정 </p>
            <div className="flex w-full flex-col gap-[0.25rem]">
              <span> ID </span>
              <input
                type={'text'}
                defaultValue={data?.data?.username}
                placeholder={'ID를 입력해주세요'}
                className={
                  'rounded-md bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner'
                }
              />
            </div>
            <div className="flex w-full flex-col gap-[0.25rem]">
              <span> 비밀번호 </span>
              <input
                type={'password'}
                {...register('passsword1')}
                placeholder={'비밀번호를 입력해주세요'}
                className={
                  'rounded-md bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner'
                }
              />
            </div>
            <div className="flex w-full flex-col gap-[0.25rem]">
              <span> 비밀번호 확인 </span>
              <input
                type={'password'}
                {...register('passsword2')}
                placeholder={'비밀번호를 입력해주세요'}
                className={
                  'rounded-md bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner'
                }
              />
            </div>
            <div className="flex w-full flex-col gap-[0.25rem]">
              <span> 이메일 </span>
              <input
                defaultValue={data?.data?.email}
                type={'email'}
                placeholder={'이메일을 입력해주세요'}
                className={
                  'rounded-md bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner'
                }
              />
            </div>
            <div className="flex w-full flex-col gap-[0.25rem]">
              <span> 닉네임 </span>
              <input
                defaultValue={data?.data?.nickname}
                type={'text'}
                {...register('nickname')}
                placeholder={'닉네임을 입력해주세요'}
                className={
                  'rounded-md bg-[#f3f3f3] px-[0.5rem] py-[0.8rem] shadow-inner'
                }
              />
            </div>
            <button className="h-[3rem] w-full rounded-md bg-gray-100 outline outline-[1px] outline-offset-[-1px] outline-[#aaa]">
              수정
            </button>
          </div>
        </div>
      </form>
    </Suspense>
  );
};
export default MyPersonelInformation