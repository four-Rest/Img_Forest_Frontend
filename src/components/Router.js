import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Article from "./contents/Article";
import ArticleTag from "./contents/ArticleTag";
import CheckSocialLogin from "../api/CheckSocialLogin";
import HomePaging from "./contents/HomePaging";
import Detail from "./contents/Detail";
import { SearchTagProvider } from "../api/SearchTagContext";
import { IdDetailProvider } from "../api/IdDetailContext";
import MyArticle from "./contents/MyArticle";
import Modify from "./contents/Modify";
import Payment from "./layouts/Payment";
function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes className="flex-grow">
          <Route path="/" element={<HomePaging />} />
          <Route path="/article" element={<Article />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/article/modify/:id" element={<Modify />} />
          <Route path="/article/:tagString" element={<ArticleTag />} />
          <Route path="/myarticle/:userNick" element={<MyArticle />} />
          <Route path="/detail/:id" element={<Detail />} />
          {/* <Route path="/check-social-login" element={<CheckSocialLogin />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
