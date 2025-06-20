import React, { useState } from "react";

export const useForm = <T extends object>(initialFormState: T) => {
  
    const [formState, setFormState] = useState(initialFormState);

    const onInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const {name, value} = event.target;
        setFormState( (oldFormState) => ({ ...oldFormState, [name]: value }) );
    };

    const onResetForm = () => {
        setFormState( initialFormState );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };
}
