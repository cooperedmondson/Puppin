import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Developers from './components/Developers';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DogRegister from './components/DogRegister';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Events from './components/Events';
import { useToken } from './auth/Authentication';
import LoggedinNav from './components/LoggedinNav';
import ReviewsGivenSlide from './components/ReviewsSliderComponents/ReviewsByCurrentUser';
import Profile from './components/Profile';
import ReviewsByEvent from './components/ReviewsSliderComponents/ReviewsForEvent';
import CreateEvent from './components/CreateEvent';
import DogUpdate from './components/DogUpdate';
import CreateReview from './components/ReviewFrom';
import PublicProfile from './components/PublicProfile';


export default function App() {
  const [ token, login, logout] = useToken();
  
  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path="" element={[ <Navbar/>,<Hero token={token}/>, <About/>, <Developers/>, <Footer/> ]}/>
              <Route path="myreviews/submit" element={<CreateReview token={token}/>}/>
            <Route path='registration'>
              <Route path="login" element={<Login  login={login} token={token}/>}/>
              <Route path="create" element={<SignUp token={token}/>}/>
              <Route path="dog" element={<DogRegister token={token}/>}/>
              <Route path="dog/update" element={<DogUpdate token={token}/>}/>
            </Route>
            <Route path='event'>
            <Route path = 'create'element = {<CreateEvent token={token}/>}/>
              <Route path='home'element={[<LoggedinNav logout={logout} token={token}/>, <Events/>, <ReviewsGivenSlide token={token}/>, <ReviewsByEvent/>]} />
            </Route>
            <Route path='profile'>
              <Route path=''element={[<LoggedinNav logout={logout} token={token}/>, <Profile/>]} /> 
            </Route>
            <Route path='user/:username' element={[ <PublicProfile/>]} />            
          </Routes>
    </BrowserRouter>
    </>
  )
}