export const validatePostCreation = (values) => {
  const errors = {};
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;

  if (!values.imagenes || !Array.isArray(values.imagenes) || values.imagenes.some((img) => !urlPattern.test(img))) {
    errors.imagenes = "Todas las imágenes deben ser URLs válidas.";
  }

  if (!values.nombre || values.nombre.length < 5) {
    errors.nombre = "El nombre debe tener al menos 5 caracteres.";
  }

  if (!values.descripcion || values.descripcion.length < 5) {
    errors.descripcion = "La descripción debe tener al menos 5 caracteres.";
  }

  if (!values.precio || isNaN(Number(values.precio))) {
    errors.precio = "El precio debe ser un número válido.";
  }

  return errors;
};
