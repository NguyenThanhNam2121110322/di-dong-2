import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../Auth/AuthContext';
export default function Logins() {
    const [value, setValue] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);


    const handleLogin = () => {

        const loginSuccess = login(email, password);
        if (loginSuccess) {
            Alert.alert('Đang đăng nhập');
            navigation.replace('HomeScreen');
        }
        if (!loginSuccess) {
            Alert.alert('Sai tài khoản mật khẩu hoặc trống thông tin');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>Login</Text>
            </View>
            <View style={styles.logoContainer}>
                <Image style={styles.logo}
                    source={require('../assets/logo2.jpg')}>
                </Image>
                {/* <Text style={styles.title}>Login</Text> */}
                <StatusBar style="auto" />
            </View>
            <View style={styles.InforContainer}>
                <TextInput style={styles.input}
                    placeholder=" Name"
                    placeholderTextColor='rgba(255,255,255,9.8)'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput style={styles.input}
                    placeholder=" Password"
                    placeholderTextColor='rgba(255,255,255,9.8)'
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.register}>
                    <TouchableOpacity onPress={() => navigation.navigate('Resgister')}>
                        <Text style={{ color: "blue" }}>Tạo tài khoản mới</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Pass}>
                    <TouchableOpacity onPress={() => navigation.navigate('Resgister')}>
                        <Text style={{ color: "blue" }}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button} >
                    <Button
                        title="Login"
                        onPress={handleLogin}
                    />
                </View>
            </View>


        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:
    {
        width: 100,
        height: 100,
        top: -100,
    },
    register: {
        marginTop: -55,
        marginLeft: 160
    },
    Pass: {
        marginTop: -19,
        marginRight: 150
    },

    title: {
        textAlign: 'center',
    },
    InforContainer:
    {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 250,
        padding: 1,
        alignItems: 'center',
        // backgroundColor: 'black',

    },

    text:
    {
        bottom: 20,
    },

    input: {
        top: -70,
        height: 30,
        width: 200,
        backgroundColor: '#808080',
        alignItems: 'center',
        marginTop: 10,
        position: 'relative',
        color: 'white'
    },
    button:
    {
        bottom: -180,
        width: 100,
        marginTop: -150
    },

});