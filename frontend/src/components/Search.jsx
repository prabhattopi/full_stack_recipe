import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = ({ hidden }) => {
    return (
        <div
            className={`fixed top-22 left-0 w-2/3 sm:w-1/3 p-2 z-20 transition-opacity ${
                hidden ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
            }`}
        >
            <div className="flex items-center bg-white rounded-lg p-2 shadow-md">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-1 px-2 outline-none rounded-l-lg"
                />
                <button className="bg-blue-500 text-white p-1 rounded-r-lg">
                    <FiSearch />
                </button>
            </div>
        </div>
    );
};

export default Search;
