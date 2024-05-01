import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Article from './Article';
import ArticleCreateUpdate from './ArticleCreateUpdate';
import ArticleDetail from './ArticleDetail';
import ArticleTag from './ArticleTag';
import Home from './Home';
import MyArticles from './MyArticles';
import MyLikeList from './MyLikeList';
import Payment from './Payment';

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
              <Route path="/mypage/likelist" element={<MyLikeList />} />
              {/* <Route path="/check-social-login" element={<CheckSocialLogin />} /> */}
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default Router;
