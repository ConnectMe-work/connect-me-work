


import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, styled, Grid } from "@mui/material";
import { useForm } from 'react-hook-form';
import AudioRecorder from 'src/components/AudioRecorder';
import { Form } from 'src/components/Form';
import { FormText } from 'src/components/FormText';

import { z as zod } from 'zod';

const schema = zod.object({
    title: zod.string().min(1, 'Required'),
    description: zod.string(),
});

export type EventFormType = zod.infer<typeof schema>;

const EvenForm = () => {


    const defaultValues: EventFormType = {
        title: '',
        description: '',

    };

    const methods = useForm<EventFormType>({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting },
    } = methods;


    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log('data', data);
        } catch (error) {
            console.error('error', error);
        }
    });

    const onAudioConverted = (text: string, fieldName: 'title' | 'description') => {
        setValue(fieldName, text, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        methods.setValue(fieldName, text);
    }

    return (
        <Form methods={methods}>
            <Stack rowGap={1}>
                <Stack>
                    <FormText name="title" label='Title' slotProps={{ htmlInput: { maxLength: 255 } }} />
                    <AudioRecorder onAudioConverted={(text) => onAudioConverted(text, 'title')} />
                </Stack>
                <Stack >
                    <FormText name="description" label='Description' multiline rows={8} slotProps={{ htmlInput: { maxLength: 5000 } }} />
                    <AudioRecorder onAudioConverted={(text) => onAudioConverted(text, 'title')} />
                </Stack>
            </Stack>
            <FormBottomButtons>
                <Button onClick={onSubmit} variant="contained" loading={isSubmitting}>
                    Save
                </Button>
            </FormBottomButtons>
        </Form >
    )
}

export default EvenForm;


const FormBottomButtons = styled(Grid)(({ theme }) => ({
    alignItems: "flex-end",
    paddingTop: theme.spacing(2),
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
}));