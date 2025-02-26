const URL = "http://localhost:8080/products";

export const getProducts = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
