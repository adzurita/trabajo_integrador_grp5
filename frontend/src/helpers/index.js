
export const validateCreationProduct = (values) => {
  const errors = {};
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;

  if (
    !values.Imagenes ||
    !Array.isArray(values.Imagenes) ||
    values.Imagenes.some((img) => !urlPattern.test(img))
  ) {
    errors.Imagenes = "Todas las imágenes deben ser URLs válidas.";
  }

  if (!values.Nombre || values.Nombre.length < 5) {
    errors.Nombre = "El nombre debe tener al menos 5 caracteres.";
  }

  if (!values.Descripcion || values.Descripcion.length < 5) {
    errors.Descripcion = "La descripción debe tener al menos 5 caracteres.";
  }

  if (!values.Precio || isNaN(Number(values.Precio))) {
    errors.Precio = "El precio debe ser un número válido.";
  }

  return errors;
};


