import React, {useRef, useState} from 'react';
const App = () => {
    const nameInputReference = useRef();
    const emailInputReference = useRef();

    const [isValid, setValid] = useState(false);
    const checkValues = () => {
        if (nameInputReference.current.value !== 'toto'){
            setValid(false);
        }
    }
    const onSubmit = () => {
        domSomethingWith({
            name: nameInputReference.current.value,
            email: emailInputReference.current.value
        })
    }
    <div>
        name: <input ref={} onChange={checkValues}/>
        email: <input ref={}/>
        <button onClick={onSubmit}></button>
    </div>
}