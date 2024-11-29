import mongoose from "mongoose";

const AsteroidSchema = new mongoose.Schema({
    name: String,
    link: String,
    isCompleted: { type: Boolean, default: false },
  });
  
  const PlanetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    order: { type: Number, required: true },
    asteroids: [AsteroidSchema],
  });

  
  // Экспорт моделей по умолчанию
  const PlanetModel = mongoose.model("Planet", PlanetSchema);
  export default PlanetModel;
  

  

