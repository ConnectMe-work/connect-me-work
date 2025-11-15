import type { UseFormReturn } from 'react-hook-form';
import { FormProvider as RHFForm } from 'react-hook-form';


export type Props = {
    onSubmit?: () => void;
    children: React.ReactNode;
    methods: UseFormReturn<any>;
};

export function Form({ children, onSubmit, methods }: Props) {
    return (
        <RHFForm {...methods}  >
            <form onSubmit={onSubmit} noValidate autoComplete="off"
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            >
                {children}
            </form>
        </RHFForm >
    );
}
