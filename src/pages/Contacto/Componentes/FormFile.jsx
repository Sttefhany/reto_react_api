import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { useWatch } from "react-hook-form"; // Importamos useWatch

function FormFile({
  label = "Adjuntar archivo...",
  maxFiles = 3,
  setValue,
  control, 
  name = "archivo",
  accept = {}
}) {
  const [archivos, setArchivos] = useState([]);
  const [mensajeEliminado, setMensajeEliminado] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Observamos el campo archivo gestionado por React Hook Form
  const archivoValor = useWatch({ control, name });

  // Si el formulario se resetea (archivoValor vuelve a estar vacío o []), limpia los archivos locales
  useEffect(() => {
    if (Array.isArray(archivoValor) && archivoValor.length === 0 && archivos.length > 0) {
      archivos.forEach((arch) => {
        if (arch.preview) URL.revokeObjectURL(arch.preview);
      });
      setArchivos([]);
    }
  }, [archivoValor]);

  const espacioDisponible = maxFiles - archivos.length;
  const limiteAlcanzado = espacioDisponible <= 0;

  const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;

  useEffect(() => {
    if (setValue) {
      setValue(name, archivos, { shouldValidate: true });
    }
  }, [archivos, setValue, name]);

  useEffect(() => {
    if (mensajeEliminado) {
      const timer = setTimeout(() => {
        setMensajeEliminado("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeEliminado]);

  const onDrop = (acceptedFiles) => {
    setErrorMsg("");

    if (espacioDisponible <= 0) {
      setErrorMsg(`Ya alcanzaste el máximo de ${maxFiles} archivos`);
      return;
    }

    if (acceptedFiles.length > espacioDisponible) {
      setErrorMsg(`Solo se agregaron ${espacioDisponible} archivo(s). El resto superaba el límite.`);
    }

    const archivosAceptar = acceptedFiles.slice(0, espacioDisponible);

    const nuevosArchivos = archivosAceptar.map((file) => {
      const esImagen = file.type.startsWith("image/");
      return {
        id: generarId(file),
        file: file,
        preview: esImagen ? URL.createObjectURL(file) : null,
      };
    });

    setArchivos((anteriores) => [...anteriores, ...nuevosArchivos]);
  };

  const onDropRejected = (fileRejections) => {
    if (fileRejections.length > 0) {
      setErrorMsg("Formato de archivo no permitido.");
    }
  };

  const eliminarArchivo = (id) => {
    setArchivos((anteriores) => {
      const archivoAEliminar = anteriores.find((arch) => arch.id === id);

      if (archivoAEliminar) {
        if (archivoAEliminar.preview) {
          URL.revokeObjectURL(archivoAEliminar.preview);
        }
        setMensajeEliminado(`Archivo "${archivoAEliminar.file.name}" eliminado con éxito.`);
      }

      return anteriores.filter((arch) => arch.id !== id);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: true,
    maxFiles: maxFiles,
    disabled: limiteAlcanzado,
    accept,
  });

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
      <label className="font-semibold text-slate-700">{label}</label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
          limiteAlcanzado
            ? "border-slate-200 bg-slate-100 cursor-not-allowed opacity-60"
            : isDragActive
            ? "border-sky-500 bg-sky-50 cursor-pointer"
            : "border-sky-400 cursor-pointer hover:bg-sky-50/30"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-3xl mb-2">📄</div>

        {limiteAlcanzado ? (
          <p className="text-slate-500 font-medium">
            Límite alcanzado ({maxFiles} de {maxFiles} archivos)
          </p>
        ) : isDragActive ? (
          <p className="text-sky-600 font-medium">Suelta los archivos aquí...</p>
        ) : (
          <>
            <p className="font-medium text-slate-700">Arrastra tus archivos aquí</p>
            <p className="text-xs text-slate-400 mt-1">
              Disponibles: {espacioDisponible} de {maxFiles} espacio(s)
            </p>
          </>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {mensajeEliminado && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium transition-all">
          {mensajeEliminado}
        </div>
      )}

      {archivos.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-700 text-sm">
            Archivos seleccionados ({archivos.length}/{maxFiles}):
          </h4>

          {archivos.map((archivo) => (
            <div
              key={archivo.id}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-4"
            >
              <div className="text-sm text-slate-700 space-y-0.5">
                <p><strong>Nombre:</strong> {archivo.file.name}</p>
                <p><strong>Tipo:</strong> {archivo.file.type || "Desconocido"}</p>
                <p><strong>Tamaño:</strong> {(archivo.file.size / 1024).toFixed(2)} KB</p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                {archivo.preview ? (
                  <img
                    src={archivo.preview}
                    alt={archivo.file.name}
                    className="w-20 h-20 object-cover rounded-lg border border-slate-300 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-500 font-medium">
                    PDF 📄
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => eliminarArchivo(archivo.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-700 hover:bg-slate-800 rounded-md transition cursor-pointer"
                >
                  Eliminar 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormFile;