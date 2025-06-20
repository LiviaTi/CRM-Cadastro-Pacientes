import React, { useState, useEffect} from "react";
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';

import api from'../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents(){
    const [incidents,setincidents]=useState([]);
    const [total,settotal]=useState(0);
    const [page,setPage] = useState(1);
    const [loading, setLoading ] = useState(false);

    const navigation = useNavigation();
    

    function navigationToDetail(incident){
        navigation.navigate('Detail',{incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total>0 && incidents.length ==total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params:{page}
        });

        
        setincidents([...incidents, ...response.data]);
        settotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }
    useEffect(() =>{
        loadIncidents();
    },[]);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} consultas</Text>. 
                </Text>
            </View>
            
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha o especialista abaixo e consulte-se.</Text>
            <FlatList 
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident=> String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident})=>(
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>HOSPITAL</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CONSULTA</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',{
                            style:'currency', 
                            currency:'BRL'
                        }).format(incident.value)}
                    </Text>

                    <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={()=>navigationToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#036eff"/>
                    </TouchableOpacity>
                    </View>
                 )}
                />
        </View>
    );
}