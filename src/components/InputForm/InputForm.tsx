import React, { ChangeEvent } from 'react'
import styled from './InputForm.module.scss'

interface InputFieldProps {
    label: string
    type: string
    name: string
    placeholder: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    required?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    required = true,
}) => {
    return (
        <div className={styled.inputGroup}>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

export default InputField
