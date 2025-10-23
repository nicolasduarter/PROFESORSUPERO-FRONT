// src/components/ui/Button.jsx
function Button({
                    children,
                    onClick,
                    type = "button",
                    variant = "primary",
                    disabled = false,
                    className = "",
                }) {
    const base =
        "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100",
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
