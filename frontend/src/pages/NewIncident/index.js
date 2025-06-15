import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
//Icons que podem ser vistos no site www.feathericons.com

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.png';

export default function NewIncident(){
   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const navigate = useNavigate();

    const medicoId =localStorage.getItem('medicoId');

    async function handleNewIncident(e){
        e.preventDefault ();

        const data={
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: medicoId,
                }
            })
            navigate('/profile');
        }catch(err){
            alert('Erro ao cadastrar consulta, Tente novamente');
        }
    }
    return(
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="logo" />

                    <h1>Cadastrar novo caso </h1>
                    
                    <p>Descreva o a consulta para encontrar um paciente</p>
                   
                    <Link className=".back-link" to="/profile">
                      <FiArrowLeft size={16} color="#E02841"/>
                      Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder='Nome da consulta - Nome do médico'
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                   />
                    <textarea 
                        placeholder='Descrição'
                        value={description}
                        onChange={e=> setDescription(e.target.value)}
                    />
                    <input 
                        placeholder='Valor'
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                   
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );   
}