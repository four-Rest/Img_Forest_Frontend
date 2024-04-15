/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ArticleDetailContainer.tsx
 * @version 0.0.1 "2024-04-12 05:51:58"
 * @description 단일 이미지 글 조회
 */

interface IArticleDetailType {
  content: string;
  id: number;
  imgFileName: string;
  imgFilePath: string;
  likeValue: false;
  likes: number;
  paid: false;
  price: null | number;
  tags: string[];
  username: string;
}

const ArticleDetailContainer = (props: IArticleDetailType | any) => {
  const imgUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;

  const {
    content,
    imgFileName,
    imgFilePath,
    likeValue,
    username,
    likes,
    paid,
    price,
    tags,
  } = props.data;

  const downloadImage = (path: any, filename: any) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    document.body.appendChild(link); // DOM에 링크 추가
    link.click(); // 링크 클릭
    document.body.removeChild(link); // DOM에서 링크 제거
  };

  const handleDownload = () => {
    const imagePath = `${imgUrl}/${imgFilePath}/${imgFileName}`;
    downloadImage(imagePath, imgFileName);
  };

  return (
    <div
      className={
        'flex h-min flex-col gap-8 align-middle lg:grid lg:grid-cols-2'
      }
    >
      {/* 이미지 */}
      <div className={'max-w-120 relative flex justify-center'}>
        <img src={`${imgUrl}/${imgFilePath}/${imgFileName}`} alt="dd" />
        <button
          className={
            'absolute right-1 top-1 rounded-xl bg-white p-2 outline-2 outline-red-200'
          }
        >
          {' '}
          {likeValue ? '❤️' : '🖤'} {likes}{' '}
        </button>
      </div>
      {/* 이미지 설명 */}
      <div className={'flex flex-col justify-between gap-4'}>
        <div className={'flex flex-col gap-4'}>
          <ul className={'flex gap-2'}>
            {tags &&
              (tags as string[]).map((tag: string, index: number) => (
                <li key={index} className={'rounded-xl bg-gray-200 p-2'}>
                  {tag}
                </li>
              ))}
          </ul>
          <div className={'flex justify-between'}>
            <p className={'font-bold'}> 설명 </p>
            <span> {content} </span>
          </div>
          <div className={'flex justify-between'}>
            <p className={'font-bold'}> 판매자 </p>
            <span> {username} </span>
          </div>
          <div className={'flex justify-between'}>
            <p className={'font-bold'}> 가격 </p>
            <span> {price} </span>
          </div>
        </div>
        {paid ? (
          <button
            className={'h-12 w-full rounded-2xl bg-orange-400 text-white'}
            onClick={handleDownload}
          >
            {' '}
            {price} 원 / 유료{' '}
          </button>
        ) : (
          <button
            className={'h-12 w-full rounded-2xl bg-green-700 text-white'}
            onClick={handleDownload}
          >
            {' '}
            다운로드{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailContainer;
