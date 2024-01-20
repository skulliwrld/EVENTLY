// import { Schema, models, model} from "mongoose";

// export interface Icategory extends Document{
//     _id:string
//     name:string
// }

// const categorySchema = new Schema({
//     name:{type:String, required:true, unique:true},
// })

// export const Category = models.Category || model("Category", categorySchema)

import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const Category = models.Category || model('Category', CategorySchema);

export default Category;