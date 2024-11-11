import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ufo from '../img/UFO_auto.svg'

export default function LoginForm() {
  const [formData, setFormData] = useState({
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
        'http://localhost:3000/auth/login',
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
        <img id="UFO_auto" src={ufo} width="600" height="220" alt='UFO logo'/>
      </div>
      <h2>Авторизация</h2>
      <form id="loginForm" onSubmit={handleSumbit}>
        <div className="form-group">
          <label htmlFor="email">Почта</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите почту"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите ваш пароль"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="auth-button">
          <b>Войти</b>
        </button>
      </form>
      <div className="auth-footer">
        <p>
          <b>Нет аккаунта? </b>
          <Link to='/auth/register'>Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  )
}
