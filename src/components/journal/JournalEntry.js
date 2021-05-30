import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div 
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg)'
        }}
      />

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          Un nuevo día
        </p>
        <p className="journal__entry-content">
          Ea magna elit est mollit eu veniam ipsum proident laborum. Fugiat anim aliqua duis reprehenderit qui. Voluptate eu aliquip ut ea officia reprehenderit eu dolore magna ipsum amet ut. Enim sunt ullamco voluptate labore consequat. Aliquip Lorem duis velit officia. Reprehenderit sint tempor ut sint aliqua laboris pariatur et. Fugiat duis aliquip consectetur quis consequat velit tempor tempor cupidatat in eiusmod.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
