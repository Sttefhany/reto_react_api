import { useState, useMemo } from "react";
import Tortuga from "./Tortuga";
import BotonDerecho from "./BotonDerecho";
import BotonIzquierdo from "./BotonIzquierdo";
import BotonInicio from "./BotonInicio";
import "./Escenario.css";

// Lista de emojis que se renderizan perfectamente sin mostrar cuadros blancos
const FAUNA_MARINA = ["🐙", "🐠", "🐟", "🐬", "🦑", "🦀", "🐚", "🦪", "⭐"];

function Escenario() {
  const [posicion, setPosicion] = useState(0);

  const elementosMarinos = useMemo(() => {
    return FAUNA_MARINA.map((emoji, index) => ({
      id: index,
      emoji,
      top: `${Math.floor(Math.random() * 70) + 10}%`,
      left: `${Math.floor(Math.random() * 85) + 5}%`,
      size: `${(Math.random() * 0.6 + 1.4).toFixed(1)}rem`,
    }));
  }, []);

  function moverDerecha() {
    if (posicion >= 320) {
      setPosicion(325);
    } else {
      setPosicion(posicion + 10);
    }
  }

  function moverIzquierda() {
    if (posicion <= -320) {
      setPosicion(-325);
    } else {
      setPosicion(posicion - 10);
    }
  }

  function moverInicio() {
    setPosicion(0);
  }

  return (
    <div className="escenario-contenedor">
      <h2 className="titulo-marino">🌊 Carrera de Sra. Tortuguín 🌊</h2>

      <div className="oceano">
        {elementosMarinos.map((item) => (
          <span
            key={item.id}
            className="elemento-marino"
            style={{
              top: item.top,
              left: item.left,
              fontSize: item.size,
            }}
          >
            {item.emoji}
          </span>
        ))}

        <div className="carril-nado">
          <Tortuga posicion={posicion} />
        </div>
      </div>

      <div className="botones-contenedor">
        <BotonIzquierdo mover={moverIzquierda} />
        <BotonInicio mover={moverInicio} />
        <BotonDerecho mover={moverDerecha} />
      </div>

      <h3 className="contador-posicion">
        📍 Posición de Sra. Tortuguín: <strong>{posicion} px</strong>
      </h3>
    </div>
  );
}

export default Escenario;