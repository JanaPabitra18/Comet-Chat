
import React, {  } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector} from "react-redux";
//import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
   

    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='w-full md:min-w-[550px] flex flex-col'>
                        <div className='flex gap-2 items-center bg-orange-600 text-white px-2 py-2 mb-2 md:px-4 md:py-2'>
                            <div className={`avatar avatar-${isOnline ? 'online' : ''}`}>
                                <div className='relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden'>
                                    <img className='w-full h-full object-cover' src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between items-center gap-2'>
                                    <p className='text-sm md:text-base font-medium'>{selectedUser?.fullname}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullname} </h1>
                        <h1 className='text-2xl text-white'>Let's start conversation</h1>

                    </div>
                )
            }
        </>

    )
}

export default MessageContainer