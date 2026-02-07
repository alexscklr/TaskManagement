import type { UserReadDto } from "@/shared/types/user";


export interface AuthResponseDto {
    token: string;
    user: UserReadDto;
}