const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
  },
  subcategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "subCategoryList",
    },
  ],
});
module.exports = mongoose.model("categoryList", categorySchema);
