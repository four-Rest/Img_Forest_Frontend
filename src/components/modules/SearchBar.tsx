import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
const SearchBar = ({ articleDataCount }: { articleDataCount?: number }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get('search');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{ tagName: string }>();
  const onSubmit = (data: { tagName: string }) => {
    navigate(`/?search=${data.tagName}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-12 ">
      <div className="flex justify-center">
        <div className="relative flex w-full max-w-md flex-col items-center ">
          <input
            type="text"
            placeholder="이미지 검색"
            className="input w-full border-lime-200 focus:border-lime-200 focus:outline-lime-200"
            {...register('tagName')}
          />
          <label className="absolute right-0 flex h-12 w-10 justify-center rounded-r-lg bg-lime-200">
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </label>
          <div> 검색결과 : {keyword || getValues('tagName')} , 총 결과 수 : {articleDataCount} </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
