import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
  const [formValues, setFormValues] = useState(initialState);

  const formReset = ( newState = initialState) => {
    setFormValues(newState);
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [ target.name ]: target.value
    });
  }

  return [ formValues, handleInputChange, formReset ];

}
