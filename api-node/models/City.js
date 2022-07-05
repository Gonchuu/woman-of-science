import mongoose from "mongoose";

const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    name: { type: String, required: true },
    characters: [{ type: mongoose.Types.ObjectId, ref: 'Character' }],
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model('City', citySchema);
export { City };
