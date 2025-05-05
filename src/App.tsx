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
import ForgotPasswordPage  from "./pages/Guest/ForgotPasswordPage";
import ResetPasswordPage  from "./pages/Guest/ResetPasswordPage";
import ChangePassword from './pages/User/ChangePassword'
import RegisteredEvents from './pages/User/RegisteredEvents'
import UserDisciplinaryPoint from './pages/User/UserDisciplinaryPoint'
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
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/user/user-profile' element={<Home />} />
              <Route path='/user/activity-point' element={<ActivityPoint />} />
              <Route path='/user/submit-activity' element={<UserActivity />} />
              <Route path='/user/chang-pass' element={<ChangePassword />} />
              <Route path='/user/register-event' element={<RegisteredEvents />} />
              <Route path='/user/point' element={<UserDisciplinaryPoint />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
