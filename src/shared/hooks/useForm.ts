import React, { useCallback, useEffect, useMemo, useState } from "react";

type FormValidationReturn<T> = {
  [K in keyof T as `${string & K}Valid`]?: string | null;
};

type ValidationFn<T, F> = (value: T, formState: F) => boolean;

export type FormValidations<FormType> = {
  [K in keyof FormType]?: [ValidationFn<FormType[K], FormType>, string];
};


export const useForm = <T extends object>(initialFormState: T, formValidations?: FormValidations<T>) => {
  
    const [formState, setFormState] = useState(initialFormState);
    const [formValidation, setFormValidation] = useState({});

    const createValidators = useCallback(() => {
        const formCheckedValues: { [key: string]: string | null } = {};
        if( formValidations ) {
            for (const formField of Object.keys(formValidations) as (keyof T)[]) {
                const validationEntry = formValidations[formField];
                if (!validationEntry) continue;
                const [fn, errorMessage] = validationEntry;
                formCheckedValues[`${String(formField)}Valid`] = fn(formState[formField], formState) ? null : errorMessage;
            }
            setFormValidation( formCheckedValues );
        }
        
    }, [formState, formValidations]);

    useEffect(() => createValidators() , [ formState, createValidators ]);
    

    useEffect(() => { setFormState( () => initialFormState ); }, [ initialFormState ] );
    


    const onInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const {name, value} = event.target;
        setFormState( (oldFormState) => ({ ...oldFormState, [name]: value }) );
    };

    const onResetForm = () => {
        setFormState( initialFormState );
    }

    const isFormValid = useMemo((): boolean => (Object.values(formValidation).every( value => (value === null))), [ formValidation ]);
    
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        formValidation,
        isFormValid,
        
        } as T & FormValidationReturn<T> & {
        onInputChange: typeof onInputChange;
        onResetForm: typeof onResetForm;
        formState: typeof formState;
        formValidation: typeof formValidation;
        isFormValid: typeof isFormValid;
  };
}
