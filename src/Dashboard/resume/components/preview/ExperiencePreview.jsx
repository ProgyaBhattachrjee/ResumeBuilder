import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  // Define default values if resumeInfo or its properties are undefined
  const experienceList = resumeInfo?. experience || [];
  const themeColor = resumeInfo?.themeColor || '#000';
  console.log(experienceList)
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: themeColor
        }}
      >
        Professional Experience
      </h2>
      <hr style={{
        borderColor: themeColor
      }} />

      {experienceList.length > 0 ? (
        experienceList.map(( experience, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'
              style={{
                color: themeColor
              }}
            >
              { experience.title}
            </h2>
            <h2 className='text-xs flex justify-between'>
              {experience.companyName}, {experience.city}, {experience.state}
              <span>
                {experience.startDate} To {experience.currentlyWorking ? 'Present' : experience.endDate}
              </span>
            </h2>
            <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: experience.workSummery }} />
          </div>
        ))
      ) : (
        <p>No experience information available</p>
      )}
    </div>
  );
}

export default ExperiencePreview;
