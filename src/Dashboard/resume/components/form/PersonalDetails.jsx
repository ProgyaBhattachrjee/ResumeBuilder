import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApI from '../../../../../servie/GlobalApI';
import { toast } from 'sonner';

const PersonalDetails = ({ enabled }) => {
    const params = useParams();
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("---", resumeInfo);
    }, [resumeInfo]);

    const handleInputChange = (e) => {
        enabled(false);
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
        setresumeInfo({
            ...resumeInfo,
            [name]: value
        });
    };

    const onsave = (e) => {
        e.preventDefault();
        setLoading(true);
        const resumeId = params.ResumeId;  // Ensure this is correct
        if (!resumeId) {
            console.error("Resume ID is missing or undefined");
            setLoading(false);
            return;
        }

        const data = {
            data: formData
        };
        GlobalApI.UpdateResumeDetails(resumeId, data)
            .then((resp) => {
                console.log(resp);
                enabled(true);  // Check if you need to pass `true` or `false`
                setLoading(false);
                toast.success("Value Updated")
            })
            .catch((error) => {
                console.error("Error updating resume details:", error);
                setLoading(false);
            });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get Started with basic Information</p>
            <form onSubmit={onsave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName"  defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address"defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone"defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" defaultValue={resumeInfo?.email}required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetails;
