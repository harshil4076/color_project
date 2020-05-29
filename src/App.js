import React , { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import PaletteList from './PaletteList';
import Palette from './Palette';
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import SingleColorPlatette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {palette: seedColors}
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this)
  }
  findPalette(id){
     return this.state.palette.find(function(palette){
      return palette.id === id;
    })

  }
  savePalette(newPalette){
  this.setState({palette:[...this.state.palette, newPalette]})
  }
  render(){
    return (
      <Switch>
        <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palette} />} />
        <Route exact path="/" render={(routeProps)=> <PaletteList palettes={this.state.palette} {...routeProps} />} />
        <Route exact path="/palette/:id" 
        render={(routeProps) => <Palette 
            palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>} />
        <Route exact path="/palette/:paletteId/:colorId" 
        render={(routeProps) => <SingleColorPlatette 
        palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
        colorId={routeProps.match.params.colorId}  
              />} 
         />
      </Switch>
  
      // <div className="">
      //  <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
 
}

export default App;
