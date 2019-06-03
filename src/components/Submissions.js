import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styling = theme => ({
   resultBox: {
      maxWidth: 500,
      textAlign: 'center',
      margin: '0px auto auto auto',
      backgroundColor: 'lightgrey'
   },
   blkBorder: {
      border: '2px solid black'
   }
})

class Submissions extends Component {
   
   componentDidMount(){
      this.getResults()
      this.runInterval = setInterval(() => this.getResults(),2000) 
   }
   
   componentWillUnmount(){
      this.clearInterval(this.runInterval)
   }

   getResults(){
      this.props.dispatch({type: 'GET_RESULTS'})
   }
 
   render() {
      const {classes} = this.props
      let resultsArray = this.props && this.props.resultReducer.length > 0 ?
         this.props.resultReducer.map( sub => 
            <p key={sub.equation_id}>{sub.equation}</p>
         ) : <span></span>

      return (
         <div>
            <h3>User Submissions</h3>
            <div className={`${classes.resultBox} ${classes.blkBorder}`}>
               {resultsArray}
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   resultReducer: state.resultReducer,
});

export default connect(mapStateToProps)(withStyles(styling)(Submissions));