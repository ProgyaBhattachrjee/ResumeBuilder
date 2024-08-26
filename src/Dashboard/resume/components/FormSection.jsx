import React, { useContext } from 'react'
import PersonalDetails from './form/PersonalDetails'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import Summery from './form/Summery'
import Experience from './form/Experience'
import Education from './form/Education'
import Skills from './form/Skill'
import { Navigate, useParams } from 'react-router-dom'
import ThemeColor from './Theme'

const FormSection = () => {
  const [activeformIndex,setIndex] = useState(1);
  const [enabled,seEnable] = useState(true);
  const {resumeInfo,setresumeInfo} = useContext(ResumeInfoContext);
  const {ResumeId} = useParams();
  return (
    <div className='m-10'>
    <div className='flex justify-between items-center mb-4'>
      <ThemeColor/>
      <div className='flex gap-4'>
       {activeformIndex > 1 &&  <Button  size="sm" onClick={()=> setIndex(activeformIndex-1)}> <ArrowLeft/> Prev</Button>}
        <Button disabled={!enabled}  size="sm"  onClick={()=> setIndex(activeformIndex+1)}>Next <ArrowRight/></Button>
      </div>
    </div>
    {activeformIndex == 1?   <PersonalDetails enabled={(v)=> seEnable(v)}/>:
    activeformIndex == 2?   <Summery  enabled={(v)=> seEnable(v)}/>:activeformIndex == 3?   <Experience enabled={(v)=> seEnable(v)}/>
    :activeformIndex == 4?  <Education enabled={(v)=>seEnable(v)}/>:
    activeformIndex == 5 ? <Skills enabled={(v)=>seEnable(v)} />:
    activeformIndex == 6 ?   <Navigate to={'/my-resume/'+ResumeId+'/view'}/>
    : null}
    
    </div>
  )
}

export default FormSection
