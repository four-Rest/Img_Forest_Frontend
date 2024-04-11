import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/layouts/Footer";
// import Header from "../components/layouts/Header";
import Article from "./Article";
import ArticleTag from "./ArticleTag";
import Detail from "./Detail";
import Modify from "./Modify";
import MyArticles from "./MyArticles";
import Payment from "./Payment";
function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<div> 123 </div>} />
          {/* <Route path="/" element={<HomePaging />} /> */}
          <Route path="/article" element={<Article />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/article/modify/:id" element={<Modify />} />
          <Route path="/article/:tagString" element={<ArticleTag />} />
          <Route path="/myarticles/:userNick" element={<MyArticles />} />
          <Route path="/detail/:id" element={<Detail />} />
          {/* <Route path="/check-social-login" element={<CheckSocialLogin />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
