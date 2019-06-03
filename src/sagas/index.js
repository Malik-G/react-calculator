import axios from 'axios';
import { all } from 'redux-saga/effects';
import { put, call, takeLatest } from 'redux-saga/effects';

//this function directs the dispatches that are called from the components
function* catchDispatch() {
   yield takeLatest('GET_RESULTS', getResults);
   yield takeLatest('SUBMIT', submit);
}

function* getResults(action) {
   try {
       const response = yield call(axios.get, `/api/submissions/get-results`);
       yield put({type: 'RESULTS', payload: response.data});
   }
   catch (error) {
       console.log(`GET request to "/api/submissions/get-results" UNSUCCESSFUL: `, error);
   }
}

function* submit(action) {
   try {
       yield call(axios.post, `/api/submissions/submit`, action.payload);
       yield put({type: 'GET_RESULTS'});
   }
   catch (error) {
       console.log(`POST request to "/api/submissions/submit" UNSUCCESSFUL: `, error);
   }
}

// rootSaga is the primary saga
// It bundles up all of the other sagas then is imported into sagas/index.js
function* rootSaga() {
   yield all([
      catchDispatch()
   ]);
}

export default rootSaga