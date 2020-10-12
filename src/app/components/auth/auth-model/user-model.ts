export interface User {
    id?: string,
    fname: string,
    mname: string,
    lname: string,
    email: string,
    phone: string,
    password: string,
    dob: Date,
    role?: string,
    grade?: number,
    gender: string,
    isAdmin?: boolean
}