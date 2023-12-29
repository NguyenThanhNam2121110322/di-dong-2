import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My Shop</Text>
            <Image source={require('../assets/logo1.jpg')} style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#f2f2f2',
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // marginBottom: 10,
    },
    // headerText: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    // },
    logo: {
        width: 150,
        height: 50,
        marginLeft:125,
    },
});
