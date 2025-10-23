// src/components/ui/Input.jsx
function Input({
                   label,
                   type = "text",
                   value,
                   onChange,
                   placeholder,
                   required = false,
                   className = "",
               }) {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && (
                <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}

export default Input;
