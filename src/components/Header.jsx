import React, { useEffect, useState } from 'react';
import { HiBars3 } from "react-icons/hi2";
import { ImYoutube2 } from "react-icons/im";
import { MdOutlineVideoCall } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../Utils/sidenavSlice';
import { cacheResults } from '../Utils/searchSlice';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dispatch = useDispatch();

    const searchCache = useSelector((store) => store.search);

    useEffect(() => {
        console.log('api call: ' + searchQuery);
        const timer = setTimeout(() => {
            if(searchCache[searchQuery]){
                setShowSuggestions(searchCache[searchQuery]);
            }else{
                getSearchSuggestions();
            }
        }, 200);

        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        try {
            const data = await fetch('https://youtube-search-suggestion.onrender.com/?q=' + searchQuery);
            const result = await data.json();
            setSuggestions(result?.data[1]);
            console.log(result.data[1]);
            dispatch(cacheResults({
                [searchQuery]: result.data[1],
            }))
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
        }
    }

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    const handleInputFocus = () => {
        setShowSuggestions(true);
    }

    const handleInputBlur = () => {
        setShowSuggestions(false);
    }

    const handleSearch = () => {
        window.location.href = `/results?search_query=${searchQuery}`;
    }

    return (
        <div className='flex justify-between shadow-lg p-1 items-center bg-slate-800 text-white sticky top-0'>
            <div className='logo flex justify-center align-center items-center gap-8'>
                <HiBars3 onClick={() => toggleMenuHandler()} className='cursor-pointer' size={30} />
                <a href='/'><ImYoutube2 className='cursor-pointer' size={80} /></a>
            </div>
            <div className='search'>
                <div className='flex justify-center items-center'>
                    <input
                        type="text"
                        className='rounded-3xl py-1 px-4 bg-slate-600'
                        size={40}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    <button onClick={handleSearch}><CiSearch size={30} /></button>
                </div>
                {
                    showSuggestions && (
                        <div className='fixed bg-slate-600 px-9 py-1 w-[22rem] rounded-3xl hover:bg-gray-700 m-1'>
                            <ul>
                                {suggestions.map(line => (
                                        <li key={line} onClick={handleSearch} className='m-1 p-1 cursor-pointer hover:bg-gray-400 rounded-xl'> 🔍 {line}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </div>
            <div className='profiles flex justify-center align-center gap-8'>
                <MdOutlineVideoCall size={30} />
                <FaRegBell size={30} />
                <CgProfile size={30} />
            </div>
        </div>
    )
}

export default Header;
