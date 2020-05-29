import React , {Component} from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import PaletteFooter from './PaletteFooter'
import { withStyles } from '@material-ui/core/styles';
import ColorBox from './ColorBox';
import styles from './Style/PaletteStyles';


class SingleColorPalette extends Component {
    constructor(props){
        super(props);
       this._shades = this.gathetShades(this.props.palette, this.props.colorId);
       this.state = {format: "hex"};
       this.changeFormat = this.changeFormat.bind(this);
    }
    gathetShades(palette, colorToFilterBy){
        //return all shades of given color
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors){
            shades = shades.concat(
            allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        
        return shades.slice(1);
    }
    changeFormat(val){
        this.setState({format: val})
    }
    render(){
        const {classes} = this.props;
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const colorBox = this._shades.map(color => (
            <ColorBox key = {color.name} name={color.name} background={color[format]} showFullPalette={false}/>
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.PaletteColors}>
            {colorBox}
            <div className={classes.goBack}>
                <Link to={`/palette/${id}`}>GO BACK</Link>
            </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>

        )
    }
}

export default withStyles(styles)(SingleColorPalette);