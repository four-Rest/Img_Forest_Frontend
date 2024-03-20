import React, { useState, useEffect, useContext, useRef } from "react";
import "../../styles/styles.css";
import { IdDetailContext } from "../../api/IdDetailContext";
import DetailModal from "../elements/DetailModal";
import { useParams } from "react-router-dom";

function Paging({
  articledata,
  parentLoading,
  pageno,
  pagesize,
  totalpages,
  hasParams,
}) {
  const [idDetail, setIdDetail] = useState(0);
  const { updateIdDetail } = useContext(IdDetailContext);
  const [pageNo, setPageNo] = useState(pageno);
  const [totalPages, setTotalPages] = useState(totalpages);
  const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기를 위한 변수
  const [articleData, setArticleData] = useState(articledata);
  const [loading, setLoading] = useState(parentLoading);
  const [pageSize, setPageSize] = useState(pagesize);
  const apiBaseUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const { userNick } = useParams();
  let urlParam = "";
  let dataFilter = "";

  const target = useRef(null);
  const handleImageClick = (id) => {
    setIdDetail(id);
    updateIdDetail({ id: id });
    setShowDetailModal(true);
    console.log(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading && pageNo < totalPages - 1) {
          setPageNo((prevPageNo) => prevPageNo + 1);
        }
      },
      { threshold: 0 }
    );

    if (!loading && target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [loading, pageNo, totalPages]);

  if (hasParams) {
    urlParam = `&userNick=${userNick}`;
    dataFilter = `data.content`;
  } else {
    urlParam = `&pageSize=${pageSize}`;
    dataFilter = `data`;
  }
  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `/api/article/page?pageNo=${pageNo}${urlParam}`
          );
          const data = await res.json();

          //   console.log(`data.data.content`, data.data.content);
          setArticleData((prevData) => {
            const newData = data.dataFilter.filter(
              (newArticle) =>
                !prevData.some(
                  (prevArticle) => prevArticle.id === newArticle.id
                )
            );
            return [...prevData, ...newData];
          });
          setTotalPages(data.totalPages);
        } catch (error) {
          console.log(`dataFilter: `, dataFilter);
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

  return articleData.length !== 0 ? (
    <div className="container pt-24">
      {articleData.map((article) => (
        <div key={article.id} className="box">
          <img
            src={`/imgFiles/${article.imgFilePath}/${article.imgFileName}`}
            alt="a"
            onClick={() => handleImageClick(article.id)}
          />
        </div>
      ))}
      <div ref={target}></div>
      <DetailModal
        showModal={showDetailModal}
        setShowModal={setShowDetailModal}
        articleId={idDetail}
      />
    </div>
  ) : (
    <></>
  );
}

export default Paging;
