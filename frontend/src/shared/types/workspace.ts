

interface WorkspaceBase {
    name: string;
}

export interface WorkspaceReadDto extends WorkspaceBase {
    id: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkspaceCreateDto extends WorkspaceBase { }

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkspaceUpdateDto extends WorkspaceBase { }

export interface WorkspaceDeleteDto {
    id: number;
}