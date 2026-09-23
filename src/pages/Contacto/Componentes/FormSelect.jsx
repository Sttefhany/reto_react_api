import { forwardRef } from "react";

const FormSelect = forwardRef(
  ({ label, name, options = [], required, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={name} className="font-semibold text-slate-700 text-sm">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={name}
          name={name}
          className="border border-slate-300 rounded-lg px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          {...rest}
        >
          <option value="">Selecciona una opción</option>
          {options.map((opt, idx) => {
            const val = typeof opt === "object" ? opt.value || opt.nombre : opt;
            const labelOpt = typeof opt === "object" ? opt.label || opt.nombre : opt;
            return (
              <option key={idx} value={val}>
                {labelOpt}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
export default FormSelect;