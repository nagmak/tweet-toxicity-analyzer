import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import About from '../pages/page1';
import Visualizations from '../pages/page2';
import TweetAnalyzer from '../pages/page3';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={6}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    marginTop: 24,
  },
  label: {
    color: "#FFF000",
  },
  indicator: {
    backgroundColor: "#FFF",
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs  value={value} onChange={handleChange} aria-label="simple tabs example"
        classes={{ indicator: classes.indicator }}>
          <Tab label="About" {...a11yProps(0)} style={{ fontSize: '1.3em' }}/>
          <Tab label="Visualizations" {...a11yProps(1)} style={{ fontSize: '1.3em' }}/>
          <Tab label="Tweet Analyzer" {...a11yProps(2)} style={{ fontSize: '1.3em' }}/>
        </Tabs>
        <Typography variant="h2" className={classes.title}>
            Machine Learning: Abuse Prevention on Social Media
        </Typography>
      </AppBar>
      <TabPanel value={value} index={0}>
        <About />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Visualizations />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TweetAnalyzer />
      </TabPanel>
    </div>
  );
}
