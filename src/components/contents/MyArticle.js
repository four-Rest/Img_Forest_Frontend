import React, { useState, useEffect } from "react";
import Paging from "../modules/paging";
import { useParams } from "react-router-dom";

function MyArticle() {
  const { userNick } = useParams();
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const apiBaseUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  const pageNo = useState(0);
  const pageSize = useState(10);

  console.log(userNick);
  // console.log(typeof userNick);

  // useEffect(() => {

  //     const storedNick = localStorage.getItem('nickname');
  //     if(storedNick) {
  //         setUserNick(storedNick);
  //     }
  // },[userNick]);  // 처음 마운트될때만 실행

  return (
    // <></>
    <Paging
      articledata={articleData}
      parentLoading={loading}
      totalpages={totalPages}
      pageno={pageNo}
      pagesize={pageSize}
      hasParams={true}
    />
  );
}

export default MyArticle;
