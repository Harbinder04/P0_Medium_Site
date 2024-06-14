
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

function Home() {
    const navigate = useNavigate();

    function handleSignUpClick(){
        navigate('/signup')
    }

    function handleSignInClick(){
        navigate('/signin')
    }
  return (
    <div className="flex flex-col h-screen justify-between bg-gradient-to-r from-[#0f1b2b] to-[#1228b4]">
      <header className="flex justify-between items-center p-4 text-white">
        <h1 className="text-2xl font-bold">BloGi Fi</h1>
        <div>
          <button className="mx-2 px-4 py-2 bg-white text-black font-medium hover:bg-blue-400 rounded-full" onClick={handleSignInClick}>
            Sign In
          </button>
          <button className="mx-2 px-4 py-2 bg-white text-black font-medium hover:bg-blue-400 rounded-full" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <h2 className="text-8xl font-bold text-white text-center">
          <Typewriter
            words={['Welcome to BloGi Fi', 'Share your stories', 'Inspire the world']}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
      </main>
      <footer className="p-4 text-white text-center">
        © 2024 BlogSite. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
