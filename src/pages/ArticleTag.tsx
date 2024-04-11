import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchTagContext } from "../delete/SearchTagContext";
import "../styles/styles.css";
function ArticleTag() {
  const { tagString } = useParams();
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const imgUrl = process.env.REACT_APP_CORE_IMAGE_BASE_URL;

  const { searchTag } = useContext(SearchTagContext);
  const [articleData, setArticleData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/article/${tagString}`);
        const data = await res.json();
        const dataArray = Array.from(data.data);
        console.log(dataArray);
        setArticleData(dataArray);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [tagString]);

  return articleData.length !== 0 ? (
    <div className="container pt-24">
      {articleData.map((article: any) => (
        <div key={article.id} className="box">
          <img
            src={`${imgUrl}/${article.imgFilePath}/${article.imgFileName}`}
            alt="a"
          />
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
}

export default ArticleTag;
