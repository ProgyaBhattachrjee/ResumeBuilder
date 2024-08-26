import React from 'react';

function SkillsPreview({ resumeInfo }) {
  // Provide a default empty array if resumeInfo?.skills is undefined
  const skills = resumeInfo?.skills || [];
  const themeColor = resumeInfo?.themeColor || '#000'; // Default theme color

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: themeColor
        }}
      >
        Skills
      </h2>
      <hr style={{
        borderColor: themeColor
      }} />

      <div className='grid grid-cols-1 gap-3 my-4'>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div key={index} className='flex items-center justify-between'>
              <h2 className='text-xs'>{skill.name}</h2>
              <div className='flex-1 ml-2 bg-gray-200 h-2'>
                <div className='h-full'
                  style={{
                    backgroundColor: themeColor,
                    width: `${skill.rating}%`
                  }}
                >
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No skills available</p>
        )}
      </div>
    </div>
  );
}

export default SkillsPreview;
