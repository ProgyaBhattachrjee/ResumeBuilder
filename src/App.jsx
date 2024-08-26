import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button } from './components/ui/button';
import Haeder from "./components/custom/Haeder"
import './App.css';
import { Toaster } from 'sonner';

function App() {
  const { user,isLoaded, isSignedIn } = useUser();
    if(!user&&!isSignedIn&&isLoaded){
      return <Navigate to={"/auth/sign-in"}/>
    }
 
  return (
    <div>
    <Haeder/>
      <Outlet />
      <Toaster/>
    </div>
  );
}

export default App;
