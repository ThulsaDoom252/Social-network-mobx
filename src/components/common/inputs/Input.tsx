import React from 'react';
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";


interface InputProps {
    placeholder?: string,
    id: string;
    type?: string;
    isFieldRequired?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean,
    requiredText?: string,
    showError?: boolean,
    marginBottomValue?: string
}


const Input: React.FC<InputProps> = ({
                                         placeholder,
                                         id,
                                         type,
                                         isFieldRequired,
                                         register,
                                         errors,
                                         disabled,
                                         requiredText,
                                         showError = true,
                                         marginBottomValue = 'mb-6'
                                     }) => {
    return (
        <>
            <div className={`w-full relative ${marginBottomValue}`}>
                <input
                    className={`
            bg-gray-200 
            outline-0
            w-full
            px-4 
            py-2 
            rounded-md 
            ${disabled && 'bg-gray-400'}
            ${errors[id] && 'border-red-500 border'}
            `
                    }
                    id={id}
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    {...register(id, {
                        required: requiredText ? `${requiredText}` : isFieldRequired,
                    })}
                />
                {showError &&
                    <p className={'absolute bottom-inputError text-red-600'}>{errors[id]?.message as string}</p>}
            </div>

        </>


    );
};

export default Input;