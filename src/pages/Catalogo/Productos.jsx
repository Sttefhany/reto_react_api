import { useState } from "react";
import { useCharacters } from "../../hooks/useCharacter";
import CharacterCard from "../../components/Catalogo/CharacterCard";

function Productos() {
  const { personajes, cargando, error } = useCharacters(12);

  //Estado de paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const personajesPorPagina = 8; // Define cuántos elementos quieres ver por página

  // Lógica para recortar los personajes según la página actual
  const indiceUltimo = paginaActual * personajesPorPagina;
  const indicePrimer = indiceUltimo - personajesPorPagina;
  const personajesVisibles = personajes ? personajes.slice(indicePrimer, indiceUltimo) : [];
  
  //Cálculo del total de páginas
  const totalPaginas = personajes ? Math.ceil(personajes.length / personajesPorPagina) : 0;

  return (
    <section className="bg-slate-50 min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900">Explora la diversidad del mundo marino</h2>
        <p className="text-slate-500 mt-2">
          Sumérgete en nuestro catálogo interactivo y descubre una cuidada selección de especies acuáticas. Explora sus detalles taxonómicos, clasificaciones biológicas y características únicas en tiempo real. ¡Encuentra la especie ideal para tu acuario o proyecto hoy mismo!
        </p>

        {cargando && (
          <p className="mt-10 text-center text-slate-500 font-medium">
            Cargando personajes...
          </p>
        )}

        {error && (
          <p className="mt-10 text-center text-rose-500 font-medium">
            {error}
          </p>
        )}

        {!cargando && !error && (
          <>
            {/* Grid mapeando únicamente personajesVisibles */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {personajesVisibles.map((personaje) => (
                <CharacterCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            {/* Controles de Paginación */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  type="button"
                  onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                  disabled={paginaActual === 1}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Anterior
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: totalPaginas }, (_, index) => {
                    const numeroPagina = index + 1;
                    return (
                      <button
                        key={numeroPagina}
                        type="button"
                        onClick={() => setPaginaActual(numeroPagina)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold text-sm transition-all cursor-pointer ${
                          paginaActual === numeroPagina
                            ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        {numeroPagina}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                  disabled={paginaActual === totalPaginas}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Productos;