import Swal from "sweetalert2";

const URL = "http://localhost:8080/products";


// Get all products
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

// Create product
export const createProduct = async (product) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.status === 400) {
      const responseText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: responseText,
      });
      return;
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}