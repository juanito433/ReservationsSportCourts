import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, useWindowDimensions } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { width } = useWindowDimensions(); // Detecta el ancho de la pantalla

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://172.16.3.234:8000/api/members/login', {
                email,
                password,
            });

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
        <View style={[styles.container, width > 768 ? styles.webContainer : null]}>
            {width > 768 && (
                <View style={styles.logoContainer}>
                    <Image style={styles.image} source={require('../assets/image/login.jpg')} />
                </View>
            )}

            <View style={styles.formContainer}>
                {width <= 768 && (
                    <Image style={styles.image} source={require('../assets/image/login.jpg')} />
                )}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    webContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 768, 
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 25,
        alignSelf: 'center',
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
