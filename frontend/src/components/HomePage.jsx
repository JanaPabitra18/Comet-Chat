
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser, selectedUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [ authUser, navigate]);
  return (
    <div className='w-full'>
      {/* Brand Header */}
      <header className='w-full mb-3 md:mb-4'>
        <div className='max-w-6xl mx-auto px-3 flex items-center gap-3'>
          <span className='inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-600 shadow-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className='h-5 w-5 md:h-6 md:w-6'>
              <path d="M2 12c4-1 7-3 10-6 0 4 2 7 6 10-3 1-6 2-9 2s-6-1-7-6z"/>
              <circle cx="18" cy="6" r="2" />
            </svg>
          </span>
          <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500'>
            Comet Chat
          </h1>
        </div>
      </header>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='rounded-2xl shadow-2xl bg-neutral-900/60 backdrop-blur-md border border-slate-700/60 overflow-hidden'>
          <div className='flex flex-col md:flex-row h-[calc(100vh-9rem)] md:h-[560px]'>
            <div className='w-full md:w-1/3 md:min-w-[260px] shrink-0 h-1/2 md:h-full overflow-y-auto border-b md:border-b-0 md:border-r border-slate-700/40 p-2 md:p-3'>
              <Sidebar />
            </div>
            <div className={`w-full md:w-2/3 h-1/2 md:h-full overflow-y-auto p-2 md:p-3 ${!selectedUser ? 'hidden md:block' : ''}`}>
              <MessageContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
