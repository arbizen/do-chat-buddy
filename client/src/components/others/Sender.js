import React from 'react';

const Sender = ({data}) => {
    return (
        <div className='sender'>
            <input type='text' ref={data.getInput} placeholder='Enter a message' onChange={data.handleChange} />
            <button onClick={data.handleClick}>Send</button>
            <button onClick={data.deleteMessage}>Delete</button>
        </div>
    );
}

export default Sender;