import MypageLayout from "./MypageLayout";

        // {
        //     "paid": false,
        //     "imgFilePath": "2024/04/21",
        //     "imgFileName": "f1ecf767-d858-4376-82bd-056434abf949_Google__G__logo.svg.png",
        //     "id": 48,
        //     "likes": 2
        // },

const MyLikeList = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <MypageLayout />
      <div className="flex h-full w-full justify-center">
        <div className="flex w-full max-w-[20rem] flex-col items-center gap-[1rem] bg-red-100">
          API 부재중...
        </div>
      </div>
    </div>
  );
};
export default MyLikeList