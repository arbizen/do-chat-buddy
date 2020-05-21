import React from 'react';

const Message = ({name, message}) => {
    return (
        <div>
            <div className='message'>
                <b>{name} :</b> {message}
            </div>
        </div>
    );
}

export default Message;