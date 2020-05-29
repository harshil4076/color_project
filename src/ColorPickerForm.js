import React , { Component } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color';
const styles = {
    picker:{
        width: "100% !important",
        marginTop: "2rem"
    },
    addColor:{
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput:{
        width: "100%",
        height:"70px",

    }
}
class ColorPickerForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newColorName: "",
            currentColor: "teal"
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique", value =>{
           return this.props.color.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
                              )
           });
           ValidatorForm.addValidationRule("isColorUnique", value =>{
            return this.props.color.every(
         ({ color }) => color!== this.state.currentColor
                               )
            });
      }
    updateCurrentColor(newColor){
        this.setState({currentColor: newColor.hex})
    }
    handleChange(evt){
        this.setState({
          [evt.target.name] : evt.target.value
  
        })
      }
      handleSubmit(){
        const newColor = {
            color:this.state.currentColor , 
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({newColorName:""})
      }
    render(){
        const {paletteIsFull, classes} = this.props
        const {newColorName, currentColor} = this.state;
        return (
            <div>
<ChromePicker color={currentColor} 
onChangeComplete={this.updateCurrentColor}
className={classes.picker}/>
              <ValidatorForm onSubmit={this.handleSubmit}>
                  <TextValidator value={newColorName} 
                  className={classes.colorNameInput}
                  variant='filled'
                  placeholder='Color Name'
                  margin='normal'
                  name="newColorName"
                  onChange={this.handleChange}
                  validators={['required','isColorNameUnique','isColorUnique']}
                  errorMessages={['Enter a Color Name','Color name must be unique','Color already Taken']}
                  />
              <Button 
              className={classes.addColor}
              disabled={paletteIsFull} 
              type="submit" 
              variant = "contained" 
              color='primary' 
              style={{backgroundColor: paletteIsFull? "grey" : currentColor }}>
                {paletteIsFull? "Palette Full" : "Add Color"}
                </Button>
                   
              </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);