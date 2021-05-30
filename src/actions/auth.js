import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import { types } from "../types/types";


export const registerWithEmailPassword = (name, email, password) => {
  return(dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  }
}

export const loginWithEmailPassword = (email, password) => {
  return(dispatch) => {
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        dispatch(finishLoading());
        Swal.fire('Error', error.message, 'error');
      });
  }
}

export const loginWithGoogle = () => {
  return(dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  }
}

export const startLogout = () => {
  return(dispatch) => {
    firebase.auth().signOut().then(() => {
      dispatch(logout());
    }).catch((error) => {
      Swal.fire('Error', error.message, 'error');
    });
  }
}

export const logout = () => ({
  type: types.logout
});

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid: uid,
    displayName: displayName
  }
});

