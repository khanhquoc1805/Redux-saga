import React from 'react';
import { Control, useController } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormHelperText } from '@material-ui/core';

interface RadioGroupFieldProps{
  name: string;
  control: Control<any>;
  label?: string;
  disable?: boolean;
  options: RadioOption[];
}

export interface RadioOption {
  label?: string;
  value: number | string;
}

export function RadioGroupField(props: RadioGroupFieldProps) {
  const { name, control, label,disable,options } = props;

  const {
    field: { value, onChange, onBlur},
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl component="fieldset" error={invalid} margin="normal" disabled={disable}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur} row>
      {options.map(option => (
         <FormControlLabel key={option.value}value={option.value} control={<Radio />} label={option.label} />
      ))}
    </RadioGroup>
    <FormHelperText>{error?.message}</FormHelperText>
  </FormControl>
  );
}
