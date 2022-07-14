import { Express } from "express";
import userRoutes from "../routes/User.route";
import productsRoutes from "../routes/Products.route";

export function routes(app: Express) {
  app.use("/api/user", userRoutes);
  app.use("/api/products", productsRoutes);
}
