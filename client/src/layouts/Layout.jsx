import PropTypes from 'prop-types'
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Layout({ children }) {

    const location = useLocation();
    const scrollRef = useRef(null);

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0 });
        }
    }, [location.pathname]);

    return (
        <div ref={scrollRef} className={`h-screen scroll-smooth flex flex-col overflow-y-auto overflow-x-hidde transition-colors duration-300 overflow-x-hidden bg-white dark:bg-[#161616]`} >
            <Navbar />
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node
};