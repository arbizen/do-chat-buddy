import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import io from 'socket.io-client';
import './theme.css';
import Title from '../others/Title';
import Body from '../others/Body';
import Sender from '../others/Sender';



const Chat = ({ location }) => {
    const ENDPOINT = 'https://do-chat-buddy.herokuapp.com/';
    const HOST = '/chat';
    const [name, setName] = useState('');
    const [datas, setDatas] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(io(ENDPOINT));
    let input;

    const scrollToBottom = (el) => el.scrollTo(0, el.scrollHeight);

    useEffect(() => {
        // set name to name state
        const d = queryString.parse(location.search);
        setName(d.name);

    }, []);

    useEffect(() => {

        // get data
        const getData = async () => {
            const res = await axios.get(HOST);
            const main = await res.data;
            setDatas(main);
        }

        getData(); // get data from mongodb

    }, []);

    useEffect(() => {
        // socket event
        socket.once('fromServer', (d) => {
            setDatas([...datas, d]);  
        });
        scrollToBottom(document.getElementById('body')); // always scroll to bottom
    }, [datas]);

    const handleClick = () => {
        // when the button gets clicked an emit event should be fired to send the data
        // to our server
        socket.emit('message', {name, message});
        setDatas([...datas, {name, message}]);

        // post a data in monogdb
        axios.post(HOST, {name, message});
        input.value = '';
        setMessage('');
    }

    const getInput = e => input = e;

    const handleChange = e => setMessage(e.target.value);
    const deleteMessage = () => axios.delete(HOST);

    return (
        <div className='container'>
            <Title />
            <Body messages={ datas }/>
            <Sender data={{handleChange, handleClick, deleteMessage, getInput}} />
        </div>
    );
}

export default Chat;