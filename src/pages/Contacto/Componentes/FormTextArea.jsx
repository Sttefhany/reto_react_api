import { forwardRef } from "react";

const FormTextArea = forwardRef(
  ({ label, name, placeholder, required, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={name} className="font-semibold text-slate-700 text-sm">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          {...rest}
        />
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";
export default FormTextArea;