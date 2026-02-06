
interface MainProps {
    children?: React.ReactNode;
}

export default function Main({ children }: MainProps) {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-8 px-4">
            {children}
        </main>
    );
}