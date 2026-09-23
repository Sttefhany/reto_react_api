function Tortuga({ posicion }) {
  return (
    <div
      style={{
        transform: `translateX(${posicion}px)`,
        transition: "transform 0.2s ease-out",
        fontSize: "4rem",
        filter: "drop-shadow(0px 6px 8px rgba(0,0,0,0.4))",
      }}
    >
      🐢
    </div>
  );
}

export default Tortuga;