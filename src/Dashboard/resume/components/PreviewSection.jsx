import React from 'react'
import { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetails from './preview/PersonalDetails';
import SummeryPreview from './preview/Summery';
import EducationalPreview from './preview/EducationalPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import SkillsPreview from './preview/Skills';

const PreviewSection = () => {
    const {resumeInfo,setresumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
     style={{
        borderColor:resumeInfo?.themeColor
    }}>
      <PersonalDetails resumeInfo={resumeInfo}/>
      <SummeryPreview resumeInfo={resumeInfo}/>
       <ExperiencePreview resumeInfo={resumeInfo}/>
       <EducationalPreview resumeInfo={resumeInfo}/>
       <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default PreviewSection
