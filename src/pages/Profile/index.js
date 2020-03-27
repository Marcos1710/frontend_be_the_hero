import React, { useState, useEffect } from 'react'
import './style.css'

import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import Swal from 'sweetalert2'

import api from  '../../services/api'
 
import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const [incidents, setIncidents] = useState([])
  const history = useHistory()

  const ongName = localStorage.getItem('nomeOng')
  const idOng = localStorage.getItem('idOng')

  useEffect(() => {
    
    api.get('/incidents/ong', {
      headers: {
        Authorization: idOng
      }
    }).then(response => {
      setIncidents(response.data)
    })

  }, [idOng])

  function handleDeleteIncident(id) {
    try {
      Swal.fire({
        title: 'Atenção',
        text: "Deseja deletar esse caso ? ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Cancelar'
      }).then(async result => {
        if (result.value) {
          await api.delete(`/incidents/${id}`, {
            headers: {
              Authorization: idOng
            }
          })

          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Caso deletado com sucesso.'
          })

          setIncidents(incidents.filter(incident => incident.id !== id))
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao deletar caso.'
      })
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem Vindo(a): {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.titulo}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.descricao}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}