

interface UserBase {
    username: string;
    email: string;
}

export interface UserReadDto extends UserBase {
    id: number;
    createdAt: string;
}

export interface UserCreateDto extends UserBase {
    password: string;
}

export interface UserUpdateDto extends UserBase {
    newPassword: string;
}

export interface UserDeleteDto {
    id: number;
}

export interface UserLoginDto {
    email: string;
    password: string;
}