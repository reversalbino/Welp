import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllBusinesses from './components/AllBusinesses';
import SingleBusiness from "./components/SingleBusiness";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path={['/business/all', '/business/:id']}>
            <AllBusinesses />
            {/* <Switch>
              <Route path='/business/:id'>
                <SingleBusiness />
              </Route>
            </Switch> */}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
