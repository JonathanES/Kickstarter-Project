import React, {useRef, useState} from 'react';

function useCounter(intialState){
    const [count, setCount] = useState(initialState);
    const handlers = {
        increment: () => setCount(count + 1),
        decrement: () => setCount(count - 1)
    };
    return [count, handlers];
}

const App = () => {
    const [count, {increment, decrement}] = useCounter(0);
    return (
        <div>
            <div>{count}</div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}