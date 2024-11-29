import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  planetId: { type: mongoose.Schema.Types.ObjectId, ref: "Planet" }, // ID планеты
  asteroidId: { type: mongoose.Schema.Types.ObjectId }, // ID астероида
  isCompleted: { type: Boolean, default: false }, // Статус выполнения
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    progress: [progressSchema], 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
