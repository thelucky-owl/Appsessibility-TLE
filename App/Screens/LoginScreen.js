import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { LoginStylesheet } from "../Styles/LoginStylesheet";

export const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    return (
        <KeyboardAvoidingView style={LoginStylesheet.container} behavior="padding">
            <View style={LoginStylesheet.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={LoginStylesheet.input}/>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={LoginStylesheet.input}
                    secureTextEntry/>
            </View>
            <View style={LoginStylesheet.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        signInWithEmailAndPassword(auth, email, password)
                        .then(userCredentials => {
                            const user = userCredentials.user;
                        })
                        .catch(error => alert(error.message))
                    }}
                    style={LoginStylesheet.button}>
                    <Text style={LoginStylesheet.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        createUserWithEmailAndPassword(auth, email, password)
                        .then(userCredentials => {
                            const user = userCredentials.user;
                        })
                        .catch(error => alert(error.message))
                    }}
                    style={[LoginStylesheet.button, LoginStylesheet.buttonOutline]}>
                    <Text style={LoginStylesheet.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}