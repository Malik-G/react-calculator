import { combineReducers } from 'redux';

//called from sagas/index.js
const resultReducer = (state=[], action) => {
   switch(action.type){
      case 'RESULTS':
         return action.payload
      default:
         return state
   }
}

// These are what get referred to when using 'state' inside of the 'mapStateToProps' variable in the components
const rootReducer = combineReducers({
   resultReducer
});

export default rootReducer;