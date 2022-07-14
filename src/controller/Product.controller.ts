import { Request, Response } from "express";
import { DeleteProductInput, ProductInput } from "../schema/Product.schema";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../service/Product.service";
import { getUserByEmail } from "../service/User.service";

export async function createProductHandler(
  req: Request<{}, {}, ProductInput>,
  res: Response
) {
  const user = res.locals.user;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const retrievedUser = await getUserByEmail(user.email);

  if (!retrievedUser) return res.status(401).json({ message: "Unauthorized" });

  const body = req.body;

  try {
    const product = await createProduct(body, retrievedUser._id);
    return res.status(200).json({ message: "Product successfully created" });
  } catch (err: any) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Product already exists" });

    return res.status(500).json({ err });
  }
}

export async function getProductsHandler(req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const retrievedUser = await getUserByEmail(user.email);

  if (!retrievedUser) return res.status(401).json({ message: "Unauthorized" });

  try {
    const products = await getProducts(retrievedUser._id);
    return res.status(200).json({ products });
  } catch (err: any) {
    return res.status(500).json({ err });
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput, {}, {}>,
  res: Response
) {
  const id = req.params.id;

  try {
    const deletedProduct = await deleteProduct(id);
    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (err: any) {
    return res.status(500).json({ err });
  }
}
