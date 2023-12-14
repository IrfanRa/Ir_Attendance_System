import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
 

const Admin = async () => {
  const {getPermission } = getKindeServerSession();
  const isAdmin = await getPermission(process.env.admin)
  // console.log("isAdmin:", isAdmin);
  
  
  if (!isAdmin.isGranted) {
    redirect('/profile')
  } 
  


  return (
    <div className='text-center font-bold text-xl'>Admin
         {isAdmin.isGranted && (
        <p className='text-lg font-semibold'>
          Allow to manage user accounts.
        </p>
      )}

    
    </div>
    
  );
};

export default Admin