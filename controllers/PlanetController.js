import PlanetModel from "../models/Planet.js";
import UserModel from "../models/User.js";

// Получить прогресс пользователя
export const getUserPlanets = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const planets = await PlanetModel.find();

    //ответ с учётом прогресса пользователя
    const userProgress = user.progress || [];
    const result = planets.map((planet) => {
      const planetProgress = userProgress.filter(
        (p) => p.planetId.equals(planet._id)
      );

      const isUnlocked = planet.order === 1 || planetProgress.some((p) => p.isCompleted);
      return {
        ...planet.toObject(),
        isUnlocked,
        asteroids: planet.asteroids.map((asteroid) => {
          const asteroidProgress = planetProgress.find(
            (p) => p.asteroidId && p.asteroidId.equals(asteroid._id)
          );
          return {
            ...asteroid.toObject(),
            isCompleted: asteroidProgress ? asteroidProgress.isCompleted : false,
          };
        }),
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении прогресса" });
  }
};

// Завершение астероида
export const completeAsteroid = async (req, res) => {
  const { userId, planetId, asteroidId } = req.body;

  try {
    const planet = await PlanetModel.findById(planetId);
    if (!planet) {
      return res.status(404).json({ message: "Планета не найдена" });
    }

    const asteroid = planet.asteroids.id(asteroidId);
    if (!asteroid) {
      return res.status(404).json({ message: "Астероид не найден" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Обновляем прогресс пользователя
    const progressEntry = user.progress.find(
      (p) => p.planetId.equals(planetId) && p.asteroidId.equals(asteroidId)
    );

    if (progressEntry) {
      progressEntry.isCompleted = true;
    } else {
      user.progress.push({ planetId, asteroidId, isCompleted: true });
    }

    // Проверяем, завершены ли все астероиды текущей планеты
    const planetProgress = user.progress.filter((p) => p.planetId.equals(planetId));
    const allCompleted = planet.asteroids.every((asteroid) =>
      planetProgress.some(
        (p) => p.asteroidId.equals(asteroid._id) && p.isCompleted
      )
    );

    if (allCompleted) {
      // Разблокируем следующую планету
      const nextPlanet = await PlanetModel.findOne({ order: planet.order + 1 });
      if (nextPlanet) {
        user.progress.push({ planetId: nextPlanet._id, isCompleted: false });
        await user.save();
      }
    }

    await user.save();
    res.json({ message: "Прогресс обновлён" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при завершении астероида" });
  }
};
