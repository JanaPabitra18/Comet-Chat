import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function Otheruser({user}) {
  const dispatch =useDispatch();
  const {selectedUser, onlineUsers} =useSelector(store=>store.user);
  const isOnline = onlineUsers?.includes(user?._id);
  const selectedUserHandler = (user) => {
     //  console.log(user);
       dispatch(setSelectedUser(user));
  }
  return (
    <>
      <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ?'bg-orange-600 text-black': ''} flex items-center gap-3 md:gap-4 px-2 py-2 md:p-3 hover:bg-orange-600 rounded-lg cursor-pointer border border-slate-600/40 min-h-[56px]`}>
        <div className={`avatar avatar-${isOnline ? 'online' : ''}`}>
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-slate-700">
            <img
              className="w-full h-full object-cover"
              src={user?.profilePhoto || user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.fullname || user?.name || user?.username || user?.email || "User")}
              alt="userprofile"
            />
            {/* {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-orange-600 rounded-full md:w-3.5 md:h-3.5"></span>
            )} */}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex gap-2 justify-between items-center">
            <p className="font-medium text-sm md:text-base">{user?.fullname || user?.name || user?.username || user?.email || "Unknown User"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otheruser;
