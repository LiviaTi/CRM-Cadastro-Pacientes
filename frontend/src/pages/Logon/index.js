import React, {useState} from "react";
import api from "../../services/api";
import { Link, useNavigate } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
//Icons que podem ser vistos no site www.feathericons.com


import './styles.css';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const[id,setId]=useState('');

    const navigate = useNavigate();
    async function handleLogon(e) {
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});
            //await serve para esperar cadastrar tudo e quando usa o await é obrigatório utilizar o async
            console.log(response.data.name);
        
            localStorage.setItem('medicoId',id);
            localStorage.setItem('medicoName', response.data.name);
            navigate('/profile');
        }catch(err){
            alert('Falha no login, tente novamente');
        }

    }
    return(
       <div className='logon-container'>
            <section className='form'>
                <img src={logoImg} alt="Mais Consulta" />
                <form onSubmit={handleLogon}>
                    
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Seu ID" 
                        value={id}
                        onChange={e=>setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className=".back-link" to="/register">
                      <FiLogIn size={16} color="#E02841"/>
                      Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Mais Consulta"/>
       </div> 
    );
}