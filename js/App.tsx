import * as React from 'react';
import {SketchCanvas} from "./sketch_canvas";
import {Box, Grid} from '@material-ui/core';

export class App extends React.Component<{},{strokes1: number[][], strokes2: number[][], user_input: ""}> {

constructor(props) {
  super(props);
  this.state = {
    strokes1:[],
    strokes2:[],
    user_input: ""
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
componentDidMount() {
  console.log("fetching sketches");
  fetch("http://localhost:5000/api/load_sketches",{
    method: 'GET'
  }).then(r => r.json())
    .then(r => {
      this.setState({
        strokes1: r['strokes1'],
        strokes2: r['strokes2']
      })
      console.log(r['z1']);
      console.log(r['z2']);
    })
    .catch(err => console.log(err))
}

handleChange(event) {
  this.setState({user_input: event.target.value});
}

handleSubmit(event) {
  window.location.reload(false);
}

render() {
    return this.state.strokes1.length? (
    <div className="sketch">
    <h1>Hello React!</h1>
      <Box paddingTop={2} paddingLeft={2} paddingRight={2}>
        <Grid container justify="center" spacing={10}>
          
          <Grid item xs={5}>
            <Box border={1} margin={1}>
            <SketchCanvas strokes={this.state.strokes1}
            sketchingComplete={() => {}}
            ></SketchCanvas> </Box>
          </Grid>      
        
          <Grid item xs={5}>
            <Box border={1} margin={1}>
            <SketchCanvas strokes={this.state.strokes2}
            sketchingComplete={() => {}}
            ></SketchCanvas> </Box>
          </Grid>
        </Grid>
      </Box>
      <form onSubmit={this.handleSubmit}>
          <label>
            Please describe the transition from sktech on the left to sketch on the right:
            <input type="text" value={this.state.user_input} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
      </form> 
    </div>
    ):(
      <span>Loading sketches...</span>
    )
  }
}

export default App;