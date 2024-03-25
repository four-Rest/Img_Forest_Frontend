// **same
import React, { useState, useEffect, useContext, useRef } from "react";
import "../../styles/styles.css";
// import { IdDetailContext } from "../../api/IdDetailContext";
// import DetailModal from "../elements/DetailModal";
// same**
import Paging from "../modules/paging";
import { useParams } from "react-router-dom";

function MyArticle() {
  // **same
  // const [idDetail, setIdDetail] = useState(0);
  // const { updateIdDetail } = useContext(IdDetailContext);
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [pageNo, setPageNo] = useState(0);
  const pageNo = 0;
  // const [pageSize, setPageSize] = useState(10);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const apiBaseUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  // const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기를 위한 변수

  // const target = useRef(null);
  // const handleImageClick = (id) => {
  //   setIdDetail(id);
  //   updateIdDetail({ id: id });
  //   setShowDetailModal(true);
  //   console.log(id);
  // };
  // same**

  const { userNick } = useParams();
  console.log(userNick);

  // const [userNick,setUserNick] = useState('');

  // useEffect(() => {

  //     const storedNick = localStorage.getItem('nickname');
  //     if(storedNick) {
  //         setUserNick(storedNick);
  //     }
  // },[userNick]);  // 처음 마운트될때만 실행

  // 삼항연산자?
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `/api/article/page?pageNo=${pageNo}&userNick=${userNick}`
          );
          const data = await res.json();

          console.log(data.data.content);
          setArticleData((prevData) => {
            const newData = data.data.content.filter(
              (newArticle) =>
                !prevData.some(
                  (prevArticle) => prevArticle.id === newArticle.id
                )
            );
            return [...prevData, ...newData];
          });
          setTotalPages(data.totalPages);
        } catch (error) {
          console.log("Error fetching data", error);
        }
        setLoading(false);
      };
      fetchData();
    },
    [apiBaseUrl],
    [pageNo],
    [pageSize]
  );

  // **same
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     async (entries) => {
  //       if (entries[0].isIntersecting && !loading && pageNo < totalPages - 1) {
  //         setPageNo((prevPageNo) => prevPageNo + 1);
  //       }
  //     },
  //     { threshold: 0 }
  //   );

  //   if (!loading && target.current) {
  //     observer.observe(target.current);
  //   }

  //   return () => {
  //     if (target.current) {
  //       observer.unobserve(target.current);
  //     }
  //   };
  // }, [loading, pageNo, totalPages]);
  // same**

  // return articleData.length !== 0 ? (
  //   <div className="container pt-24">
  //     {articleData.map((article) => (
  //       <div key={article.id} className="box">
  //         <img
  //           src={`/imgFiles/${article.imgFilePath}/${article.imgFileName}`}
  //           alt="a"
  //           onClick={() => handleImageClick(article.id)}
  //         />
  //       </div>
  //     ))}
  //     <div ref={target}></div>
  //     <DetailModal
  //       showModal={showDetailModal}
  //       setShowModal={setShowDetailModal}
  //       articleId={idDetail}
  //     />
  //   </div>
  // ) : (
  //   <></>
  // );
  return (
    <Paging
      articleData={articleData}
      loading={loading}
      totalPages={totalPages}
      pageno={pageNo}
      // isHome={false}
      // setPageNo={setPageNo}
    />
  );
}

export default MyArticle;
