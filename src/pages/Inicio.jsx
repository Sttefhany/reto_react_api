import hero from "../assets/hero.png";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import reactRouter from "../assets/react_router.png";
import tailwindcss from "../assets/tailwind_css.png";

function Inicio() {
  const tecnologias = [
    {
      nombre: "React",
      descripcion: "Biblioteca para construir interfaces de usuario.",
      imagen: reactLogo,
    },
    {
      nombre: "Vite",
      descripcion: "Herramienta moderna para desarrollar aplicaciones frontend.",
      imagen: viteLogo,
    },
    {
      nombre: "Tailwind CSS",
      descripcion: "Framework CSS basado en clases de utilidad.",
      imagen: tailwindcss,
    },
    {
      nombre: "React Router",
      descripcion: "Librería para gestionar la navegación de la aplicación.",
      imagen: reactRouter,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* HERO */}
      <section className="bg-slate-900/90 dark:bg-slate-900/80 backdrop-blur-sm text-white border-b border-slate-200 dark:border-slate-800 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <img
            src={hero}
            alt="React705"
            className="w-40 h-auto mb-6 object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400">
            ¡Bienvenidos a React705!
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-slate-300 mb-6">
            Un espacio creado para aprender a desarrollar aplicaciones web modernas utilizando React y Vite.
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2.5 rounded-lg transition duration-300 shadow-lg shadow-cyan-500/30">
            Comenzar a aprender
          </button>
        </div>
      </section>

      {/* TECNOLOGÍAS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
          Tecnologías utilizadas
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-10 text-sm">
          Este proyecto integra diferentes tecnologías y librerías utilizadas actualmente en el desarrollo frontend.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologias.map((tecnologia) => (
            <div
              key={tecnologia.nombre}
              className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center flex flex-col items-center shadow-lg transition-colors duration-300"
            >
              <div className="w-full h-28 mb-4 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-2">
                <img
                  src={tecnologia.imagen}
                  alt={tecnologia.nombre}
                  className="max-h-20 max-w-20 object-contain"
                />
              </div>

              <h3 className="text-lg font-bold mb-2 text-cyan-600 dark:text-cyan-400">
                {tecnologia.nombre}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                {tecnologia.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-200 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-center py-6 border-t border-slate-300 dark:border-slate-800 text-xs transition-colors duration-300">
        <p>React705 · Aprendiendo desarrollo web moderno</p>
      </footer>
    </main>
  );
}

export default Inicio;