import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface FilterSortProps {
  onCreateTodo: () => void
  filterStatus: string
  sortBy: string
  sortOrder: string
  handleFilterChange: (event: SelectChangeEvent<string>) => void
  handleSortChange: (by: string, order: string) => void
}

export default function FilterSort({
  onCreateTodo,
  filterStatus,
  sortBy,
  sortOrder,
  handleFilterChange,
  handleSortChange,
}: FilterSortProps) {
  return (
    <Box
      sx={{ display: 'flex', gap: '16px', mb: '20px', alignItems: 'center' }}
    >
      <Button variant="contained" color="success" onClick={onCreateTodo}>
        Create
      </Button>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          width: '140px',
        }}
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          label="Status"
          sx={{
            fontSize: '14px',
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="0">Not Started</MenuItem>
          <MenuItem value="1">In Progress</MenuItem>
          <MenuItem value="2">Completed</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          width: '120px',
        }}
      >
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value, sortOrder)}
          label="Sort by"
          sx={{
            fontSize: '14px',
          }}
        >
          <MenuItem value="dueDate">Due Date</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="text"
        color="inherit"
        startIcon={sortOrder === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />}
        sx={{
          fontSize: '14px',
          fontWeight: 'normal',
          textTransform: 'capitalize',
        }}
        onClick={() => {
          const val = sortOrder === 'asc' ? 'desc' : 'asc'
          handleSortChange(sortBy, val)
        }}
      >
        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </Button>
      {/* <FormControl variant="outlined" size="small">
        <InputLabel>Order</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => handleSortChange(sortBy, e.target.value)}
          label="Order"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl> */}
    </Box>
  )
}
