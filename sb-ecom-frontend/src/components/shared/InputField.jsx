const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
}) => {
    return (
        <div className="flex flex-col space-y-1">
            {/* Label */}
            <label htmlFor={id} className={`font-semibold text-gray-700 ${className}`}>
                {label}
            </label>

            {/* Input Field */}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none 
                ${className} ${errors[id] ? "border-red-500" : "border-gray-300"}`}
                {...register(id, {
                    required: required ? message || "This field is required" : false,
                    minLength: min
                        ? {
                              value: min,
                              message: `Minimum ${min} characters required`,
                          }
                        : null,
                    pattern:
                        type === "email"
                            ? {
                                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Invalid email format",
                              }
                            : type === "url"
                            ? {
                                  value: /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/,
                                  message: "Invalid URL format",
                              }
                            : null,
                })}
            />

            {/* Error Message (only show if user interacted) */}
            {errors[id] && (
                <p className="text-red-500 text-sm">{errors[id].message}</p>
            )}
        </div>
    );
};

export default InputField;
