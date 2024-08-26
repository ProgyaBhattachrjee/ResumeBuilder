import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import PreviewSection from '../../components/PreviewSection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

const EditResume = () => {
    const params = useParams();
    const [resumeInfo,setresumeInfo] = useState([]);
    useEffect(()=>{
        setresumeInfo(dummy)
        console.log(resumeInfo)
    },[])
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setresumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 g-10'>
     <FormSection/>
     <PreviewSection/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
