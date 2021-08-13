import { Box, Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { InputField, RadioGroupField, SelectField } from '../../../Components/FormField';
import { Student } from '../../../model';
import { selectCityOption } from '../../city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is Invalid'),
  age: yup
    .number()
    .min(1, 'Min is 2')
    .max(65, 'Max is 65')
    .integer()
    .required('Age is Invalid')
    .typeError('Age is a number'),
  mark: yup.number().min(0).max(10).required().typeError('Mark is a number'),
  gender: yup.string().oneOf(['male', 'female']).required(),
  city: yup.string().required(),
});

export default function StudentForm(props: StudentFormProps) {
  const { initialValue, onSubmit } = props;
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const cityOption = useSelector(selectCityOption);

  const handleSubmitForm = async (formValues: Student) => {
    console.log(formValues);
    try {
      await onSubmit?.(formValues);
    } catch (error) {}
  };

  return (
    <Box maxWidth={450}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" control={control} label="Full Name" />

        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        ></RadioGroupField>
        <InputField name="age" control={control} label="Age" />
        <InputField name="mark" control={control} label="Mark" />
        {Array.isArray(cityOption) && cityOption.length >= 0 && (
          <SelectField
            name="city"
            control={control}
            label="City"
            options={cityOption}
          ></SelectField>
        )}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="secondary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
