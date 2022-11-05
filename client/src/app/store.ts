import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../features/reducers';

const initialState = {};

// state model:
// { auth?: any; 
//   errors?: { msg: any; status: any; } | undefined;
//   messages?: any; 
//   portfolios?: { user?: { username: string; } | undefined; 
//                  portfolios?: { id: string; tickers?: string[] | undefined; }[] | undefined; 
//                } | { ...; } |
// undefined; }

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
