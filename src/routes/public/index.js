import React from 'react'
import {
  Route, Routes, Navigate, useSearchParams,
} from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/home'
import PageNotFound from '../../pages/pageNotFound'
import RootDetail from '../../pages/rootDetail'
import Header from '../../components/header'
import Footer from '../../components/footer'
import SignIn from "../../pages/signIn"
import SignUp from "../../pages/signUp"
import ForgotPassword from '../../pages/forgotPassword'
import ExercisePage from '../../pages/exercise'

const { Content } = Layout;

function PublicRouter() {
  const [searchParams] = useSearchParams();
  const isPC = searchParams.get('isMobile') !== 'true';
  return (
    <Layout>
      {isPC && <Header />}
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/demo" element={<ExercisePage typeDisplay="Exercise" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/exercise/:materialid" element={<ExercisePage typeDisplay="Exercise" />} />
          <Route path="/root-detail/:id" element={<RootDetail />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/forgotPassword/:email/:randomString" element={<ForgotPassword />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate replace to="/signin" />} />
        </Routes>
      </Content>
      {isPC && <Footer />}
    </Layout>
  );
}

export default PublicRouter;
