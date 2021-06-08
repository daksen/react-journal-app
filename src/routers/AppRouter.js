import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PlubicRoute } from './PublicRoute';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { startSetNotes } from '../actions/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user) => {
      if(user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startSetNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [ dispatch, setChecking, setIsLoggedIn ]);

  if(checking) {
    return(
      <h1>Loading...</h1>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PlubicRoute 
            path="/auth"
            component={ AuthRouter }
            isLoggedIn={ isLoggedIn }
          />
          <PrivateRoute 
            exact
            path="/"
            component={ JournalScreen }
            isLoggedIn={ isLoggedIn }
          />
        </Switch>
      </div>
    </Router>
  );
}
