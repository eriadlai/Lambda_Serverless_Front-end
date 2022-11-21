import { useState } from "react";

export const useForm = <T extends Object>(alumno: T) => {
  const [state, setState] = useState(alumno);

  const onChange = (value: string, campo: keyof T) => {
    setState({
      ...state,
      [campo]: value,
    });
  };

  return {
    ...state,
    alumno: state,
    onChange,
  };
};
