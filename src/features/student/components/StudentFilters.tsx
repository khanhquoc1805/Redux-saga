import { Box, Grid,FormControl,InputLabel,OutlinedInput } from '@material-ui/core';
import React, { ChangeEvent} from 'react';
import { City, ListParams } from '../../../model';
import SearchIcon from '@material-ui/icons/Search';

interface StudentFiltersProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
  cityList: City[];
}

export default function StudentFilters(props: StudentFiltersProps) {
  const { filter, onChange, onSearchChange, cityList } = props;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      if(!onSearchChange) return;

      const newFilter = {
        ...filter,
        name_like: e.target.value,
      }
      onSearchChange(newFilter);

  }
  return (
    <Box mb={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput
              label="Search By Name"
              id="searchByName"
              endAdornment={<SearchIcon/>}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
