import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
const ResumeItems = ({resume}) => {
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
      <div className=' bg-secondary  h-[240px] p-14 py-24  mt-10 rounded-lg hover:h-105 transition-all hover:shadow-lg border-t-purple-950'>
          <Notebook/>
      </div>
      <h2 className='text-center my-1'>{resume.Title}</h2>
    </Link>
  )
}

export default ResumeItems
