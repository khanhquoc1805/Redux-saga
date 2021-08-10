import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student } from '../../../model';
import { Button, Paper } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme =>({
  
  secondary: {
    backgroundColor: '#f8bbd0',
    '& .MuiButton-label': {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: '#e0e0e0',
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    },
    marginRight: theme.spacing(1),
  },
}));

export interface StudentTableProps {
  studentList: Student[];
  onEdit?: (student: Student) => void,
  onRemove?: (student: Student) => void,
}

export default function StudentTable(props: StudentTableProps) {
  const classes = useStyles();
  const {studentList, onEdit, onRemove } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student) => (
            <TableRow key={student.id}>
              <TableCell >{student.id}</TableCell>
              <TableCell >{student.name}</TableCell>
              <TableCell >{student.gender}</TableCell>
              <TableCell >{student.mark}</TableCell>
              <TableCell >{student.city}</TableCell>
              <TableCell align="right">
                <Button color="primary" className={classes.primary} onClick={() => onEdit?.(student)}>
                  <EditOutlinedIcon fontSize="small"></EditOutlinedIcon>
                </Button>
                <Button color="secondary" className={classes.secondary} onClick={() => onRemove?.(student)}>
                  <CloseIcon fontSize="small"></CloseIcon>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
