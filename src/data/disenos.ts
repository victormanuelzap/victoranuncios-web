// src/data/disenos.ts

export const categorias = [
  {
    slug: 'exterior-interior',
    nombre: 'Exterior / Interior',
    descripcion: 'Letreros luminosos, letras 3D y cajas de luz.',
    imagen: '/Diseños/categorias/exterior-interior.webp',
    tags: ['Letreros', 'Letras 3D', 'Cajas de luz'],
  },
  {
    slug: 'vinilos',
    nombre: 'Vinilos y gráficos',
    descripcion: 'Vinilos para vitrinas, autos y murales.',
    imagen: '/Diseños/categorias/vinilos.webp',
    tags: ['Autos', 'Vitrinas', 'Paredes'],
  },
  {
    slug: 'impresos',
    nombre: 'Impresos',
    descripcion: 'Tarjetas, volantes, proformas, calendarios.',
    imagen: '/Diseños/categorias/impresos.webp',
    tags: ['Tarjetas', 'Volantes', 'Proformas'],
  },
  {
    slug: 'rubros',
    nombre: 'Por rubro',
    descripcion: 'Restaurantes, barberías, colegios y más.',
    imagen: '/Diseños/categorias/rubros.webp',
    tags: ['Restaurantes', 'Barberías', 'Colegios'],
  },
  {
    slug: 'colegios',
    nombre: 'Colegios',
    descripcion: 'Colegios, escuelas, CETPROS y más.',
    imagen: '/Diseños/categorias/colegios.webp', // cuando tengas una imagen propia
    tags: ['Colegios', 'Escuelas', 'Cetpros'],
  },
  {
    slug: 'Restaurantes',
    nombre: 'Restaurantes',
    descripcion: 'Carteles, menus, fondos.',
    imagen: '/Diseños/categorias/restaurantes.webp', // cuando tengas una imagen propia
    tags: ['sopas', 'comida', 'Cetpros'],
  },
]

export const disenos = [
  {
    id: 'vinilos-eer-01',
    titulo: 'Vinilo EER',
    imagen: 'Diseños/categorias/vinilos/eer.png',
    categoria: 'vinilos',
  },
  {
    id: 'vinilos-cevichop-01',
    titulo: 'Vinilo Cevichop',
    imagen: '/Diseños/categorias/vinilos/cevichop.webp',
    categoria: 'vinilos',
  },
  {
    id: 'vinilos-nuevo-amanecer',
    titulo: 'Vinilo para Grifo Nuevo Amanecer',
    imagen: '/Diseños/categorias/vinilos/grifo-nuevo.webp',
    categoria: 'vinilos',
  },
]
