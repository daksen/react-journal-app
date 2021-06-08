import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active } = useSelector(state => state.notes);
  const [ formValues, handleInputChange, formReset ] = useForm(active);
  const { title, body } = formValues;

  const activeId = useRef(active.id);

  useEffect(() => {
    if(active.id !== activeId.current) {
      formReset(active);
      activeId.current = active.id;
    }
  }, [active, formReset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, {...formValues}));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDelete(activeId.current));
  }
  
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome tiltle"
          className="notes__title-input"
          autoComplete="off"
          value={ title }
          onChange={ handleInputChange }
        />
        <textarea
          name="body"
          placeholder="What happened today"
          className="notes__textarea"
          value={ body }
          onChange={ handleInputChange }
        />
        <div className="notes__image">
          <img 
            src={ active.url }
            alt="imagen"
          />
        </div>
      </div>
      <button
        className="btn btn-danger"
        onClick={ handleDelete }
      >
        Delete
      </button>
    </div>
  );
}
