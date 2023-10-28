import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value.includes('@'),
        };
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.includes('@'),
        };
    }
    return {
        value: '',
        isValid: false,
    };
};

const passwordReducer = (prevState, action) => {
    if (action.type === 'USER_PASSWORD_INPUT') {
        return { value: action.value, isValid: action.value.trim().length > 7 };
    }
    if (action.type === 'INPUT_PASSWORD_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 7,
        };
    }
    return {
        value: '',
        isValid: false,
    };
};

const Login = (props) => {
    const ctx = useContext(AuthContext);

    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmailState] = useReducer(emailReducer, {
        value: '',
        isValid: undefined,
    });

    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
        value: '',
        isValid: undefined,
    });

    // через деструктуризацию вытягиваем вместо массива зависимостей для useEffect берем только isValid
    // с указаним другого названия в emailIsValid убираем излишние запуски
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('fn');
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 1000);
        return () => {
            console.log('cler');
            clearTimeout(timer);
        };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmailState({ type: 'USER_INPUT', value: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPasswordState({
            type: 'USER_PASSWORD_INPUT',
            value: event.target.value,
        });
    };

    const validateEmailHandler = () => {
        dispatchEmailState({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchPasswordState({ type: 'INPUT_PASSWORD_BLUR' });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.loginHandler(emailState.value, passwordState.value);
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <Input
                    label="Email"
                    htmlFor="email"
                    emailState={emailState.isValid}
                    type="email"
                    id="email"
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                >
                    Email
                </Input>
                <Input
                    label="Password"
                    htmlFor="password"
                    emailState={passwordState.isValid}
                    type="password"
                    id="password"
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                >
                    Password
                </Input>
                <div className={styles.actions}>
                    <Button
                        type="submit"
                        className={styles.btn}
                        disabled={!formIsValid}
                    >
                        Вход
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
