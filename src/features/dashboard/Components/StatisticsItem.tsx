import { makeStyles, Paper, Box, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface StatisticsItemProps {
  icon: ReactElement;
  label: string;
  value: string | number;
}

const useStyle = makeStyles((theme) => ({
  root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      padding: theme.spacing(2,3),
      border: `1px solid ${theme.palette.divider}`
  },
}));

export default function StatisticsItem({ icon, label, value }: StatisticsItemProps) {
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">{value}</Typography>
        <Typography variant="caption"> {label}</Typography>
      </Box>
    </Paper>
  );
}
