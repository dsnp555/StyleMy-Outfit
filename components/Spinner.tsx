
import React from 'react';

const Spinner: React.FC = () => {
    const messages = [
        "Styling your look...",
        "Applying the final touches...",
        "This is worth the wait!",
        "Generating your virtual outfit...",
        "Almost ready...",
    ];
    
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg font-semibold transition-opacity duration-500">{message}</p>
        </div>
    );
};

export default Spinner;
