import { Box, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../model';
import StudentForm from '../components/StudentForm';

const useStyle = makeStyles((theme) => ({
  typography: {
    display: 'flex',
    alignItems: 'center',
  },
}));
export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);

  const classes = useStyle();
  const history = useHistory()
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch', error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit =  async (formValues: Student) => {
    if(isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    

    history.push('/admin/students');
    toast.success('Successfully!', {
      position: 'top-center',
      autoClose: 2000,
    });
    
  };

  const initialValue: Student = {
    id: '',
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" className={classes.typography}>
          <ChevronLeft /> Back
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'UPDATE STUDENT INFO' : 'ADD NEW STUDENT'}</Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={4}>
          <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit}></StudentForm>
        </Box>
      )}
    </Box>
  );
}
