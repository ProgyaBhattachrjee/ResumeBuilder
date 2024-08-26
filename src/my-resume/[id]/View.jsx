import Haeder from '@/components/custom/Haeder'
import PreviewSection from '@/Dashboard/resume/components/PreviewSection'
import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useReactToPrint } from 'react-to-print'

const View = () => {
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: 'Resume',
  });

  return (
    <div>
      <Haeder/>
      <h2 className='text-center text-2xl font-medium m-5'>
        Congrats! Your Resume is ready!
      </h2>
      <p className='text-center text-gray-400'>
        Now you are ready to download your resume and you can share a unique resume URL with your friends and family.
      </p>
      <div className='flex justify-center'>
        <Button onClick={handlePrint} className="text-primary">Download Resume as PDF</Button>
      </div>
      {/* <div style={{ display: 'none' }}>
        <PreviewSection ref={previewRef} />
      </div> */}
    </div>
  )
}

export default View
