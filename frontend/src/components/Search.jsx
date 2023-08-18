import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useRecipe from '../hooks/useRecipe';

const Search = ({ hidden }) => {
    const {searchData}=useRecipe()
    const [search,setSearch]=useState("")
    return (
        <div
            className={`fixed top-22 left-0 w-2/3 sm:w-1/3 p-2 z-20 transition-opacity ${
                hidden ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
            }`}
        >
            <div className="flex items-center bg-white rounded-lg p-2 shadow-md">
                <input
                    type="text"
                    value={search}
                    placeholder="Search..."
                    className="w-full py-1 px-2 outline-none rounded-l-lg"
                    onChange={(e)=>{setSearch(e.target.value)}}
                    onKeyUp={async (e) => {
                        if (e.key === "Enter") {
                          await searchData(search);
                        }
                      }}
                />
                <button onClick={async()=>{
               
                       await searchData(search)
                   
                }
                } 
              
                className="bg-blue-500 text-white p-1 rounded-r-lg">
                    <FiSearch />
                </button>
            </div>
        </div>
    );
};

export default Search;
