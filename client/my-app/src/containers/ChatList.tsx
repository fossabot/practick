import React,{useState, useEffect} from 'react';
import {getChatUsers} from "../api/userApi"
import ChatItem from '../components/ChatItem'
import socketIOClient from 'socket.io-client'

interface IUsersProps {
    email:any
}

const ChatList: React.FunctionComponent<IUsersProps> = (props:any) => {
    const [data,setData] = useState<any>([])
    const [endpoint,setEndpoint] = useState(`https://practick.herokuapp.com`)
    const socket = socketIOClient(endpoint);

    useEffect(()=>{
        getChatUsers(props.email).then(res=>{
            setData(res)
            // res.map((el:any)=>{
            //     console.log("11111111111111"+res)
            //     if(localStorage.getItem(el.room) === null){
            //         localStorage.setItem(el.room, 'false');
            //     }
            // })
            
        })
    },[])

    return (
        <div>
            {data.map((el:any)=>{
                return (
                    <>
                        <ChatItem data={el}/>
                    </>
                )
            })}
        </div>
    )
};



export default ChatList;