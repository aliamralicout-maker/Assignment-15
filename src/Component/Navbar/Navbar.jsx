// import React, { useContext, useState } from 'react'
// import { AiOutlineHome } from 'react-icons/ai'
// import { FaRegUser } from 'react-icons/fa'
// import { FiMessageCircle } from 'react-icons/fi'
// import { MdSettings } from 'react-icons/md'
// import { RxHamburgerMenu } from 'react-icons/rx'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { TokenContext } from '../../Context/TokenContext'
// import { userProfile } from '../../Context/UserprofileContext'

// export default function Navbar() {
//     const activ = 'bg-white text-[#1f6fe5]';
//     const hover = ' text-slate-600 hover:bg-white/90 hover:text-slate-900';
//     const { removeUserToken } = useContext(TokenContext);
//     const { userData, removeUserData } = useContext(userProfile);
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();



//     function logOutHandler() {
//         removeUserToken();
//         removeUserData();
//         navigate('/Login');
//     }


//     return (
//         <div className='fixed top-0 right-0 left-0 z-10 bg-white'>
//             <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8 flex  items-center justify-between gap-2 py-1.5 sm:gap-3 bg-white  z-10">
//                 <div className="flex items-center gap-3">
//                     <img alt="Route Posts" className="h-9 w-9 rounded-xl object-cover" src="https://route-posts.routemisr.com/route.png" />
//                     <p className="hidden text-xl font-extrabold text-slate-900 sm:block">Route Posts</p>
//                 </div>

//                 <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">

//                     <NavLink
//                         to="/"
//                         className={({ isActive }) => `
//         relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5
//         ${isActive ? 'bg-white text-[#1f6fe5]' : 'text-slate-600 hover:bg-white/90 hover:text-slate-900'}
//         `}
//                     >
//                         <AiOutlineHome size={'20px'} />
//                         <span className="hidden sm:inline">Feed</span>
//                     </NavLink>

//                     <NavLink
//                         to={`/profile`}
//                         className={({ isActive }) => `
//         relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5
//         ${isActive ? 'bg-white text-[#1f6fe5]' : 'text-slate-600 hover:bg-white/90 hover:text-slate-900'}
//         `}
//                     >
//                         <FaRegUser size={'20px'} />
//                         <span className="hidden sm:inline">Profile</span>
//                     </NavLink>

//                     <NavLink
//                         to=""
//                         className='relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900'
//                     >
//                         <FiMessageCircle size={'20px'} />
//                         <span className="hidden sm:inline">Notifications</span>
//                     </NavLink>

//                 </nav>

//                 <div className="relative">
//                     <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100 cursor-pointer">
//                         <img alt={userData?.name} className="h-8 w-8 rounded-full object-cover" src={userData?.photo} />
//                         <span className="hidden max-w-[140px] truncate text-sm font-semibold text-slate-800 md:block">{userData?.name}</span>
//                         <RxHamburgerMenu />
//                     </button>

//                     {/*  */}
//                     {open && <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg z-10">
//                         <ul className="flex flex-col py-1">
//                             <li>
//                                 <Link to={'/Profile'} onClick={() => setOpen(!open)} >
//                                     <button className=" flex content-center items-center  w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
//                                         <span className='me-2'> <FaRegUser /> </span>
//                                         <span>Profile</span>
//                                     </button>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to={'/ChangePassword'} onClick={() => setOpen(!open)} >
//                                     <button className=" flex content-center items-center  w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
//                                         <span className='me-2'> <FaRegUser /> </span>
//                                         <span>Setting</span>
//                                     </button>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <button onClick={() => logOutHandler()} className="border-t-2 border-gray-400 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100">
//                                     <span>Logout</span>
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>}
//                 </div>
//             </div>

//         </div>
//     )
// }



import React, { useContext, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { userProfile } from '../../Context/UserprofileContext';

export default function Navbar() {
  const { removeUserToken } = useContext(TokenContext);
  const { userData, removeUserData } = useContext(userProfile);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function logOutHandler() {
    removeUserToken();
    removeUserData();
    navigate('/Login');
  }

  return (
    <div className='fixed top-0 right-0 left-0 z-10 bg-white'>
      <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 py-1.5 sm:gap-3 bg-white z-10">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img alt="Route Posts" className="h-9 w-9 rounded-xl object-cover" src="https://route-posts.routemisr.com/route.png" />
          <p className="hidden text-xl font-extrabold text-slate-900 sm:block">Route Posts</p>
        </div>

        {/* Desktop nav - hidden on mobile */}
        <nav className="hidden md:flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <NavLink
            to="/"
            className={({ isActive }) => `
              relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5
              ${isActive ? 'bg-white text-[#1f6fe5]' : 'text-slate-600 hover:bg-white/90 hover:text-slate-900'}
            `}
          >
            <AiOutlineHome size={'20px'} />
            <span className="hidden sm:inline">Feed</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `
              relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5
              ${isActive ? 'bg-white text-[#1f6fe5]' : 'text-slate-600 hover:bg-white/90 hover:text-slate-900'}
            `}
          >
            <FaRegUser size={'20px'} />
            <span className="hidden sm:inline">Profile</span>
          </NavLink>

          <NavLink
            to=""
            className='relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900'
          >
            <FiMessageCircle size={'20px'} />
            <span className="hidden sm:inline">Notifications</span>
          </NavLink>
        </nav>

        {/* Hamburger */}
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100 cursor-pointer">
            <img alt={userData?.name} className="h-8 w-8 rounded-full object-cover" src={userData?.photo} />
            <span className="hidden max-w-[140px] truncate text-sm font-semibold text-slate-800 md:block">{userData?.name}</span>
            <RxHamburgerMenu />
          </button>

          {/* Mobile menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg z-10">
              <ul className="flex flex-col py-1">
                {/* Feed */}
                <Link to="/" onClick={() => setOpen(false)}>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                    <AiOutlineHome />
                    <span>Feed</span>
                  </button>
                </Link>
                {/* Profile */}
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                    <FaRegUser />
                    <span>Profile</span>
                  </button>
                </Link>
                {/* Notifications */}
                <Link to="" onClick={() => setOpen(false)}>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                    <FiMessageCircle />
                    <span>Notifications</span>
                  </button>
                </Link>
                {/* Setting */}
                <Link to="/ChangePassword" onClick={() => setOpen(false)}>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                    <FaRegUser />
                    <span>Setting</span>
                  </button>
                </Link>
                {/* Logout */}
                <button onClick={logOutHandler} className="border-t-2 border-gray-400 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100">
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}