import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Measurements from '../Features/Measurements/Measurements';
import Metrics from '../Features/Metrics/Metrics';
import Subscriptions from '../Features/Subscriptions/Subscriptions';

const useStyles = makeStyles({
  card: {
    margin: '10px',
  },
  metricsContainer: {
    display: 'flex',
    flexFlow: 'column wrap'
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="EOG Dashboard" />
      <CardContent>
        <div className={classes.metricsContainer}>
          <Metrics />
          <Subscriptions />
        </div>
        <Measurements />
      </CardContent>
    </Card>
  );
};