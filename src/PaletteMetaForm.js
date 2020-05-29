import React , {Component} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component{
    
      constructor(props){
          super(props);
          this.state = {
            stage: "form",
            newPaletteName: "" 
          }
          this.handleChange = this.handleChange.bind(this);                           
          this.showEmojiPicker = this.showEmojiPicker.bind(this);                           
          this.savePalette = this.savePalette.bind(this)
      }
      componentDidMount(){
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>{
            return this.props.palettes.every(
         ({ paletteName }) => paletteName.toLowerCase()!== value.toLowerCase()
                               )
            });
    }
    handleChange(evt){
        this.setState({
          [evt.target.name] : evt.target.value
    
        })
      }
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      showEmojiPicker(){
        this.setState({stage: "emoji"})
      }
    savePalette(emoji){
      const newPalette = {paletteName: this.state.newPaletteName, emoji: emoji.native}
      this.props.handleSubmit(newPalette)
    }
    render() {
        const { newPaletteName } = this.state
        const {handleSubmit, hideForm} = this.props

        return (
          <div>
            <Dialog open = {this.state.stage === "emoji"}
                          onClose={hideForm}>
            <Picker onSelect={this.savePalette} title="Pick a palette emoji" />
            </Dialog>
            <Dialog
              open={this.state.stage === "form"}
              onClose={hideForm}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
              <ValidatorForm onSubmit={this.showEmojiPicker}>

              <DialogContent>
                <DialogContentText>
                  Please Enter A name for Palette. Make sure it is Unique
                </DialogContentText>
                <TextValidator
                 label="Palette name" 
                 value={newPaletteName} 
                 fullWidth
                 margin='normal'
                 name="newPaletteName"
                 onChange={this.handleChange}
                 validators={['required','isPaletteNameUnique']}
                 errorMessages={['name required','name already taken']}
                 />
                
              </DialogContent>
              <DialogActions>
                <Button onClick={hideForm} color="primary">
                  Cancel
                </Button>
                <Button type="submit" variant='contained' color='primary'>Save Palette</Button>

              </DialogActions>
              </ValidatorForm>

            </Dialog>
            </div>
        );
      }
}

export default PaletteMetaForm;