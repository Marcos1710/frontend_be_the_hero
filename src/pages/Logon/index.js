import React, { useState } from 'react'
import './style.css'

import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import Swal from 'sweetalert2'

import heroes from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from  '../../services/api'

export default function Logon() {
  const [id, setId] = useState('')

  const history = useHistory()

  async function login(e) {
    e.preventDefault()
    
    try {
      const response = await api.post('/session', { id })
      
      if (response.status == 200) {
        localStorage.setItem('idOng', id)
        localStorage.setItem('nomeOng', response.data.nome)
        history.push('/profile')
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ONG não encontrada.'
      })
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />

        <form onSubmit={login}>
          <h1>Faça seu logon</h1>
          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)} />
          <button type="submit" className="button">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroes} alt="Heroes" />
    </div>
  )
}