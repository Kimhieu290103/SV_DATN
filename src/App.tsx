import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/MainPage/LandingPage'
import ActivitiesPage from './pages/MainPage/ActivitiesPage'
import DefaultLayout from './layouts/DefaultLayout'
import ProtectedRoute from '~/routes/ProtectedRoute'
import LoginPage from './pages/Guest/LoginPage'
import ScrollToTop from './components/common/ScrollToTop'
import ActivityDes from './components/Home/ActivityDes'
import Home from './pages/User/Home'
import ActivityPoint from './pages/User/ActivityPoint'
import CriteriaPage from './pages/MainPage/CriteriaPage'
import UserActivity from './pages/User/UserActivity'
import RegisterPage from "./pages/Guest/RegisterPage";



function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<LandingPage></LandingPage>}></Route>
            <Route path='/activities' element={<ActivitiesPage></ActivitiesPage>}></Route>
            <Route path='/criteria' element={<CriteriaPage></CriteriaPage>}></Route>
            <Route path='/activity/:id' element={<ActivityDes></ActivityDes>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/user/user-profile' element={<Home />} />
              <Route path='/user/activity-point' element={<ActivityPoint />} />
              <Route path='/user/submit-activity' element={<UserActivity />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
