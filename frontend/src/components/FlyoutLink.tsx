import React, { useState } from 'react';

export const FlyoutLink = ({ children, href} : any) => {
  const [open , setOpen] = useState(false);
  const showFlyout = open && FlyoutContent;
  return (
    <>
      <div 
      onMouseEnter={()=>{setOpen(true)}}
      onMouseLeave={()=>{setOpen(false)}}
      className="group relative h-fit w-fit ">
        <div className="relative cursor-pointer">
          {children}
        </div>
        {/* Render flyout content  */}
        {showFlyout && <div className="absolute left-10 top-10 bg-white -translate-x-full text-black">
        <div className="absolute -top-8 left-0 right-0 h-6
        bg-transparent"/>
        <div className="absolute right-4 top-0 h-4 w-4
        -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-600"/>

          <FlyoutContent href={href}/>
          </div>}
      </div>
    </>
  );
};

const FlyoutContent = ({href}: {href:string}) =>{
  return <div className="w-64 bg-gray-600 text-white p-6 shadow-xl">
     <ul>
      <li>
        <a href={href} className="font-semibold">Profile</a>
      </li>
     </ul>
  </div>
}