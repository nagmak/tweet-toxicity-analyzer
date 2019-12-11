import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function DefaultButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained">Test</Button>
      <Button variant="contained" color="primary">Post Tweet</Button>
    </div>
  );
}