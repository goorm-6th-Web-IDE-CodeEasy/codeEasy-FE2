export interface ApiResponse<T> {
    result: boolean;
    message: string;
    data: T;
}

export interface VerificationData {
    email: string;
    cerificationCode?: string;
}

export interface AvailabilityCheck {
    available: boolean;
}

export interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    certificationCode: string;
}

export interface Availability {
    nicknameAvailable: boolean;
    emailVerified: boolean;
}
