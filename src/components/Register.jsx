import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ufo from '../img/UFO_auto.svg'
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSumbit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/register',
        formData
      )
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
      <div className="auth-container">
        <div className="image-container">
          <img id="UFO_auto" src={ufo} width="600" height="220" alt="Лого UFO" />
        </div>
        <h2>Регистрация</h2>
        <form id="loginForm" onSubmit={handleSumbit}>
          <div className="form-group">
            <label htmlFor="username">Полное имя</label>
            <input
              type="text"
              id="username"
              name="fullName"
              placeholder="Введите полное имя"
              required
             onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Электронная почта</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Введите email"
              required
              onChange={handleChange}/>
          </div> 
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Придумайте пароль"
              required
              onChange={handleChange}/>
          </div>
          <button type="submit" className="auth-button">
            <b>Зарегистрироваться</b>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <b>Уже зарегистрированы? </b>
            <Link to='/auth/login'>Войдите в аккаунт</Link>
          </p>
        </div>
      </div>
  )
}
