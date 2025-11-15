import type { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { useState } from 'react';


export type RHFTextFieldProps = TextFieldProps & {
    name: string;
};

export function FormText({
    name,
    helperText,
    slotProps,
    ...other
}: RHFTextFieldProps) {
    const { control, watch } = useFormContext();
    const val = watch(name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    value={field.value}
                    onChange={(event) => {
                        field.onChange(event.target.value);
                    }}
                    onBlur={(event) => {
                        field.onChange(event.target.value);
                    }}
                    type={'text'}
                    error={!!error}
                    helperText={error?.message ?? helperText}
                    slotProps={{
                        ...slotProps,
                        htmlInput: {
                            autoComplete: 'off',
                            ...slotProps?.htmlInput,
                        },
                    }}
                    {...other}
                />
            )}
        />
    );
}
