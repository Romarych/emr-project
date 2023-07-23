import React, { useState } from 'react';
import { useReactiveVar } from '@apollo/client';

import DateNow from './DateNow';
import { setClient } from '../../cache';

import logo from '../../static/images/logo.png';
import avatar from '../../static/images/avatar-1.png';
import settings from '../../static/images/settings.svg';
import settingsActive from '../../static/images/settings-active.svg';
import logout from '../../static/images/logout.svg';
import logoutActive from '../../static/images/logout-active.svg';


const Header = () => {
  const client = useReactiveVar(setClient);

  const [isMenu, setIsMenu] = useState<boolean>(false);

  return (
    <header className='h-[80px] bg-gray-1 fixed top-0 w-full z-20 flex items-center px-[50px]' style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
      <div className='w-[230px]'>
        <img src={logo} alt="Logo" className='h-[52px]' />
      </div>
      <div className='flex justify-between items-center w-[calc(100%-280px)]'>
        <div className='text-brown-1 font-medium text-2xl leading-7 pl-3'>{client ? 'Client Profile' : 'Welcome'}</div>
        <DateNow/>
        <div className='flex text-sm leading-4 items-center relative'>
          <div className='text-right'>
            <div className='font-medium'>Freaken Bock</div>
            <div className='font-light'>Administrator</div>
          </div>
          <img src={avatar} alt="Avatar" className='h-[42px] ml-3' />
          <button onClick={() => setIsMenu(!isMenu)} className={`${isMenu && '-rotate-180'} p-3 duration-300`}>
            <div className='w-0 h-0 border-0 border-transparent border-r-8 border-l-8 border-b-8 border-b-black-2' />
          </button>
          {isMenu && <div className='h-[106px] font-light text-base leading-5 w-[216px] px-2 pt-4 absolute top-[52px] -right-2 rounded-sm bg-gray-1' style={{ boxShadow: '0px 0px 4px 0px #00000040' }}>
            <button className='flex relative items-center h-[38px] hover:text-brown-1 duration-300 p-2 rounded-sm hover:bg-gray-4 w-full'>
              <div className='absolute'>
                <img src={settingsActive} alt="Logout" className='h-6 w-6 mr-2' />
              </div>
              <div className='absolute w-full h-full flex items-center hover:opacity-0 duration-300'>
                <img src={settings} alt="Logout" />
              </div>
              <span className='ml-8'>Settings</span>
            </button>
            <button className='flex items-center relative h-[38px] hover:text-brown-1 duration-300 p-2 rounded-sm hover:bg-gray-4 w-full'>
              <div className='absolute'>
                <img src={logoutActive} alt="Logout" className='h-6 w-6 mr-2' />
              </div>
              <div className='absolute w-full h-full flex items-center hover:opacity-0 duration-300'>
                <img src={logout} alt="Logout" />
              </div>
              <span className='ml-8'>Logout</span>
            </button>
          </div>}
        </div>
      </div>
    </header>
  );
};

export default Header;