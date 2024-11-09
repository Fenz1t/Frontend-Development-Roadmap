import { body } from "express-validator";

export const registerValidation = [
  body("email","Неверный формат почты").isEmail(),
  body("password","Пароль должен быть минимум 5 символов").isLength({ min: 5, max: 32 }),
  body("fullName","Имя должно быть минимум 3 символа").isLength({ min: 3 }),
  body("avatarUrl","Неверная ссылка").optional().isURL(),
];

export const loginValidation = [
  body("email","Неверный формат почты").isEmail(),
  body("password","Пароль должен быть минимум 5 символов").isLength({ min: 5, max: 32 }),
]
