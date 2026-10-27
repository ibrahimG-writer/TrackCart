
import mockProducts from "../data/mockProducts";

// Temporary data source for frontend development.
// Replace these functions with API requests when the backend is ready.

export async function getProducts() {
  return mockProducts;
}

export async function getProductById(id) {
  return (
    mockProducts.find((product) => String(product.id) === String(id)) ??
    null
  );
}

export async function getNewArrivals() {
  return mockProducts.filter((product) => product.isNew);
}

export async function getProductsByCategory(category) {
  return mockProducts.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );
}
