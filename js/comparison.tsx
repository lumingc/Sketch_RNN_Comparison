import * as React from 'react';
import {SketchCanvas} from "./sketch_canvas";
import {Box, Grid, TextField, Button, Typography, withStyles, StyledComponentProps} from '@material-ui/core';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(1),
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    alignItems: 'right'
  }
});

class Comparison extends React.Component<{turkSubmitTo: string, assignmentId: string, workerId: string, hitId: string, endFunc:() => void} & StyledComponentProps,{strokes1: number[][], strokes2: number[][], user_input: ""}> {
  strokes1_z: any;
  strokes2_z: any;
  formRef: React.RefObject<HTMLFormElement>;
  
  constructor(props) {
  super(props);
  this.state = {
    strokes1:[],
    strokes2:[],
    user_input: ""
  }
  this.formRef = React.createRef();
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
componentDidMount() {
  console.log("fetching sketches");
  fetch("https://127.0.0.1:5000/api/load_sketches",{
    method: 'GET'
  }).then(r => r.json())
    .then(r => {
      this.setState({
        strokes1: r['strokes1'],
        strokes2: r['strokes2']
      })
      this.strokes1_z = r['z1']
      this.strokes2_z = r['z2']
    })
    .catch(err => console.log(err))
}

handleChange(event) {
  this.setState({user_input: event.target.value});
}

async handleSubmit(event) {
  event.preventDefault();
  var data = {};
  data["sketch1_strokes"] = this.state.strokes1;
  data["sketch1_z"] = this.strokes1_z;
  data["sketch2_strokes"] = this.state.strokes2;
  data["sketch2_z"] =  this.strokes2_z;
  data["user_input"] = this.state.user_input;
  await fetch( "https://127.0.0.1:5000/api/inputs", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  this.formRef.current!.submit();
  this.props.endFunc();
}

render() {
    const { classes } = this.props;
    return this.state.strokes1.length? (
    <div className={classes!.paper}>
    <Box paddingTop={2} paddingLeft={5} paddingRight={5}>
      <Typography variant="h4" display="block" color='initial'>
        How do the two sketches below differ?
      </Typography>
    </Box>
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
      <Box paddingTop={2} paddingLeft={5} paddingRight={5}>
        <Typography variant="body1" display="block" color='initial'>
        Please describe the transition from the sketch on the left to the sketch on the right (eg. "Make the leaves of a tree taller")
        </Typography>
        <form className={classes!.form}>
          <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                onChange={this.handleChange}
              />
          <Button className={classes!.submit}
            type="submit"
            variant="contained"
            color="primary"
            style={{justifyContent: 'right'}}
            onClick={(event) => {this.handleSubmit(event);}}
          >Submit</Button>
        </form> 
      </Box>
      <form id="amazon-form" action={this.props.turkSubmitTo + "/mturk/externalSubmit"} method="POST" ref={this.formRef}>
          <input type="hidden" id="assignmentId" value={this.props.assignmentId} name="assignmentId"/>
          <input type="hidden" id="workerId" value={this.props.workerId} name="workerId"/>
      </form>
    </div>
    ):(
      <span>Loading sketches...</span>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Comparison);