import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import CardContent from '@material-ui/core/CardContent';
import EquipmentTypes from './EquipmentTypes';
import EOGCharts from './EOGCharts';
import { makeStyles } from '@material-ui/core/styles';
import Measurements from '../Features/Measurements/Measurements';

const useStyles = makeStyles({
  card: {
    margin: '10px',
  },
});

const equipmentTypes = [
  { title: 'injValveOpen', value: 'injValveOpen' },
  { title: 'oilTemp', value: 'oilTemp' },
  { title: 'tubingPressure', value: 'tubingPressure' },
  { title: 'flareTemp', value: 'flareTemp' },
  { title: 'casingPressure', value: 'casingPressure' },
  { title: 'waterTemp', value: 'waterTemp' }
];

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="EOG Dashboard" />
      <CardContent>
        <EquipmentTypes />
        {/* <EOGCharts /> */}
        <Measurements />
      </CardContent>
    </Card>
  );
};