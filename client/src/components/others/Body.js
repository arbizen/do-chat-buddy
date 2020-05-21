import React from 'react';
import Message from './Message';

const Body = ({messages}) => {
    return (
        <div id='body' className='chat-body'>
            {messages.length > 0 ? null : 'No message found. Try sending one.'}
            {messages.map((data, i) => {
                return (
                    <Message key={i} name={data.name} message={data.message} />
                );
            })}
        </div>
    );
}

export default Body;