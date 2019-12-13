import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MySnackbarContentWrapper from '../snackbar/snackbar';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 600,
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [warningOpen, setWarningOpen] = React.useState(false);
  var [msg, setMsg] = React.useState('Controlled');

  var sentiment = ''

  const setTextValue = event => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const handleChangeTest = event => {
    console.log(event);
    if (event) {
      console.log(value);
      axios.get('http://localhost:5000/', {
        params: {
          tweet: value
        },
        headers: {
          'Access-Control-Allow-Origin': true
        }, 
      })
      .then(res => {
        const sentiment_analyzed = res.data;
        console.log(sentiment_analyzed);
        const compound = sentiment_analyzed.compound;

        if (compound >= 0.05) {
          sentiment = 'Positive'
          msg = "Tweet Sentiment: " + sentiment + ". That sounds like a great tweet! Post away!"
          setMsg(msg)
          setSuccessOpen(true);

        }
        else if (compound <= -0.05) {
          sentiment = 'Negative'
          msg = "Tweet Sentiment: " + sentiment + ". This is quite a negative tweet. Are you sure you want to post it?"
          setMsg(msg)
          setWarningOpen(true);
        }
        else {
          sentiment = 'Neutral'
          msg = "Tweet Sentiment: " + sentiment + ". That sounds like a great tweet! Post away!"
          setMsg(msg)
          setSuccessOpen(true);
        }

      })
    }
  };

  const handleChangePost = event => {
    console.log(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setWarningOpen(false);
    setSuccessOpen(false);

  };

    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <h3>Please input a Tweet of 240 characters max to be analyzed for toxicity:</h3>
          <TextField
            id="standard-textarea"
            label="Tweet!"
            placeholder="Tweet"
            multiline
            onChange={ setTextValue }
          />
          <Button variant="contained" onClick={ handleChangeTest }>Test</Button>
          <Button variant="contained" color="primary" onClick={ handleChangePost }>Post Tweet</Button>
          <Snackbar
            open={ successOpen }
            autoHideDuration={6000}
            onClose={handleClose}
            className="success"
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="success"
              message={msg}
            />
          </Snackbar>
          <Snackbar
            open={ warningOpen }
            autoHideDuration={6000}
            onClose={handleClose}
            className="warning"
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="warning"
              message={msg}
            />
          </Snackbar>
        </div>
      </form>
    );
}