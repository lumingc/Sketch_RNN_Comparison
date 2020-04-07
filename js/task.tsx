import * as React from 'react';
import Comparison from './comparison'; 
import { Container, Box, Typography, Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import qs from 'querystringify';
import { Rules } from './rules';
import { withRouter } from 'react-router';


class Task extends React.Component<{} & RouteComponentProps, {stage: string, assignmentId: string, turkSubmitTo: string, workerId: string, hitId: string}> {
    constructor(props) {
        super(props);
        
        var qparams = qs.parse(this.props.location.search);
        var ai = qparams.assignmentId || 'test';
        var tst = qparams.turkSubmitTo || 'test';
        var wi = qparams.workerId || 'test';
        var hi = qparams.hitId || 'test';

        if (ai == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            ai = "preview_" + qparams.workerId + Math.round(Date.now()).toString() + '_' + Math.floor(Math.random() * Math.floor(1000000)).toString();
              
        }

        this.state = {
            stage: "rules",
            assignmentId: ai,
            turkSubmitTo: tst,
            workerId: wi,
            hitId: hi
        };
    }

    render() {
        return (
            <Container maxWidth="lg">
                <Box paddingTop={3} height="100%">
                    {this.state.stage == "rules" &&
                        <Rules endFunc={()=> {
                            this.setState({stage:'comparison'});
                        }} />
                    }
                    {this.state.stage == 'comparison' &&
                        <Comparison assignmentId={this.state.assignmentId}
                        workerId={this.state.workerId}
                        turkSubmitTo={this.state.turkSubmitTo} 
                        hitId={this.state.hitId}
                        tasks= {10}
                        />
                    }
                </Box>
            </Container>
        )
    }
}

export default withRouter(Task);
