import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SimpleBarChart from '../bar-chart/bar-chart';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    paddingTop: '100px',

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BarChartCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <SimpleBarChart></SimpleBarChart>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}