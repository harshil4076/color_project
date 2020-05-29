import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ColorPickerForm from './ColorPickerForm'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DraggableColorList from './DraggableColorList'
import Button from '@material-ui/core/Button'
import {arrayMove} from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav'

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display:"flex",
    alignItems:"center"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container:{
    width:"90%",
    height:"100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons:{
    width: "100%"
  },
  button:{
    width: "50%"
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor (props){
      super(props);
      this.state= {
          open: true,
          color: this.props.palettes[0].colors,
      }
      this.addNewColor = this.addNewColor.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.clearColor = this.clearColor.bind(this);
      this.addRandomColor = this.addRandomColor.bind(this)
  }
  
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };
    
    addNewColor(newColor){
 
        this.setState({color: [...this.state.color, newColor], newColorName: ""})
    }
  
    handleSubmit(newPalette){
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
     newPalette.colors = this.state.color
      this.props.savePalette(newPalette)
      this.props.history.push("/")
    }
    removeColor(colorName){
      this.setState({
        color: this.state.color.filter(color => color.name !== colorName)
      })
    }
    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({color}) => ({
        color: arrayMove(color, oldIndex, newIndex),
      }));
    };
    clearColor(){
      this.setState({color: []})
    }
    addRandomColor(){
      const allColors = this.props.palettes.map(p => p.colors).flat()
      var rand = Math.floor(Math.random() * allColors.length)
      const randomColor = allColors[rand];
      this.setState({color:[...this.state.color, randomColor]})
      console.log(allColors)
    }
   
      render() {
        const { classes, theme, maxColors, palettes } = this.props;
        const { open, color } = this.state;
        const paletteIsFull = color.length >= maxColors
    
        return (
          <div className={classes.root}>
            <PaletteFormNav open={open} 
            palettes={palettes} 
            handleSubmit={this.handleSubmit} 
            handleDrawerOpen={this.handleDrawerOpen}
            />
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              
              <Divider />
              <div className={classes.container}>
              <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
              <div className={classes.buttons}>
              <Button className={classes.button} variant='contained' color='secondary' onClick={this.clearColor}>Clear Palette</Button>
              <Button className={classes.button} disabled={paletteIsFull} variant='contained' color='primary' onClick={this.addRandomColor}>
                Random Color</Button>
              </div>
              
              <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} color={color}/>
              </div>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <DraggableColorList 
              onSortEnd={this.onSortEnd}
              color={this.state.color} 
              removeColor={this.removeColor}
              axis='xy' />
            </main>
          </div>
        );
      }
    }
    
    // NewPaletteForm.propTypes = {
    //   classes: PropTypes.object.isRequired,
    //   theme: PropTypes.object.isRequired,
    // };

export default withStyles(styles, { withTheme: true })(NewPaletteForm);