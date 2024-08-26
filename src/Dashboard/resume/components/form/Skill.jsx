import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

import GlobalApI from "../../../../../servie/GlobalApI"
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
function Skills() {

    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeId}=useParams();

    const [loading,setLoading]=useState(false);
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
   
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
      },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
        rating:0 
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{

     

       
    }

    useEffect(()=>{
        
        setresumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
    {skillsList.map((item, index) => (
        <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
            <div>
                <label className='text-xs'>Name</label>
                <Input
                    className="w-full"
                    value={item.name}  // Use value instead of defaultValue
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
            </div>
            <Rating
                style={{ maxWidth: 100, color: '#f39c12' }} 
                value={item.rating / 20}  // Convert back to scale used by Rating if needed
                onChange={(v) => handleChange(index, 'rating', v * 20)}  // Update the rating
            />
        </div>
    ))}
</div>

    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
            <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Skills