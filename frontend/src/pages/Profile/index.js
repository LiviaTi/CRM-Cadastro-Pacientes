import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Profile() {
    
    const navigate = useNavigate();
    
    const [incidents, setIncidents] = useState([]);

    const medicoId =localStorage.getItem('medicoId');
    const medicoName =localStorage.getItem('medicoName');
    

    useEffect(() =>{
        api.get('profile', {
            headers:{
                Authorization:medicoId,
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    }, [medicoId]);
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization:medicoId,
                }
        });
        setIncidents(incidents.filter((incident) => incident.id !== id));
        }catch(err){
            alert('Erro ao desmarcar paciente, tente novamente');
        }
    }
    function handleLogout(){
        localStorage.clear();

        navigate('/');
   }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span>Bem vinda, {medicoName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastar novo paciente
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02141" />
                </button> 
            </header>

            <h1>Pacientes cadastrados</h1>
            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                    <strong>PACIENTES</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency:'BRL' }).format(incident.value)}</p>

                    <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#A8A8B3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}