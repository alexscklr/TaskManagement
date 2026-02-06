import type { CategoryReadDto } from "../../types/category";


interface CategoryElementProps {
    category: CategoryReadDto;
    onClick: () => void;
    size?: 'small' | 'large';
}

export default function CategoryElement({ category, onClick, size = 'large' }: CategoryElementProps) {
    return (
        <div
            className={`rounded-lg cursor-pointer hover:shadow-lg transition ${size === 'small' ? 'p-2' : 'p-4'}`}
            onClick={onClick}
        >
            <h2 className={`font-semibold text-blue-700 mb-1 flex items-center gap-2 ${size === 'small' ? 'text-l' : 'text-xl'}`}>
                <span className={`inline-block rounded-full text-sm font-medium`} style={{ backgroundColor: category.color, color: '#ffffff', padding: size === 'small' ? '0.4rem' : '0.75rem' }} />
                {category.name}
            </h2>

        </div>
    );
}