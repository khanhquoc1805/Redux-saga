import { Box, Typography, Button, makeStyles, LinearProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams } from '../../../model';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../StudentSlice';

const useStyle = makeStyles((theme) => ({
  root: {},
  title: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
    console.log(newFilter);
  }
  return (
    <Box className={classes.root}>
      <Box mb={3}>{loading && <LinearProgress color="secondary" />}</Box>
      <Box className={classes.title}>
        <Typography variant="h4">STUDENTS</Typography>
        <Button variant="contained" color="secondary">
          ADD STUDENT
        </Button>
      </Box>
      <Box>
        <StudentFilters filter={filter} cityList={cityList} onSearchChange={handleSearchChange}/> 
      </Box>

      <Box>
        <StudentTable studentList={studentList} cityMap={cityMap}></StudentTable>
      </Box>
      <Box mt={3} className={classes.pagination}>
        <Pagination
          color="secondary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
