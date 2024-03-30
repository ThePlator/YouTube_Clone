import React from 'react';
import { useSelector } from 'react-redux';

const Sidebar = ({ items }) => {
    const isMenuOpen = useSelector(store => store.app.isMenuOpen)

    //Early Return pattern
    if(!isMenuOpen) return null;

  return (
    <div className="bg-gray-800 w-45 h-screen sticky " style={{top: '80px'}}>
      <div className="p-4">
        {items.map((item, index) => (
          <button
            key={index}
            className="block text-white py-2 px-4 rounded hover:bg-gray-700 mt-2"
            onClick={() => console.log(`${item} clicked`)}

          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const Sidenav = () => {
  const sidebarItems = [
    "Home",
    "About",
    "Services",
    "Contact",
    "Explore",
    "Trending",
    "Shopping",
    "Music",
    "Films",
    "Live",
    "Gaming",
    "News",
    "Sport"
  ];

  return (
    <div className="flex">
      <Sidebar items={sidebarItems} />
    </div>
  );
};

export default Sidenav;
