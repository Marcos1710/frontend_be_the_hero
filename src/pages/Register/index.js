import React, { useState } from 'react'
import './stryle.css'

import { Link , useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Swal from 'sweetalert2'

import logoImg from '../../assets/logo.svg'

import api from  '../../services/api'

export default function Register() {

  const [nome, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()

    // 1:22:34 com falha continuar amanhã
    try {
      let data = { nome, email, whatsapp, city, uf }
      
      const response = await api.post('/ongs', data)
      Swal.fire({
        icon: 'success',
        title: `Seu ID: ${response.data.id}`,
        showConfirmButton: true
      }).then((result) => {
        if (result.value) {
          history.push('/')
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro no cadastro, tente novamente.'
      })
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}> 
          <input 
            type="text" 
            placeholder="Nome"
            value={nome}
            onChange={e => setName(e.target.value)}   
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}  
          />
          <input 
            type="number" 
            placeholder="WhastApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}  
          />

          <div className="input-group">
            <input 
              type="text" 
              placeholder="Cidade" 
              value={city}
              onChange={e => setCity(e.target.value)}    
            />
            <input 
              type="text" 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}   
            />
          </div>

          <button type="submit" className="button">Cadastre-se</button>
        </form>
      </div>
    </div>
  )
}