const NEWS_STORAGE_KEY = 'azulNoticias';

/**
 * Las noticias iniciales permiten abrir el prototipo directamente desde un archivo.
 * Cuando se sirve con HTTP, se intenta leer el JSON local como fuente de arranque.
 */
const DEFAULT_NEWS = [
  { id: 'ciudad-agua', title: 'La ciudad que aprendió a leer el agua', summary: 'Un laboratorio ciudadano transforma datos de lluvia en decisiones cotidianas para los barrios.', body: 'En varios barrios, una red de sensores y cuadernos comunitarios permite anticipar cambios en los caudales. El proyecto no promete resolverlo todo: organiza información clara para que vecinos, escuelas y autoridades puedan actuar antes.\n\nLa iniciativa combina tecnología de bajo costo, formación y encuentros de escucha. Sus resultados más visibles no son las pantallas, sino las conversaciones que habilitan cuando la información deja de ser inaccesible.', category: 'Tecnología', date: '2026-08-18', author: 'Marina Rojas', readTime: '5 min de lectura', featured: true, image: { label: 'Datos y territorio', tone: 'blue' } },
  { id: 'aula-abierta', title: 'Aula abierta: aprender fuera del salón', summary: 'Tres docentes convierten recorridos de barrio en experiencias de aprendizaje con sentido local.', body: 'El museo, la plaza y el mercado se convirtieron en materiales de clase para un grupo de estudiantes que quería investigar su entorno. Cada salida comienza con una pregunta y termina con una pieza breve: un mapa, una entrevista o una historia sonora.\n\nLa propuesta parte de una idea sencilla: el aprendizaje se vuelve más significativo cuando permite observar, contrastar y contar lo que ocurre cerca.', category: 'Educación', date: '2026-08-15', author: 'Santiago León', readTime: '4 min de lectura', featured: true, image: { label: 'Educación cercana', tone: 'sky' } },
  { id: 'rutas-lentas', title: 'Rutas lentas para conocer otra ciudad', summary: 'Una guía colaborativa propone caminar con más tiempo y apoyar pequeños negocios locales.', body: 'La guía no busca acumular lugares, sino proponer trayectos posibles. Incluye recomendaciones de movilidad, comercios de barrio y relatos de quienes habitan cada zona.\n\nSu equipo revisa las rutas con frecuencia y publica criterios claros para cuidar los espacios visitados. Así, el viaje se entiende como una relación más responsable con el territorio.', category: 'Turismo', date: '2026-08-10', author: 'Laura Méndez', readTime: '6 min de lectura', featured: true, image: { label: 'Recorridos locales', tone: 'navy' } },
  { id: 'oficio-digital', title: 'El oficio digital también tiene barrio', summary: 'Emprendimientos creativos comparten recursos, contactos y una forma más humana de crecer.', body: 'Una red de talleres, diseñadores y comercios decidió intercambiar herramientas en vez de competir por atención. La plataforma que usan para coordinarse es simple: calendario, directorio y acuerdos visibles para todas las personas.\n\nEl valor está en la continuidad. Cada encuentro deja un recurso concreto para quien llegue después y fortalece una economía creativa de escala cercana.', category: 'Comercio', date: '2026-08-05', author: 'Daniela Ruiz', readTime: '5 min de lectura', featured: false, image: { label: 'Trabajo compartido', tone: 'blue' } },
  { id: 'biblioteca-viva', title: 'Una biblioteca que también escucha', summary: 'El préstamo de libros se une a clubes de lectura y acompañamiento para jóvenes lectores.', body: 'La biblioteca amplió sus horarios y creó una mesa donde los visitantes recomiendan lecturas entre sí. El catálogo sigue siendo central, pero ahora convive con preguntas, clubes y espacios para escribir.\n\nEl cambio se mide menos por el número de actividades y más por la gente que vuelve porque encontró una conversación que le pertenece.', category: 'Educación', date: '2026-07-28', author: 'Camilo Torres', readTime: '3 min de lectura', featured: false, image: { label: 'Lecturas compartidas', tone: 'sky' } },
  { id: 'mercado-cercano', title: 'Comprar cerca, decidir mejor', summary: 'Un directorio transparente reúne productores y comercios con información útil para comparar.', body: 'El directorio muestra origen, disponibilidad y formas de entrega sin esconder los datos relevantes. Los pequeños comercios pueden actualizar su información, y las personas encuentran opciones sin depender de publicidad invasiva.\n\nLa herramienta prioriza decisiones informadas: menos ruido, más contexto y relaciones comerciales que puedan sostenerse en el tiempo.', category: 'Comercio', date: '2026-07-22', author: 'Elena Pardo', readTime: '4 min de lectura', featured: false, image: { label: 'Comercio informado', tone: 'navy' } }
];

const cloneNews = (news) => news.map((item) => ({ ...item, image: { ...item.image } }));

async function getSeedNews() {
  if (location.protocol === 'file:') return cloneNews(DEFAULT_NEWS);

  try {
    const response = await fetch('data/noticias.json');
    if (!response.ok) throw new Error('No fue posible cargar el archivo JSON.');
    return await response.json();
  } catch {
    return cloneNews(DEFAULT_NEWS);
  }
}

async function getNews() {
  const stored = localStorage.getItem(NEWS_STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  const seed = await getSeedNews();
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function saveNews(news) {
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
}

function getNewsById(news, id) {
  return news.find((item) => item.id === id);
}
