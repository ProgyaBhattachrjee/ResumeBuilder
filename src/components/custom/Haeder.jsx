import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
const Haeder = () => {
    const { user,isLoaded, isSignedIn } = useUser();
  return (
<div className='p-3 x-3 flex justify-between shadow-md'>
    <img src="./logo.svg" alt="logo" />

    {isSignedIn ? <div className='flex item-center gap-10'>
    <h1 className='m-2 font-semibold'>Welcome!</h1>
          <UserButton/>
          <Button variant="ghost"> <Link to="/" >Home</Link></Button>
        <Button variant='outline'> <Link to="/dashboard" >Dashboard</Link></Button>
       
    </div> :  <Button> <Link to="/auth/sign-in">Get Started</Link></Button>}
    
    </div>
  )
}

export default Haeder
