import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    fontWeight: 'bold',
    margin: '20px 0'
  },
});

export default (props: any) => {
  const classes = useStyles({});
  return (
    <div className={classes.card}>
        {props.latestSubscriptions}
    </div>
  );
};