import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApI from '../../../../../servie/GlobalApI'
import { Brain, LoaderCircle } from 'lucide-react'; // Make sure you have this package installed
import { toast } from 'sonner'; // Make sure you have this package installed

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

function Summery({ enabled }) {
    const params = useParams();
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

    useEffect(() => {
        if (resumeInfo?.summery) {
            setSummery(resumeInfo.summery);
        }
    }, [resumeInfo]);

    const handleInputChange = (e) => {
        setSummery(e.target.value);
        setresumeInfo({
            ...resumeInfo,
            summery: e.target.value
        });
    };

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
        console.log(PROMPT);

        try {
            const result = await AIChatSession.sendMessage(PROMPT); // Ensure AIChatSession is properly imported/defined
            const parsedResult = JSON.parse(result.response.text());
            console.log(parsedResult);
            setAiGenerateSummeryList(parsedResult);
        } catch (error) {
            console.error("Error generating summary from AI:", error);
        } finally {
            setLoading(false);
        }
    };

    const onSave = (e) => {
        
        e.preventDefault();
        setLoading(true);
          console.log(resumeInfo)
        const resumeId = params.ResumeId; // Ensure this is correct
        if (!resumeId) {
            console.error("Resume ID is missing or undefined");
            setLoading(false);
            return;
        }

        const data = {
            data: {
                summery: summery
            }
        };

        GlobalApI.UpdateResumeDetails(resumeId, data)
            .then((resp) => {
                console.log(resp);
                enabled(true);
                setLoading(false);
                toast.success("Details updated");
            })
            .catch((error) => {
                console.error("Error updating resume details:", error);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        
                    </div>
                    <Textarea 
                        className="mt-5" 
                        required
                        value={summery}
                        onChange={handleInputChange}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList.length > 0 && (
                <div className='my-5'>
                    <h2 className='font-bold text-lg'>Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => setSummery(item?.summary)}
                            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summery;
