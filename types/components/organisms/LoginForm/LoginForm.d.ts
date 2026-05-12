import React from "react";
export interface LoginFormProps {
    onSubmit?: (data: {
        identifier: string;
        password: string;
    }) => void;
    error?: string;
    loading?: boolean;
    title?: string;
    subtitle?: string;
    submitLabel?: string;
    identifierLabel?: string;
    passwordLabel?: string;
    className?: string;
}
export declare const LoginForm: React.FC<LoginFormProps>;
