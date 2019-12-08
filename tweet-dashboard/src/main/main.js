import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PieChartCard from '../components/card/pie-chart-card'
import BarChartCard from '../components/card/bar-chart-card';

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

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
            <PieChartCard></PieChartCard>
        </Grid>
        <Grid item xs={6}>
            <BarChartCard></BarChartCard>
        </Grid>
        <Grid item xs={6}>
            <PieChartCard></PieChartCard>
        </Grid>
        <Grid item xs={6}>
            <BarChartCard></BarChartCard>
        </Grid>
      </Grid>
    </div>
  );
}