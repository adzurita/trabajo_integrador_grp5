import Swal from "sweetalert2";

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

export const createProduct = async (product) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    console.log("🚀 ~ createProduct ~ response:", response);
    if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ya existe un producto con este nombre.",
      });
      throw new Error("Ya existe un producto con este nombre.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
