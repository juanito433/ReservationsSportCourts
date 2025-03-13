import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Estado para el mensaje

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://172.16.3.234:8000/api/members/login', {
                email,
                password,
            });

            console.log('Respuesta del servidor:', response.data);
            if (response.data.status === 200) {
                setMessage(`Bienvenido, ${response.data.member.name}`);
                Alert.alert('Éxito', `Bienvenido, ${response.data.member.name}`);

            } else {
                setMessage('Inicio de sesión fallido.');
            }
        } catch (error) {
            console.error('Error de login:', error);
            setMessage('No se pudo conectar al servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/image/haciendas.png')} />
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 300,
        height: 200,

        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    message: {
        marginTop: 20,
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
    },
});

export default LoginScreen;
