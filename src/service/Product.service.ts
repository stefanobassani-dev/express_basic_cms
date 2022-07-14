import { Product, ProductModel } from "../model/Product.model";

export async function createProduct(
  payload: Omit<Product, "user">,
  userId: string
) {
  const product = { ...payload, user: userId };

  return await ProductModel.create(product);
}

export async function getProducts(id: string) {
  return await ProductModel.find({ user: id });
}

export async function deleteProduct(id: string) {
  return await ProductModel.deleteOne({ _id: id });
}
