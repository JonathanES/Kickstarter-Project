import React, {useState, useEffect} from 'react';

const Sizer = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener('resize',onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])
    return (
        <div>
            <span>width: {width}</span>
            <span>height: {height}</span>
        </div>
    )
}

export default Sizer;