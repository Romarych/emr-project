import React from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProfileInfo from './components/ProfileInfo';

function App() {
  return (
    <div className='font-roboto'>
      <Header/>
      <Sidebar/>
      <ProfileInfo/>
      <Footer/>
    </div>
  );
}

export default App;
