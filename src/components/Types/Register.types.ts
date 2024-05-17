export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
}

export interface VerificationData {
    email: string
    verificationCode?: string
}

export interface AvailabilityCheck {
    available: boolean
}

export interface FormData {
    email: string
    password: string
    confirmPassword: string
    nickname: string
    verificationCode: string
}

export interface Availability {
    nicknameAvailable: boolean
    emailVerified: boolean
}
