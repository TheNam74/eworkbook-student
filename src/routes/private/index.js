import React, { useRef } from 'react'
import {
  Route, Routes, Navigate, useSearchParams,
} from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../../pages/home'
import PageNotFound from '../../pages/pageNotFound'
import ExercisePage from '../../pages/exercise'
import RootDetail from '../../pages/rootDetail'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Library from "../../pages/library"
import SignIn from "../../pages/signIn"
import SignUp from "../../pages/signUp"
import Profile from "../../pages/profile"
import Books from '../../pages/history/components/books'
import Details from '../../pages/history/components/details'
import Assignments from '../../pages/assignment'
import Pair from '../../pages/pair'
import CreatePair from '../../pages/pair/Components/createPair'
import CheckPoint from '../../pages/checkPoint'

const { Content } = Layout;

function PrivateRouter() {
  const [searchParams] = useSearchParams();
  const isPC = useRef(searchParams.get('isMobile') !== 'true');
  return (
    <Layout>
      {isPC.current && <Header isSignIn />}
      <Content className="content">
        <Routes>
          <Route exact path="/" element={<Home isSignIn />} />
          <Route path="/demo" element={<ExercisePage typeDisplay="Exercise" />} />
          <Route path="/checkpoint/:recordId" element={<CheckPoint />} />
          <Route path="/exam/:materialid" element={<ExercisePage typeDisplay="Exam" />} />
          <Route path="/exercise" element={<ExercisePage typeDisplay="Exercise" />} />
          <Route path="/exercise/:materialid" element={<ExercisePage typeDisplay="Exercise" />} />
          <Route path="/library" element={<Library />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/root-detail/:id" element={<RootDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history/:id" element={<Books />} />
          <Route path="/history/details/:id/" element={<Details />} />
          <Route path="/assignments/:id" element={<Assignments />} />
          <Route path="/pair/:teacherid" element={<Pair />} />
          <Route path="/pair" element={<CreatePair />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Content>
      {isPC.current && <Footer />}
    </Layout>
  );
}

export default PrivateRouter
