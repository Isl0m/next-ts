import { Control } from 'react-hook-form';
export interface IFormInput {
    name: string;
    email: string;
    password: string;
  }
export interface ICustomRule {
    required: string;
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  }
  
 export interface IProps {
    name: 'name' | 'email' | 'password';
    label: string;
    control: Control<IFormInput, any>;
    customRule?: ICustomRule;
  }
  