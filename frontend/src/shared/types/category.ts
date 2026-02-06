

interface CategoryBase {
    name: string;
    color: string;
}

export interface CategoryReadDto extends CategoryBase {
    id: number;
    workspaceId: number;
}

export interface CategoryCreateDto extends CategoryBase {
    workspaceId: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CategoryUpdateDto extends CategoryBase { }

export interface CategoryDeleteDto {
    id: number;
}