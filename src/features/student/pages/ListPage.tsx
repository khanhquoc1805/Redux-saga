import { Box, Typography, Button, makeStyles, LinearProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Student } from '../../../model';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../StudentSlice';
import { toast } from 'react-toastify';

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
  link: {
    textDecoration: 'none',
  },
}));

export default function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const match = useRouteMatch();
  const history = useHistory();

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
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || '');
      toast.error('Remove SuccessFully!', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      <Box mb={3}>{loading && <LinearProgress color="secondary" />}</Box>
      <Box className={classes.title}>
        <Typography variant="h4">STUDENTS</Typography>
        <Link to={`${match.url}/add`} className={classes.link}>
          <Button variant="contained" color="secondary">
            ADD STUDENT
          </Button>
        </Link>
      </Box>
      <Box>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      <Box>
        <StudentTable
          studentList={studentList}
          cityMap={cityMap}
          onRemove={handleRemoveStudent}
          onEdit={handleEditStudent}
        ></StudentTable>
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
