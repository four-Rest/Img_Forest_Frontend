import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Article from './Article';
import ArticleCreateUpdate from './ArticleCreateUpdate';
import ArticleDetail from './ArticleDetail';
import ArticleTag from './ArticleTag';
import Home from './Home';
import Payment from './Payment';
import MyArticles from './mypage/MyArticles';
import MyBuyList from './mypage/MyBuyList';
import MyPersonelInformation from './mypage/MyPersonelInformation';
import MyPoint from './mypage/MyPoint';
import MySellList from './mypage/MySellList';
import TossPaymentSuccess from './mypage/TossPaymentSuccess';

function Router() {
  return (
    <div className="min-h-screen">
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <BrowserRouter>
          <Header />
          <main className={'m-auto max-w-[1440px] pt-10'}>
            <Routes>
              <Route path="" element={<Home />} />
              {/* <Route path="/" element={<HomePaging />} /> */}
              <Route path="/article" element={<Article />} />
              <Route path="/article/create" element={<ArticleCreateUpdate />} />
              <Route
                path="/article/modify/:id"
                element={<ArticleCreateUpdate edit={true} />}
              />
              <Route path="/payment" element={<Payment />} />
              <Route path="/article/:tagString" element={<ArticleTag />} />
              <Route path="/myarticles/:userNick" element={<MyArticles />} />
              <Route path="/article/detail/:id" element={<ArticleDetail />} />
              <Route path="/mypage/" element={<MyPersonelInformation />} />
              {/* <Route path="/mypage/like-list" element={<MyLikeList />} /> */}
              <Route path="/mypage/buy-list" element={<MyBuyList />} />
              <Route path="/mypage/sell-list" element={<MySellList />} />
              <Route path="/mypage/point" element={<MyPoint />} />
              {/* <Route path="/check-social-login" element={<CheckSocialLogin />} /> */}
            </Routes>
          </main>
          <Footer />
          <Routes>
            <Route path="/success" element={<TossPaymentSuccess />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default Router;
