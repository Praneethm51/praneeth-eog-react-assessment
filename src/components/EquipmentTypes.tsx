import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/core/styles';
import { TextField, Checkbox } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

// const useStyles = makeStyles({
//   card: {
//     margin: '10px',
//   },
// });

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const equipmentTypes = [
  { title: 'injValveOpen', value: 'injValveOpen' },
  { title: 'oilTemp', value: 'oilTemp' },
  { title: 'tubingPressure', value: 'tubingPressure' },
  { title: 'flareTemp', value: 'flareTemp' },
  { title: 'casingPressure', value: 'casingPressure' },
  { title: 'waterTemp', value: 'waterTemp' }
];

export default () => {
//   const classes = useStyles();
  return (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={equipmentTypes}
          disableCloseOnSelect
          getOptionLabel={option => option.title}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </React.Fragment>
          )}
        //   style={{ width: 500 }}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Select Equipment Types"
              fullWidth
            />
          )}
        />
  );
};
