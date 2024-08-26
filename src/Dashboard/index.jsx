import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import GlobalApI from '../../servie/GlobalApI';
import { useUser } from '@clerk/clerk-react';
import ResumeItems from './components/ResumeItems';
import { Loader, LoaderCircleIcon } from 'lucide-react';

const Dashboar = () => {
  const { user } = useUser();
  const [resumelist, setResumelist] = useState({ data: [], meta: {} });

  const GetResumeList = async () => {
    try {
      if (user?.primaryEmailAddress?.emailAddress) {
        const res = await GlobalApI.getUseResumes(user.primaryEmailAddress.emailAddress);
        console.log("API Response:", res.data);
        setResumelist(res.data);
      }
    } catch (error) {
      console.error("Error fetching resume list:", error);
    }
  };

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  useEffect(() => {
    console.log("Resumelist updated:", resumelist);
  }, [resumelist]);

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h1 className='font-bold text-3xl'>My Resume</h1>
      <p>Start creating AI Resume</p>
      <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-5 gap-3'>
        <AddResume />
        {resumelist.data.length > 0 ? (
        resumelist.data.map((resume, index) => (
          <ResumeItems key={index} resume={resume} />
        ))
      ) : (
      <div className='flext justify-center h-[240px] p-14 py-24 mt-10'>
        <Loader/>
      </div>
      )}
      </div>
    </div>
  );
};

export default Dashboar;
