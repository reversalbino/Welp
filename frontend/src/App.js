import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllBusinesses from './components/AllBusinesses';

function App() {
  const dispatch = useDispatch();
  const questions = [' hungry? ', ' bored? ', ' adventurous? '];
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [question, setQuestion] = useState(questions[counter]);
  const [homepage, showHomepage] = useState(true);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const changeQuestion = setInterval(() => {
      setQuestion(questions[counter === 2 ? 0 : counter + 1]);
      setCounter(counter === 2 ? 0 : counter + 1);
    }, 2000);

    return () => clearInterval(changeQuestion);
  }, [question, counter])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
          <div id='homepage'>
            <div id='homepage-questions'>
              <p>Feeling{question} </p>
            </div>
            <div id='homepage-answer'>
              <p>Welcome to Welp</p>
            </div>
            <button id='see-all-businesses-homepage'><Link to='/business/all'><p>See all businesses</p></Link></button>
          </div>
          </Route>
          <Route path={['/business/all', '/business/:id']}>
            <AllBusinesses />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
