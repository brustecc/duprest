// La D de DupreST con el ojo de la cerradura calado: la promesa del pitch es
// cerrar la vía de entrada. El viewBox ajusta justo a la marca, así que se
// dimensiona por alto y el ancho sale solo.
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="8 6 34 36" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 6h16a18 18 0 0 1 0 36H8zM24 14.5a5.5 5.5 0 0 0-3 10.1L19 33h10l-2-8.4a5.5 5.5 0 0 0-3-10.1z"
      />
    </svg>
  );
}
