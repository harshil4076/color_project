import React , { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar'
import { withStyles } from '@material-ui/core/styles';
import styles from './Style/PaletteStyles';
import PaletteFooter from './PaletteFooter';

class Palette extends Component{
    constructor(props){
        super(props);
        this.state = {level: 500, format: "hex"}; 
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level){
        this.setState({level});
    }
    changeFormat(val){
        this.setState({format: val})
    }
    render(){
        const { colors, paletteName, emoji, id} = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
     const colorBoxes = colors[level].map(color =>(
        <ColorBox background={color[format]} 
        name={color.name} 
        key={color.id} 
        id={color.id}
        paletteId={id}
        showFullPalette={true}/>
     ));
        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors/>
                <div className={classes.PaletteColors}>
                {colorBoxes}
                </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
               
            </div>
        )
    }
}

export default withStyles(styles)(Palette);