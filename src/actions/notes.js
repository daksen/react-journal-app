import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";
import { types } from "../types/types";


export const startAddNote = () => {
  return async(dispatch, selector) => {
    const uid = selector().auth.uid;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }
    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(startSetNotes(uid));
    dispatch(activeNote(docRef.id, newNote));
  }
}

export const startSetNotes = (uid) => {
  return async(dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
});

export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload: {
    ...note,
    id
  }
});

export const startUploading = (file) => {
  return async(dispatch, selector) => {
    const { active } = selector().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const fileUrl = await fileUpload(file);
    active.url = fileUrl;
    dispatch(startSaveNote(active));
    Swal.close();
  }
}

export const startSaveNote = (note) => {
  return async(dispatch, selector) => {
    const { uid } = selector().auth;
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    await db.doc(`${ uid }/journal/notes/${ note.id }`).update(noteToFireStore);
    dispatch(refreshNote(note.id, noteToFireStore));
    Swal.fire("Saved", note.title, "success");
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    note: {
      ...note,
      id
    }
  }
});

export const startDelete = (id) => {
  return async(dispatch, selector) => {
    const { uid } = selector().auth;
    await db.doc(`${ uid }/journal/notes/${ id }`).delete();
    dispatch(deleteNote(id));
  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
});

export const notesLogout = () => ({
  type: types.notesCleaning
});