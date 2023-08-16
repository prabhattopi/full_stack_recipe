import React, { useState, useEffect } from 'react';
import Data from '../components/Data';
import Search from '../components/Search';

const Home = () => {
    const [scrollingDown, setScrollingDown] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;

        if (currentScrollPos > prevScrollPos) {
            setScrollingDown(true);
        } else {
            setScrollingDown(false);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <>
            <Search hidden={scrollingDown} />
            <Data />
        </>
    );
};

export default Home;
