import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MySnackbarContentWrapper from '../snackbar/snackbar';
import Snackbar from '@material-ui/core/Snackbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 600,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [warningOpen, setWarningOpen] = React.useState(false);
  var [msg, setMsg] = React.useState('Controlled');
  const [algorithm, setAlgorithm] = React.useState('');

  var sentiment = ''

  const setTextValue = event => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const handleChangeTest = event => {
    console.log(event);
    if (event && algorithm) {
      console.log(value);
      console.log(algorithm);
      axios.get('http://localhost:5000/', {
        params: {
          algorithm: algorithm,
          tweet: value,
        },
        headers: {
          'Access-Control-Allow-Origin': true
        }, 
      })
      .then(res => {
        const sentiment_analyzed = res.data;
        if (algorithm === 'vader') {
          analyze_compound(sentiment_analyzed)
        } else if (algorithm === 'svm' || algorithm === 'nb') {
          analyze_svm_nb(sentiment_analyzed[0])
        }

      })
    }
  };

  function analyze_svm_nb(sentiment_analyzed) {
    if (sentiment_analyzed === 1) {
      sentiment = 'Positive'
      msg = "Tweet Sentiment: " + sentiment + ". That sounds like a great tweet! Post away!"
      setMsg(msg)
      setSuccessOpen(true);
    } else if (sentiment_analyzed === 0) {
      sentiment = 'Neutral'
      msg = "Tweet Sentiment: " + sentiment + ". That sounds like a great tweet! Post away!"
      setMsg(msg)
      setSuccessOpen(true);
    } else if (sentiment_analyzed === -1) {
      sentiment = 'Negative'
      msg = "Tweet Sentiment: " + sentiment + ". This is quite a negative tweet. Are you sure you want to post it?"
      setMsg(msg)
      setWarningOpen(true);
    }
  }

  function analyze_compound(sentiment_analyzed) {
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
  }

  const handleChangePost = event => {
    console.log(event.target.value);
    try {
      const response = axios.post('http://localhost:5000/', event.target.value);
      console.log('Returned data:', response);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setWarningOpen(false);
    setSuccessOpen(false);

  };

  const handleSelectChange = event => {
    setAlgorithm(event.target.value);
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
          <FormControl className={classes.formControl}>
            <InputLabel id="select-label">Select An Algorithm</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={algorithm}
              onChange={handleSelectChange}
            >
              <MenuItem value={'vader'}>VADER Sentiment</MenuItem>
              <MenuItem value={'svm'}>Support Vector Machines</MenuItem>
              <MenuItem value={'nb'}>Naive Bayes</MenuItem>
            </Select>
          </FormControl>          
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
