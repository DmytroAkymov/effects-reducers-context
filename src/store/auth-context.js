import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    loginHandler: () => {},
    logoutHandler: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginInfo = localStorage.getItem('isLoggedIn');
        if (storedLoginInfo === '1') {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn, setIsLoggedIn]);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, loginHandler, logoutHandler }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
