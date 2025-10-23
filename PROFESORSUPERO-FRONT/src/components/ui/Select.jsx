// src/components/ui/Select.jsx
function Select({ label, options = [], value, onChange, className = "" }) {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && (
                <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
            )}
            <select
                value={value}
                onChange={onChange}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
