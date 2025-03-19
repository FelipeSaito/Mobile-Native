import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [valueApi, setValueApi] = useState('');
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const getApi = async () => {
        setLoading(true);
        setTimeout(() => {
            axios.get("http://localhost:3000/teste").then((resp) => {
                setValueApi(resp.data);
            }).finally(() => {
                setLoading(false);
            });
        }, 3000);
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <View style={styles.container}>
            {!showLogin ? (
                <>
                    <Text style={styles.title}>Bem-vindo à nossa ONG Animal</Text>
                    <Text style={styles.description}>
                        Resgatamos, cuidamos e ajudamos animais a encontrar um lar amoroso. ❤️
                    </Text>

                    {loading ? (
                        <ActivityIndicator size="large" color="#ff9800" style={styles.loader} />
                    ) : (
                        <Text style={styles.apiResponse}>{valueApi}</Text>
                    )}

                    <TouchableOpacity style={styles.button} onPress={() => setShowLogin(true)}>
                        <Text style={styles.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.loginContainer}>
                    <Text style={styles.loginTitle}>Faça Login</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.registerText}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#ADD8E6", // Azul claro
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff9800",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "#444",
        textAlign: "center",
        marginBottom: 20,
    },
    loader: {
        marginTop: 20,
    },
    apiResponse: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#ff9800",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginContainer: {
        alignItems: "center",
        width: "25%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5, // Sombra no Android
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    loginTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#ff9800",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: "#ff9800",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    registerButton: {
        marginTop: 10,
    },
    registerText: {
        color: "#ff9800",
        fontSize: 16,
    },
});

