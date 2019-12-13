import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function About() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>About</h3>
            <p>Deborah & Nagma worked on a project for CPS803: Machine Learning at Ryerson University. We wanted to investigate toxicity online,
              and create ML models that would allow us to capture this, and generate awareness. We focused on Twitter due to time limitations, but hope
              to expand our research into other large social media networks as well.</p>
            <h3>Methods</h3>
            <p>We used VADER sentiment analyzer to generate polarities. These polarities were used to determine if a tweet was
              positive, negative or neutral in nature. We also captured tweets based off random hashtags, and used VADER to label them as positive, negative or neutral.
              Then we trained models for Support Vector Machines (SVM) and Naive Bayes (NB) to determine which algorithms were more accurate for classifying test tweets.<br></br>
              Additionally, you can play around with VADER, SVM and NB on our tweet analyzer, to determine if your tweet is positive, negative or neutral. We didn't want to
              restrict freedom in posting a tweet, but we did want to generate awareness on how an individual tweet may impact someone else.<br></br>
              Ideally, this would be directly integrated into the Twitter platform, so users would have a real-time idea of how they are impacting their network online.</p>
            <h3>Limitations</h3>
            <p>Since our focus was on Twitter, we were limited to the data we could retrieve from there. Additionally, since Twitter APIs have specific caps on them, we had to
              adhere to these while collecting data. Ideally, we could've captured millions of tweets with hundreds and thousands of hashtags, but the standard free search API limits us to 10 keywords.
            </p>
          </Grid>
        </Grid>
      </div>
    );
}

export default About;
