import React from 'react';

function EducationalPreview({ resumeInfo }) {
  // Default to an empty array if resumeInfo?.education is undefined
  const educationList = resumeInfo?.education || [];
  const themeColor = resumeInfo?.themeColor || '#000'; // Default theme color

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: themeColor
        }}
      >
        Education
      </h2>
      <hr style={{
        borderColor: themeColor
      }} />

      {educationList.length > 0 ? (
        educationList.map((education, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'
              style={{
                color: themeColor
              }}
            >
              {education.universityName}
            </h2>
            <h2 className='text-xs flex justify-between'>
              {education.degree} in {education.major}
              <span>{education.startDate} - {education.endDate}</span>
            </h2>
            <p className='text-xs my-2'>
              {education.description}
            </p>
          </div>
        ))
      ) : (
        <p>No education information available</p>
      )}
    </div>
  );
}

export default EducationalPreview;
