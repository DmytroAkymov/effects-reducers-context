import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
    return (
        <div
            className={`${styles.control} ${
                props.emailState === false ? styles.invalid : ''
            }`}
        >
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            ></input>
        </div>
    );
};

export default Input;
