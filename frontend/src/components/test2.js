import React, {useState} from 'react';

const Counter = ({initialState = 0}) => {
    const [count, setCount] = useState(initialState);
    return <div onClick={() => setCount(count + 1)}>{count}</div>
}

export default Counter;
// yarn add react@next react-dom@next