import { Signup } from './pages/Singup';
import { Signin } from './pages/Signin';
import { Blogs } from './pages/Blogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Blog } from './pages/Blog';
import { Publish } from './pages/Publish';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/blog/:id' element={<Blog/>} />
          <Route path='/publish' element={<Publish/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
