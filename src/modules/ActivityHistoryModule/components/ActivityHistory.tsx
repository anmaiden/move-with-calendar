import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import '../style/ActivityHistory.scss';
import calendarStore from '../../CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';
import { observer } from 'mobx-react-lite';
import ExportToPDF from '../../ExportToPdfModule/components/ExportToPdf';
import { formatDate } from '../../../utils/helper';
import { cn } from '@bem-react/classname';

const cnActivityHistory = cn('ActivityHistory');

const ActivityHistory = observer(() => {
  const workoutData = calendarStore.savedData.savedData;
  const totalWorkouts = calendarStore.savedData.savedData.length;

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({
    key: 'date',
    direction: 'desc',
  });

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return workoutData;

    return [...workoutData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortConfig.key === 'date') {
          const dateA = new Date(aValue).getTime();
          const dateB = new Date(bValue).getTime();
          return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [workoutData, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Grid container spacing={2} className={cnActivityHistory()}>
      <Grid className={cnActivityHistory('ExportBtn')} size={12}>
        <ExportToPDF />
      </Grid>
      <Grid className={cnActivityHistory('TotalText')}>
        Total workouts: {totalWorkouts}
      </Grid>

      <TableContainer
        component={Paper}
        className={cnActivityHistory('TableContainer')}
      >
        <Table
          aria-label="activity table"
          className={cnActivityHistory('Table')}
        >
          <TableHead className={cnActivityHistory('TableHead')}>
            <TableRow>
              <TableCell onClick={() => requestSort('date')}>
                Workout Date
                {sortConfig?.key === 'date' &&
                  (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
              </TableCell>
              <TableCell onClick={() => requestSort('dayNumber')}>
                Day Number
                {sortConfig?.key === 'dayNumber' &&
                  (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
              </TableCell>
              <TableCell onClick={() => requestSort('calories')}>
                Calories Burned
                {sortConfig?.key === 'calories' &&
                  (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
              </TableCell>
              <TableCell>Playlist</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell>{row.dayNumber}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.videoPlaylist}</TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
});

export default ActivityHistory;
