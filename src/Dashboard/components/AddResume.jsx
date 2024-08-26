import React, { useState } from 'react';
import { Loader2, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { v4 as uuid4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import GlobalApI from '../../../servie/GlobalApI'
import { useNavigate } from 'react-router-dom';

const AddResume = () => {
    const [opendialog, setDialog] = useState(false);
    const [resumeTitle, setTitle] = useState("");
    const { user } = useUser();
     const [loading,setloading] = useState(false);
     const navigation = useNavigate();
    const createResume = async () => {
       setloading(true)
        const uuid = uuid4();
        const data = {
            data: {
                Title: resumeTitle,
                ResumeId: uuid,
                UserName: user?.fullName,
                userEmail: user?.primaryEmailAddress?.emailAddress,
            },
        };

        try {
            const response = await GlobalApI.CreateNewResume(data);
            if(response){
              setloading(false);
              navigation('/dashboard/resume/'+response.data.data.documentId+'/edit')
            }
            console.log('Resume created successfully:', response);
        } catch (error) {
            console.error('Error creating resume:', error);
        } finally {
            setDialog(false); 
            window.location.reload();
        }
    };

    return (
        <div>
            <div
                onClick={() => setDialog(true)}
                className='p-14 py-24 border items flex justify-center bg-secondary mt-10 rounded-lg h-[240px] hover:scale-105 transition-all hover:shadow cursor-pointer'>
                <PlusSquare />
            </div>
          
            <Dialog open={opendialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new resume.
                            <Input
                                className="mt-2"
                                placeholder="ex- Resume A"
                                value={resumeTitle}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setDialog(false)} variant="ghost">Cancel</Button>
                            <Button disabled={!resumeTitle} onClick={createResume}>  {loading ? <Loader2></Loader2>: <h1>Create</h1>}</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddResume;
