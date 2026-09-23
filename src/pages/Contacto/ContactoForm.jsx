import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { contactoSchema } from "./contactoSchema";

import FormInput from "./Componentes/Forminput";
import FormSelect from "./Componentes/FormSelect";
import FormTextArea from "./Componentes/FormTextArea";
import FormFile from "./Componentes/FormFile";

import paises from "./paises";
import ciudades from "./ciudades";

function ContactoForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(contactoSchema),
    mode: "onBlur",
    defaultValues: {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      genero: "",
      pais: "",
      ciudad: "",
      correo: "",
      telefono: "",
      mensaje: "",
      archivo: [],
    },
  });

  const onSubmit = async (data) => {
    // 1. Mostrar toast de carga mientras se envía
    const toastId = toast.loading("Enviando mensaje...");

    // 2. Preparar el FormData para Formspree (soporta texto y archivos)
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "archivo") {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((file) => formData.append("archivo", file));
        } else if (value && value instanceof File) {
          formData.append("archivo", value);
        }
      } else {
        formData.append(key, value || "");
      }
    });

    try {
      // 3. Petición POST al endpoint de Formspree definido en tu archivo .env
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast.success("¡Formulario enviado con éxito!", { id: toastId });
        reset(); // Resetea los campos y el componente de archivos
      } else {
        const resultado = await response.json();
        const mensajeError = resultado.errors
          ? resultado.errors.map((e) => e.message).join(", ")
          : "Ocurrió un error al enviar el formulario";

        toast.error(mensajeError, { id: toastId });
      }
    } catch (error) {
      console.error("Error de red al enviar el formulario:", error);
      toast.error("Error de red. Intenta de nuevo más tarde.", { id: toastId });
    }
  };

  const onError = (errores) => {
    console.log("Errores de validación:", errores);
    const primerError = Object.values(errores)[0];
    toast.error(primerError?.message || "Revisa los campos del formulario", {
      id: "form-error",
    });
  };

  const opcionesGenero = ["Femenino", "Masculino", "Otro", "Prefiero no decir"];

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Primer Nombre"
          name="primerNombre"
          placeholder="Escribe tu primer nombre"
          required
          {...register("primerNombre")}
        />
        <FormInput
          label="Segundo Nombre"
          name="segundoNombre"
          placeholder="Escribe tu segundo nombre"
          {...register("segundoNombre")}
        />
        <FormInput
          label="Primer Apellido"
          name="primerApellido"
          placeholder="Escribe tu primer apellido"
          required
          {...register("primerApellido")}
        />
        <FormInput
          label="Segundo Apellido"
          name="segundoApellido"
          placeholder="Escribe tu segundo apellido"
          {...register("segundoApellido")}
        />
        <FormSelect
          label="Género"
          name="genero"
          options={opcionesGenero}
          required
          {...register("genero")}
        />
        <FormSelect
          label="País"
          name="pais"
          options={paises}
          required
          {...register("pais")}
        />
        <FormSelect
          label="Ciudad"
          name="ciudad"
          options={ciudades}
          required
          {...register("ciudad")}
        />
        <FormInput
          label="Correo"
          name="correo"
          type="email"
          placeholder="ejemplo@correo.com"
          required
          {...register("correo")}
        />
        <FormInput
          label="Teléfono"
          name="telefono"
          type="tel"
          placeholder="300 000 0000"
          required
          {...register("telefono")}
        />
      </div>

      <div className="mt-6">
        <FormTextArea
          label="Mensaje"
          name="mensaje"
          placeholder="Escribe tu mensaje aquí..."
          required
          {...register("mensaje")}
        />
      </div>

      <div className="mt-6">
        <FormFile
          label="Adjuntar archivo"
          name="archivo"
          setValue={setValue}
          control={control}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;