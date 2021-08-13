import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { City, Student } from '../../../model';
import { Button, Paper, Box } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { capitalizeString, getColor } from '../../../utils';

const useStyles = makeStyles((theme) => ({
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
  mark: {
    fontWeight: 'bold',
  },
}));

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable(props: StudentTableProps) {
  const classes = useStyles();
  const { studentList, onEdit, onRemove, cityMap } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();



  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveStudent = (student: Student) => {
    setSelectedStudent(student)
    setOpen(true);
  }

  const handleRemoveConfirm = (student: Student) => {
    onRemove?.(student);
    setOpen(false);
  }

  return (
    <>
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
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getColor(student.mark)} className={classes.mark}>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    className={classes.primary}
                    onClick={() => onEdit?.(student)}
                  >
                    <EditOutlinedIcon fontSize="small"></EditOutlinedIcon>
                  </Button>
                  <Button
                    color="secondary"
                    className={classes.secondary}
                    onClick={() => handleRemoveStudent(student)}
                  >
                    <CloseIcon fontSize="small"></CloseIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student ? </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure remove student named "{selectedStudent?.name}".<br /> This action can&apos;t be undo!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent as Student)} color="secondary" variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
