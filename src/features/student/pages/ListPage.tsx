import { Box, Typography, Button, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/hooks';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentPagination, studentActions } from '../StudentSlice';

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

  const studentList = useSelector(selectStudentList);
  const pagination = useSelector(selectStudentPagination);
  const filter = useSelector(selectStudentFilter);

  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList(filter)
    );
  }, [dispatch, filter]);

  const handleChange = (e: any, page: number) => {
      dispatch(studentActions.setFilter({
          ...filter,
          _page: page,
      }))
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h4">STUDENTS</Typography>
        <Button variant="contained" color="secondary">
          ADD STUDENT
        </Button>
      </Box>
      <Box>
        <StudentTable studentList={studentList}></StudentTable>
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
