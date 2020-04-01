import * as React from "react";
import { Typography, Grid, Table, TableBody, TableRow, Button, TableCell} from "@material-ui/core";
import { Link } from 'react-router-dom';

export class Rules extends React.Component <{endFunc: () => void}, {}> {

    render () {
        return (
            <React.Fragment>
                
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5" paragraph={true}>
                            Task <br/>
                        </Typography>
                        <Typography variant="body1" component="p">
                        In this activity, you will be asked to do 6 comparisons. For each comparison, two sketches from the same object class will be displayed, and you will be asked to describe the transition from the sketch on the left to the sketch on the right. 
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" paragraph={true}>
                            Expected Time: 15 seconds
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" paragraph={true}>
                            Rules
                        </Typography>
                        <Table>
                            <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body1">Please do not refresh this page until you completed and submitted the task. If you refresh this page, the two sketches will be regenerated and will be different.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> 
                                    <Typography variant="body1">Please use a recent version of Firefox/Chrome to complete the task.</Typography>
                                </TableCell> 
                            </TableRow>
                            <TableRow>
                                <TableCell> 
                                    <Typography variant="body1">Your rewards will not be based on your description performance. However, please try you best to describe the changes needed to transform sketch 1 to sketch 2.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body1">You must be of age 18 or older to participate in this task.</Typography>
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" paragraph={true}>
                            Consent Form
                        </Typography>
                        <Link to={"/consent"} target="_blank">
                            <Typography variant="body1" component="p">Please review the consent form of this study here.</Typography>
                        </Link>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" component="p">
                        By clicking on the "Begin Task" button below, you confirm that you understand all the information in the consent form above and agree to it, and agree to obey the rules listed above. 
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" alignContent="center" justify="center" spacing={4}>

                    <Grid item xs={12} />
                    <Grid item xs={4}>
                        <Button variant="contained" fullWidth onClick={this.props.endFunc} color="primary">
                            Begin Task
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )    
    }
}
// export default withRouter(Rules);