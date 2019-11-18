import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

export default (props: any) => {
  return <div>
          <Autocomplete 
                    multiple
                    filterSelectedOptions
                    id="metric-types-select"
                    options={props.metrics}
                    getOptionLabel={option => option}
                    onChange={props.onMetricTypesChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Select Metrics Types"
                        margin="normal"
                        fullWidth/>
                    )}
            />
      </div>
};
