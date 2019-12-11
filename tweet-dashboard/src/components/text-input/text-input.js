import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

  const handleChange = event => {
    setValue(event.target.value);
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
        />
      </div>
    </form>
  );
}