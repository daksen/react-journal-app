import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
import placeholder from '../../assets/placeholder_600x400.svg';

export const JournalEntry = ({id, title, body, date, url}) => {
  const dispatch = useDispatch();
  const noteDate = moment(date);
  const handleNoteClick = () => {
    dispatch(activeNote(id, {title, body, date, url}));
  }
  if(!url) {
    url = placeholder
  }
  
  return (
    <div
      className="journal__entry" 
      onClick={ handleNoteClick }
    > 
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${url})`
        }}
      />
      <div className="journal__entry-body">
        <p className="journal__entry-title">
          { title }
        </p>
        <p className="journal__entry-content">
          { body }
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>{ noteDate.format('dddd') }</span>
        <h4>{ noteDate.format('Do') }</h4>
      </div>
    </div>
  );
}
