
import './App.css';

import keplerGlReducer from 'kepler.gl/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import { Provider } from 'react-redux';
import { KeplerGl } from 'kepler.gl/dist/components';
// import { addDataToMap } from 'kepler.gl/actions';
// import useSWR from 'swr';


const reducers =  combineReducers({
  keplerGl: keplerGlReducer
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
