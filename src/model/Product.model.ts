import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  quantity: number;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  user: string;
}

export const ProductModel = getModelForClass(Product);
