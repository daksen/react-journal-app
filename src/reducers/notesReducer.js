import { types } from "../types/types";


const initialState = {
  notes: [],
  active: null
}

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map(
          note => note.id === action.payload.note.id
            ? action.payload.note
            : note
        )
      }
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    case types.notesLoad:
      return {
        ...state,
        notes: [ ...action.payload ]
      }
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }
    case types.notesCleaning:
      return initialState;
    default:
      return state;
  }
}
