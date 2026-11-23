// Todos los números son ilustrativos: el pie de la página lo dice y un test lo
// verifica. Los montos llevan espacios duros para que «US$ 25 M» no se corte.

export type Nivel = "probable" | "grave" | "catastrofico";
export type Banda = "baja" | "media" | "alta" | "critica";
export type Parte = "parada" | "reputacion" | "propiedad" | "multas" | "respuesta";

export type Dato =
  | { tipo: "cifra"; valor: number; decimales?: number; prefijo?: string; sufijo?: string; nota: string }
  | { tipo: "texto"; texto: string; nota: string };

export type Escenario = {
  id: Nivel;
  rotulo: string;
  titulo: string;
  texto: string;
  monto: string;
  probabilidad: string;
  // Escala de 1 a 5 en los dos ejes de la matriz.
  posicion: { probabilidad: number; impacto: number };
};

export const portada = {
  marca: "DupreST",
  tipo: "Evaluación de riesgo de ciberseguridad",
  ficha: [
    { rotulo: "Preparado para", valor: "YPF" },
    { rotulo: "Activo", valor: "Portal de telemetría de campo" },
  ],
  titular: {
    antes: "Un servidor sin parchear, y el control de la operación ",
    enfasis: "en juego",
    despues: ".",
  },
  bajada:
    "Auditamos el portal interno de gestión y telemetría de las instalaciones de campo. Encontramos una vía por la que un atacante, sin usuario ni contraseña, toma control total del servidor desde internet.",
  cifra: {
    valor: 25,
    prefijo: "US$ ",
    sufijo: " M",
    nota: "de riesgo total modelado para el escenario auditado",
  },
  datos: [
    { tipo: "cifra", valor: 9.8, decimales: 1, nota: "Severidad CVSS sobre 10: crítica" },
    { tipo: "cifra", valor: 95, sufijo: " %", nota: "Menos riesgo con la mitigación" },
    { tipo: "texto", texto: "1 servidor", nota: "La puerta a toda la red interna" },
  ] satisfies Dato[],
};

export const activo = {
  rotulo: "El activo",
  titulo: "La ventana a la operación de campo.",
  texto:
    "El servidor atiende el portal de gestión y telemetría de las instalaciones: pozos, ductos y plantas. No es «una página»: es lo que deja ver qué pasa en el territorio, y la puerta de entrada a la red interna.",
  rotuloLista: "Lo que queda expuesto",
  expuesto: [
    { nombre: "Telemetría y control de campo", detalle: "Pozos de Vaca Muerta, ductos y plantas" },
    { nombre: "Datos de producción en tiempo real", detalle: "Caudales, presiones y volúmenes" },
    { nombre: "Propiedad intelectual", detalle: "Estudios geológicos y sísmicos, proyectos de I+D" },
    { nombre: "Bases internas", detalle: "Clientes, proveedores, empleados y finanzas" },
    {
      nombre: "Credenciales corporativas",
      detalle: "Acceso a la red interna y, en el peor caso, a la red de control industrial",
    },
  ],
};

export const hallazgo = {
  rotulo: "El hallazgo",
  titulo: "De un escaneo anónimo al control total, en minutos.",
  texto:
    "La falla es pública desde 2021 y se sigue explotando en internet. No hace falta robar una contraseña ni engañar a un empleado: alcanza con encontrar el servidor.",
  tecnico: "Apache 2.4.49 · CVE-2021-41773 · CVSS 9,8",
  pasos: [
    { momento: "0 min", hecho: "Un escaneo automático detecta la versión desactualizada." },
    { momento: "2 min", hecho: "El atacante lee archivos internos del sistema." },
    { momento: "5 min", hecho: "Ejecuta comandos en el servidor." },
    { momento: "15 min", hecho: "Abre un acceso propio y se mueve hacia la red interna." },
    { momento: "Horas o días", hecho: "Roba datos o cifra los sistemas para pedir rescate." },
  ],
};

export const escenarios = {
  rotulo: "Escenarios de pérdida",
  titulo: "Tres niveles de daño, de lo esperable a la cola de riesgo.",
  niveles: [
    {
      id: "probable",
      rotulo: "Probable",
      titulo: "Fuga de datos y ransomware",
      texto: "Robo de información confidencial y cifrado de sistemas que frena parte de la producción.",
      monto: "US$ 5–10 M",
      probabilidad: "Probabilidad alta",
      posicion: { probabilidad: 4, impacto: 3 },
    },
    {
      id: "grave",
      rotulo: "Grave",
      titulo: "Parada extendida y daño reputacional",
      texto: "Producción detenida durante días, caída de la acción y multas regulatorias.",
      monto: "US$ 15–25 M",
      probabilidad: "Probabilidad media",
      posicion: { probabilidad: 3, impacto: 4 },
    },
    {
      id: "catastrofico",
      rotulo: "Catastrófico",
      titulo: "Salto a la red de control industrial",
      texto:
        "Si el servidor hace de puente hacia la red OT/SCADA, el incidente pasa a ser físico: un derrame, contaminación o una parada de emergencia.",
      monto: "Incalculable",
      probabilidad: "Probabilidad baja · impacto máximo",
      posicion: { probabilidad: 2, impacto: 5 },
    },
  ] satisfies Escenario[],
  matriz: {
    titulo: "Dónde cae cada escenario.",
    texto:
      "La falla se explota hoy en internet: no es teórica. Por eso los escenarios probable y grave caen en la zona crítica, y el catastrófico queda alto aun siendo improbable.",
    probabilidad: ["Muy baja", "Baja", "Media", "Alta", "Muy alta"],
    impacto: ["Menor", "Moderado", "Alto", "Severo", "Extremo"],
    bandas: [
      { id: "baja", nombre: "Riesgo bajo" },
      { id: "media", nombre: "Riesgo medio" },
      { id: "alta", nombre: "Riesgo alto" },
      { id: "critica", nombre: "Riesgo crítico" },
    ] satisfies { id: Banda; nombre: string }[],
  },
};

export const impacto = {
  rotulo: "Composición del impacto",
  titulo: "A dónde va el daño si el ataque prospera.",
  texto:
    "La parada de producción se lleva la mayor parte de la pérdida, seguida del golpe reputacional y del robo de propiedad intelectual. Cada categoría es un costo real para una energética de esta escala.",
  total: "US$ 25 M",
  partes: [
    { id: "parada", nombre: "Parada de producción", porcentaje: 40 },
    { id: "reputacion", nombre: "Reputación y caída bursátil", porcentaje: 25 },
    { id: "propiedad", nombre: "Robo de propiedad intelectual", porcentaje: 20 },
    { id: "multas", nombre: "Multas y regulatorio", porcentaje: 10 },
    { id: "respuesta", nombre: "Respuesta al incidente y rescate", porcentaje: 5 },
  ] satisfies { id: Parte; nombre: string; porcentaje: number }[],
};

export const prevencion = {
  rotulo: "Prevención vs. incidente",
  titulo: "Lo que cuesta evitarlo contra lo que cuesta sufrirlo.",
  prevenir: { rotulo: "Prevenir: auditoría y parche", monto: 50_000, texto: "US$ 50 k" },
  sufrir: { rotulo: "Sufrir el incidente", monto: 25_000_000, texto: "US$ 25 M" },
  relacion: "1 : 500",
  texto: "Por cada dólar invertido en cerrar la vía de entrada, se ponen en juego quinientos si el ataque ocurre.",
  rotuloReferencias: "Referencias de la industria",
  referencias: [
    { cifra: "US$ 4,7 M", texto: "cuesta en promedio una brecha de datos en el sector energía." },
    { cifra: "US$ 2–5 M", texto: "por día de parada no planificada deja de facturar una operación de esta escala." },
    {
      cifra: "US$ 4,4 M",
      texto: "pagó Colonial Pipeline de rescate en 2021, con el combustible de la costa este de EE. UU. paralizado.",
    },
  ],
};

export const propuesta = {
  rotulo: "Nuestra propuesta",
  titulo: "Defensa en capas. Ninguna sola alcanza.",
  capas: [
    { nombre: "Actualizar y parchear", detalle: "Cierra la falla de raíz, con una política para el próximo boletín crítico." },
    { nombre: "Endurecer el servidor", detalle: "Denegar por defecto, desactivar módulos innecesarios, mínimo privilegio." },
    { nombre: "Perímetro y red", detalle: "Cerrar puertos, un WAF que normaliza antes de filtrar y filtrado de salida." },
    { nombre: "Monitoreo continuo", detalle: "Escaneos periódicos y vigilancia de registros para ver venir el próximo intento." },
  ],
  cierre: "Por una fracción del costo de un solo día de incidente, le sacamos la vía de entrada.",
  llamado: "Trabajemos juntos.",
};

export const pie = {
  aviso: "Escenario ilustrativo basado en benchmarks de la industria. No representa datos reales de YPF.",
  firma: "DupreST · Evaluación de ciberseguridad · CVE-2021-41773 · OWASP A06 y A05",
};
