import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  dashboardActions,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLoading,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';

import StatisticsItem from './Components/StatisticsItem';
import Widget from './Components/Widget';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import StudentRankingList from './Components/StudentRankingList';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function DashBoard() {
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const loading = useAppSelector(selectLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);


  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress color="secondary" className={classes.loading} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<AccessibilityIcon fontSize="large" color="primary" />}
            label="Male"
            value={statistics.maleCount}
          ></StatisticsItem>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<AccessibilityIcon fontSize="large" color="primary" />}
            label="FeMale"
            value={statistics.feMaleCount}
          ></StatisticsItem>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<AccessibilityIcon fontSize="large" color="primary" />}
            label="Mark >= 8"
            value={statistics.hightMarkCount}
          ></StatisticsItem>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<AccessibilityIcon fontSize="large" color="primary" />}
            label="Mark <= 5"
            value={statistics.lowMarkCount}
          ></StatisticsItem>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography variant="h4"> ALL STUDENTS</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student With Highest Mark">
                <StudentRankingList studentList={highestStudentList}></StudentRankingList>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student With Lowest Mark">
                <StudentRankingList studentList={lowestStudentList}></StudentRankingList>
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h4"> RANKING BY CITY</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid item xs={12} md={6} lg={3} key={ranking.cityId}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList}></StudentRankingList>
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
