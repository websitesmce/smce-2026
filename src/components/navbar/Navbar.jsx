import React from 'react';
import Topbar from './Topbar';
import Navigationbar from './Navigationbar';

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-[999]">
      <Topbar />
      <Navigationbar />
    </div>
  );
}

export default Navbar;
