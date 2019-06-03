import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styling = theme => ({
   inlineBlock: {
      display: 'inlineBlock',
   },
   input: {
      width: 350,
      textAlign: 'center'
   },
   buttonNum: {
      backgroundColor: 'lightgrey',
      width: 80,
      border: '1px solid black',
      margin: '2px'
   },
   buttonOp: {
      backgroundColor: 'palegoldenrod',
      width: 80,
      border: '1px solid black',
      margin: '2px'
   },
   btnContainer: {
      maxWidth: 350,
      margin: '10px auto 50px auto'
   }
})

class Calculator extends Component {
   
   state = {
      num1: '',
      num2: '',
      operator: ''
   }

   numberClick = (num) => {
      return (event) => {
         let currentNum1 = this.state.num1
         let currentNum2 = this.state.num2
         if(this.state.operator === ''){
            this.setState({num1: currentNum1 += num})
         }
         else{
            this.setState({num2: currentNum2 += num})
         }
      }
   }

   operationClick = (op) => {
      return (event) => {
         this.setState({operator: op})
      }
   }

   submitEquation = () => {
      this.props.dispatch({type: 'SUBMIT', payload: this.state})
      this.clearInput()
   }

   clearInput = () => {
      this.setState({
         num1: '',
         num2: '',
         operator: ''
      })
   }
 
   render() {
      const {classes} = this.props
      
      return (
         <div>
            <h2>Live Calc</h2>
            <TextField
               id="input-display"
               className={classes.input}
               value={`${this.state.num1} ${this.state.operator} ${this.state.num2}`}
               margin="normal"
               width = "700px"
               variant = 'outlined'
               InputProps={{ readOnly: true }}
            />
            <div className={classes.btnContainer}>
               <div className={classes.inlineBlock}>
                  <Button onClick={this.numberClick('7')} className={classes.buttonNum}>7</Button>
                  <Button onClick={this.numberClick('8')} className={classes.buttonNum}>8</Button>
                  <Button onClick={this.numberClick('9')} className={classes.buttonNum}>9</Button>
                  <Button onClick={this.operationClick('+')} className={classes.buttonOp}>+</Button>
               </div>
               <div className={classes.inlineBlock}>
                  <Button onClick={this.numberClick('4')} className={classes.buttonNum}>4</Button>
                  <Button onClick={this.numberClick('5')} className={classes.buttonNum}>5</Button>
                  <Button onClick={this.numberClick('6')}className={classes.buttonNum}>6</Button>
                  <Button onClick={this.operationClick('-')} className={classes.buttonOp}>-</Button>
               </div>
               <div className={classes.inlineBlock}>
                  <Button onClick={this.numberClick('1')} className={classes.buttonNum}>1</Button>
                  <Button onClick={this.numberClick('2')} className={classes.buttonNum}>2</Button>
                  <Button onClick={this.numberClick('3')} className={classes.buttonNum}>3</Button>
                  <Button onClick={this.operationClick('*')} className={classes.buttonOp}>*</Button>
               </div>
               <div className={classes.inlineBlock}>                
                  <Button onClick={this.numberClick('.')} className={classes.buttonOp}>.</Button>
                  <Button onClick={this.numberClick('0')} className={classes.buttonNum}>0</Button>
                  <Button onClick={this.submitEquation} className={classes.buttonOp}>=</Button>
                  <Button onClick={this.operationClick('/')} className={classes.buttonOp}>/</Button>
                  <Button onClick={this.clearInput} className={classes.buttonOp}>C</Button>
               </div>
            </div>
       </div>
      )
   }
}

const mapStateToProps = state => ({
   //userReducer: state.userReducer,
});

export default connect(mapStateToProps)(withStyles(styling)(Calculator));