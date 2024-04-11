// /*esLint-disable */
import React from "react";
import "./App.css"; // 스타일 시트
// import { AuthProvider } from "./delete/AuthContext";
// import { IdDetailProvider } from "./delete/IdDetailContext";
// import { SearchTagProvider } from "./delete/SearchTagContext";
import Router from "./pages/Router";

function App() {
  return (
    <React.Fragment>
          <Router />
    </React.Fragment>
    // <AuthProvider>
    //   <SearchTagProvider>
    //     <IdDetailProvider>
    //       <Router />
    //     </IdDetailProvider>
    //   </SearchTagProvider>
    // </AuthProvider>
  );
}

export default App;
