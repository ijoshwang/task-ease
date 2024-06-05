import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface FilterSortProps {
  filterStatus: string
  sortBy: string
  sortOrder: string
  handleFilterChange: (event: SelectChangeEvent<string>) => void
  handleSortChange: (by: string, order: string) => void
}

const FilterSort: React.FC<FilterSortProps> = ({
  filterStatus,
  sortBy,
  sortOrder,
  handleFilterChange,
  handleSortChange,
}) => (
  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
    <FormControl variant="outlined" size="small">
      <InputLabel>Filter by Status</InputLabel>
      <Select
        value={filterStatus}
        onChange={handleFilterChange}
        label="Filter by Status"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="0">Not Started</MenuItem>
        <MenuItem value="1">In Progress</MenuItem>
        <MenuItem value="2">Completed</MenuItem>
      </Select>
    </FormControl>
    <FormControl variant="outlined" size="small">
      <InputLabel>Sort by</InputLabel>
      <Select
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value, sortOrder)}
        label="Sort by"
      >
        <MenuItem value="dueDate">Due Date</MenuItem>
        <MenuItem value="status">Status</MenuItem>
        <MenuItem value="name">Name</MenuItem>
      </Select>
    </FormControl>
    <FormControl variant="outlined" size="small">
      <InputLabel>Order</InputLabel>
      <Select
        value={sortOrder}
        onChange={(e) => handleSortChange(sortBy, e.target.value)}
        label="Order"
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>
  </div>
)

export default FilterSort
