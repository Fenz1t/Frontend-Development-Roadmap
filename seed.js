import mongoose from "mongoose";
import PlanetModel from "./models/Planet.js";

// Данные для тестирования
const seedData = [
  {
    name: "Mercury",
    order: 1,
    asteroids: [
      { name: "Asteroid 1", link: "http://example.com/asteroid1" },
      { name: "Asteroid 2", link: "http://example.com/asteroid2" },
    ],
  },
  {
    name: "Venus",
    order: 2,
    asteroids: [
      { name: "Asteroid A", link: "http://example.com/asteroidA" },
      { name: "Asteroid B", link: "http://example.com/asteroidB" },
    ],
  },
  {
    name: "Earth",
    order: 3,
    asteroids: [
      { name: "Asteroid X", link: "http://example.com/asteroidX" },
      { name: "Asteroid Y", link: "http://example.com/asteroidY" },
      { name: "Asteroid Z", link: "http://example.com/asteroidZ" },
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Подключение к MongoDB
    await mongoose.connect("mongodb+srv://fedakurakin:00006@cluster0.sf3qr.mongodb.net/roadmap?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected.");

    // Очистка коллекции перед добавлением новых данных
    await PlanetModel.deleteMany({});
    console.log("Collection cleared.");

    // Добавление данных в коллекцию
    await PlanetModel.insertMany(seedData);
    console.log("Data seeded successfully.");

    // Закрываем подключение к базе
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Запуск функции заполнения
seedDatabase();
