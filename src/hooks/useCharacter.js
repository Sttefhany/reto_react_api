import { useState, useEffect } from "react";

const RANGO_PRECIO = { min: 7000, max: 50000 };

function precioAleatorio() {
  return (
    Math.floor(Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)) +
    RANGO_PRECIO.min
  );
}

export function useCharacters(limit = 12) {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarEspeciesMarinas() {
      try {
        setCargando(true);
        setError(null);

        // API pública de INaturalist para especies del filo marino (Mollusca, Pisces, etc.)
        const res = await fetch(
          `https://api.inaturalist.org/v1/taxa?taxon_id=47178&per_page=${limit}&is_active=true`
        );

        if (!res.ok) throw new Error("No se pudo conectar con la API de vida marina");

        const data = await res.json();

        // Mapeo adaptado exactamente a las props de tu CharacterCard
        const especiesTransformadas = data.results.map((especie) => ({
          id: especie.id,
          name: especie.preferred_common_name || especie.name,
          status: "Alive", // Mantiene el badge verde
          species: especie.name, // Nombre científico (ej: Delphinus delphis)
          gender: especie.rank ? especie.rank.toUpperCase() : "Marina",
          image:
            especie.default_photo?.medium_url ||
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80",
          primeraAparicion: especie.iconic_taxon_name || "Océano Global",
          precio: precioAleatorio(),
        }));

        if (activo) setPersonajes(especiesTransformadas);
      } catch (err) {
        if (activo) setError("Error al cargar las especies marinas");
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarEspeciesMarinas();

    return () => {
      activo = false;
    };
  }, [limit]);
  return { personajes, cargando, error };
}