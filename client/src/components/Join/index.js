import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Join = () => {
   
    // name and room state
    const [name, setName] = useState('');

    // handle change

    const nameChange = (e) => setName(e.target.value);
    const handleClick = (e) => name ? null : e.preventDefault();

    return (
        <div>
            <p>Name: <input type="text" placeholder="Enter name" onChange={nameChange} /></p>
            <Link onClick={handleClick} to={`/chat?name=${name}`}>
                <button type="submit">Enter</button>
            </Link>
        </div>
    );
}

export default Join;