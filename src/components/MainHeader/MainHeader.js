import React, { useContext } from 'react';

import Navigation from './Navigation';
import styles from './MainHeader.module.css';
import AuthContext from '../../store/auth-context';

const MainHeader = () => {
    const ctx = useContext(AuthContext);
    return (
        <header className={styles['main-header']}>
            <h1>React Advanced</h1>
            <Navigation
                isLoggedIn={ctx.isLoggedIn}
                onLogout={ctx.logoutHandler}
            />
        </header>
    );
};

export default MainHeader;
