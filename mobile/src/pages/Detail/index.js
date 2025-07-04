import React from "react";
import { View, TouchableOpacity, Image, Text, Linking } from "react-native";
import { useNavigation, useRoute} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";


import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Detail() {
    const navigation = useNavigation();
    const route=useRoute();
    const incident =route.params.incident;
    const message = 
        `Olá ${incident.name}, estou entrando em contato pois gostaria de agendar uma consulta"${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR',{
                            style:'currency', 
                            currency:'BRL'
                        }).format(incident.value)}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Médico: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#036eff" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>HOSPITAL</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CONSULTA</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR</Text>
                <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR',{
                            style:'currency', 
                            currency:'BRL'
                        }).format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Cuide-se!</Text>
                <Text style={styles.heroTitle}>Marque a sua consulta</Text>

                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
