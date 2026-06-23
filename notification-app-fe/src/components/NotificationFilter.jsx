import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const NotificationFilter = ({ value, onChange }) => {
  return (
    <FormControl fullWidth sx={{ minWidth: 120 }}>
      <InputLabel id="filter-label">Filter by Type</InputLabel>
      <Select
        labelId="filter-label"
        value={value}
        label="Filter by Type"
        onChange={onChange}
      >
        <MenuItem value="All">All Categories</MenuItem>
        <MenuItem value="Placement">Placements Only</MenuItem>
        <MenuItem value="Result">Results Only</MenuItem>
        <MenuItem value="Event">Events Only</MenuItem>
      </Select>
    </FormControl>
  );
};