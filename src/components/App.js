import React, {Component} from 'react';
import Calculator from './Calculator';
import Submissions from './Submissions';
import './App.css';

class App extends Component {
   
   
   
   
   render(){
      return(
         <div className="App">
            <Calculator></Calculator>
            <Submissions></Submissions>
         </div>
      );
   }
}

export default App;
