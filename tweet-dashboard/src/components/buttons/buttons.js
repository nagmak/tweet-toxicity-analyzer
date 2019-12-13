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

  const handleChangeTest = event => {
    console.log(event.target.value);
  };

  const handleChangePost = event => {
    console.log(event.target.value);
  };


  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={ handleChangeTest }>Test</Button>
      <Button variant="contained" color="primary" onClick={ handleChangePost }>Post Tweet</Button>
    </div>
  );
}