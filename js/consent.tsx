import * as React from "react";
import { Typography, Grid, Box, Container } from "@material-ui/core";
import { withRouter } from 'react-router';

class Consent extends React.Component <{}, {}> {

    render () {
        return (
            <Container maxWidth="lg">
                <Box paddingTop={3}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item>
                                <Typography variant="h4">
                                    University of California, Berkeley
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Typography variant="h5">
                                Consent to Participate in Research
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Introduction and Purpose
                        </Typography>
                        <Typography variant="body1" component="p">
                            My name is Luming Chen. I am a master student at the University of California, Berkeley working with my faculty advisor, Professor John Canny in the Department of Electrical Engineering and Computer Sciences.  I would like to invite you to take part in my research study, which concerns understanding and modeling human behavior in creating and using graphical sketches.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Procedures
                        </Typography>
                        <Typography variant="body1" component="p">
                        If you agree to participate in our research, you will be asked to compare 10 sets of two sketches and provide instructions to transform sketch 1 to sketch 2 in English language.
                        In this activity, two tree sketches will be displayed, and you will be asked to describe the transition from the sketch on the left to the sketch on the right. 
                        Each comparison should take about 20 seconds to complete. In total, each task should take around 3 minutes and 20 seconds. 
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Benefits
                        </Typography>
                        <Typography variant="body1" component="p">
                            There is no direct benefit to you from taking part in this study.  It is hoped that the research will supply data for building machine intelligence that supports novel sketch-related interactions and applications.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Risks/Discomforts
                        </Typography>
                        <Typography variant="body1" component="p">
                            The main risk associated with our study is that you might become uncomfortable with certain sketches generated for you. In addition, you are required to refrain from producing offensive content according to our rules. Violation of the rules can result in rejection of the task and suspension from this study in the future.

                            You may pause and/or end the data collection process at any time should you become uncomfortable with the sketches or prompts provided to you.

                            As with all research, there is a chance that confidentiality could be compromised; however, we are taking precautions to minimize this risk.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Confidentiality
                        </Typography>
                        <Typography variant="body1" component="p">
                            Your study data will be handled as confidentially as possible. If the results of this study are published or presented, individual names and other personally identifiable information will not be used.

                            To minimize the risks to confidentiality, all collected text data of responses produced by the participants will be transmitted securely using the HTTPS protocol directly to a password-protected database in a server located on campus under UC Berkeley Department of Computer Science firewall. Moreover, the authorship of the data collected from you is converted to a unique ID from your Amazon Mechanical Turk WorkerID when storing in our database. The mapping from your WorkerID to the unique ID we store is secured on a separate password-protected storage device. 

                            When the research is completed, I will publicly publish the data for possible use in future research done by myself or others. The same measures described above will be taken to protect confidentiality of this study data.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Compensation
                        </Typography>
                        <Typography variant="body1" component="p">
                            To thank you for participating in this study, you will receive 0.5 Amazon Credit per task through Amazon Mechanical Turk.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Rights
                        </Typography>
                        <Typography variant="body1" component="p">
                            Participation in research is completely voluntary. You are free to decline to take part in the project. You can decline to answer any questions and are free to stop taking part in the project at any time.  Whether or not you choose to participate, to answer any particular question, or continue participating in the project, there will be no penalty to you or loss of benefits to which you are otherwise entitled.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="p">
                            Questions
                        </Typography>
                        <Typography variant="body1" component="p">
                            If you have any questions about this research, please feel free to contact me.  You can reach me, Luming Chen, at lumingc@berkeley.edu.

                            If you have any questions about your rights or treatment as a research participant in this study, please contact the University of California at Berkeley’s Committee for Protection of Human Subjects at 510-642-7461, or e-mail subjects@berkeley.edu. 

                            If you agree to take part in the research, please print a copy of this page to keep for future reference.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            </Container>

        )    
    }
}

export default withRouter(Consent);
