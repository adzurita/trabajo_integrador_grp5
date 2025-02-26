import { getProducts } from "./productService";
import { useDataProvider } from 'react-admin';

const dataProvider = useDataProvider();

const customDataProvider = {
    dataProvider.getList: async (resource, params) => {
    try {
      const products = await getProducts();
      
      // Transformamos la data para que sea compatible con react-admin
      const transformedData = products.map((product) => ({
        id: product.id,
        Nombre: product.name,
        Destino: product.destination || "No especificado", // Agrega un valor por defecto si falta
        Descripción: product.description,
        Precio: `${product.price} USD`,
        Duración: product.duration || "No especificado",
        Categoría: product.category || "General",
        Imagenes: product.imageSet?.map((img) => img.imageUrl) || [],
        Status: product.status || "Disponible",
      }));

      return {
        data: transformedData,
        total: transformedData.length,
      };
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      throw new Error("No se pudieron cargar los productos.");
    }
  },

  getOne: async (resource, params) => {
    try {
      const products = await getProducts();
      const product = products.find((p) => p.id === params.id);

      if (!product) {
        throw new Error(`No se encontró el producto con ID ${params.id}`);
      }

      return { data: product };
    } catch (error) {
      console.error("Error obteniendo producto:", error);
      throw new Error("No se pudo obtener el producto.");
    }
  },

  create: async (resource, params) => {
    // Implementar lógica para enviar un nuevo producto a la API
    console.log("Crear producto:", params.data);
    return { data: { ...params.data, id: Date.now() } };
  },

  update: async (resource, params) => {
    // Implementar lógica para actualizar un producto en la API
    console.log("Actualizar producto:", params.data);
    return { data: params.data };
  },

  delete: async (resource, params) => {
    // Implementar lógica para eliminar un producto en la API
    console.log("Eliminar producto con ID:", params.id);
    return { data: params.previousData };
  },
};

export default customDataProvider;
