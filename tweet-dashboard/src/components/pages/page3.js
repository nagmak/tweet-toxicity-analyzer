import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MultilineTextFields from '../text-input/text-input';
import DefaultButton from '../buttons/buttons';

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

function TweetAnalyzer() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <MultilineTextFields></MultilineTextFields>
              <DefaultButton></DefaultButton>
          </Grid>
        </Grid>
      </div>
    );
}

export default TweetAnalyzer;
