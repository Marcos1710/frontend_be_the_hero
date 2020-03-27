import React, { useState } from 'react'
import './style.css'

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Swal from 'sweetalert2'

import logoImg from '../../assets/logo.svg'

import api from  '../../services/api'

export default function NewIncident() {

  const [titulo, setTitle] = useState('')
  const [descricao, setdescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()

  const idOng = localStorage.getItem('idOng')

   async function handleNewIncident(e) {
    e.preventDefault()
    
    let data = {
      titulo,
      descricao,
      value
    }

    try {
      const response = await api.post('/incidents', data, {
        headers: {
          Authorization: idOng
        }
      })  

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Caso cadastrado com sucesso.'
        })
  
        history.push('/profile')
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao cadastrar caso'
      })
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente, para encontrar um herói para resolver isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            type="text" 
            placeholder="Titulo do caso"
            value={titulo}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            type="text" 
            placeholder="Descrição"
            value={descricao}
            onChange={e => setdescription(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Valor em reais"
            value={value}  
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}