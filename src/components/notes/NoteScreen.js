import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input 
          type="text"
          placeholder="Some awesome tiltle"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea 
          placeholder="What happened today"
          className="notes__textarea"
        />
        <div className="notes__image">
          <img 
            src="https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  )
}
