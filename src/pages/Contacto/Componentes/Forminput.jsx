import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ label, name, type = "text", placeholder, required, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={name} className="font-semibold text-slate-700 text-sm">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          {...rest}
        />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;