import React, { useEffect } from 'react';
// import './App.css';

import keplerGlReducer from 'kepler.gl/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import { Provider, useDispatch } from 'react-redux';
import { KeplerGl } from 'kepler.gl/dist/components';
import { addDataToMap } from 'kepler.gl/actions';
import useSWR from 'swr';


const reducers =  combineReducers({
  keplerGl: keplerGlReducer,
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  )
}

export default App;

function Map() {
  const dispatch = useDispatch();

  // useSWR is a hook for loading async data

  const { data } = useSWR("covid", async () => {
    const response = await fetch("https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json")
    const data = await response.json();
    return data;
  });

  useEffect(() => {
    if (data) {
      dispatch(addDataToMap({
        datasets: {
          info: {
            label: "COVID-19 Data",
            id: "covid19"
          },
          data
        },
        option: {
          centerMap: true,
          readOnly: false
        },
        config: {}
      })
    )
    }
  }, [ dispatch, data ]);

  return (
    <KeplerGl 
      id="covid" 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API} 
      width={window.innerWidth}
      height={window.innerHeight}
      store={store}
    />
  )
}
