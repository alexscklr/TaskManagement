import type { UserReadDto } from "@/shared/types/user";


interface UserElementProps {
    user: UserReadDto;
    onClick: () => void;
    size?: 'small' | 'large';
}

export default function UserElement({ user, onClick, size = 'large' }: UserElementProps) {
    return (
        <div
            className={`rounded-lg cursor-pointer hover:shadow-lg transition ${size === 'small' ? 'p-2' : 'p-4'}`}
            onClick={onClick}
        >
            <h2 className={`font-semibold text-blue-700 mb-1 flex items-center gap-2 ${size === 'small' ? 'text-l' : 'text-xl'}`}>
                {user.username} | <span className="text-gray-500 text-sm">{user.email}</span>
            </h2>

        </div>
    );
}