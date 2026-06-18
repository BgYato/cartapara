/**
 * Prefija la ruta de un asset público con la BASE_URL de Vite.
 * En desarrollo: '/'  →  En producción (GitHub Pages): '/cartapara/'
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
