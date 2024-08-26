import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
const formField={
    universityName:'',
    startDate:'',
    endDate:'',
    degree:'',
    major:'',
    description:''

}
const Education = ({enabled}) => {
  const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
  const [experiencelist,setexperiencelist] = useState([
    formField
  ])
  const handleChange = (index,event)=>{
       const newEntries = experiencelist.slice();
       const {name,value} = event.target;
        newEntries[index][name] = value;
        setexperiencelist(newEntries)
  }
  const handleRichTextEditor=(e,name,index)=>{
    const newEntries=experiencelist.slice();
    newEntries[index][name]=e.target.value;
   
    setexperiencelist(newEntries);
}
  const AddNewExperience = ()=>{
      setexperiencelist([...experiencelist,formField])
  }
  const DeleteExperience = ()=>{
     setexperiencelist((experiencelist)=> experiencelist.slice(0,-1))
  }
useEffect(()=>{
  setresumeInfo({
    ...resumeInfo,
    education: experiencelist
})
},[experiencelist])
  return (
   <div>
     <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add your Educational experience</p>
   
    <div>
      {experiencelist.map((item,index)=>{
       return <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>University Name</label>
                            <Input name="universityName"   onChange={(event)=> handleChange(index,event)}                          />
                        </div>
                        <div>
                            <label className='text-xs'>Degree</label>
                            <Input name="degree"   onChange={(event)=> handleChange(index,event)}                          />
                        </div>
                        <div>
                            <label className='text-xs'>Major</label>
                            <Input name="major"    onChange={(event)=> handleChange(index,event)}                          />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date"  
                            name="startDate"  onChange={(event)=> handleChange(index,event)}    />
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate"   onChange={(event)=> handleChange(index,event)}   
                            
                            />
                        </div>
                        <div className='col-span-2'>
                          <RichTextEditor onRichTextChange={(event)=>handleRichTextEditor(event,'description',index)}/>
                        </div>
                    </div>
                </div>
      })}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline"  className="text-primary" onClick={AddNewExperience}> + Add More Experience</Button>
            <Button variant="outline"  className="text-primary" onClick={DeleteExperience}> - Remove</Button>

            </div>
            <Button>Save</Button>
        </div>
    </div>
    
   </div>
  )
}

export default Education
