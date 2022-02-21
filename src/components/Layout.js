import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({children}) {
    const title = "그린고객관리";
    return (
        <div>
            <Header title={title} />
            {children}
            <Footer title={title} />
        </div>
    );
}

export default Layout;