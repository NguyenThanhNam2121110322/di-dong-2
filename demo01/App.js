import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/HomeScreen';
import Header from './component/Header';
import Product_detial from './component/Product_detail';
import HomeBar from './component/HomeBar';
import Login from './component/Login';
import Cart from './component/Cart';
import { CartProvider } from './CartProvider/CartContext';
import Payment from './component/Payment';
import Search from './component/Search';
import User from './component/User';
import AuthContext from './Auth/AuthContext';
import Resgister from './component/Resgister';

const Stack = createStackNavigator();

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);

  const register = (email, password) => {
    setRegisteredUser({ email, password });
  };

  const login = (email, password) => {
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
      return true;
    }
    return false;
  };
  return (
    <AuthContext.Provider value={{ login, register }}>
      <CartProvider>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header></Header>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerTitle: 'Trang chủ' }} // Thay đổi tiêu đề hiển thị
              />
              <Stack.Screen name="SingleProduct" component={Product_detial} options={{ headerTitle: 'Chi tiết sản phẩm' }} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="User" component={User} />
              <Stack.Screen name="Resgister" component={Resgister} />
            </Stack.Navigator>
            <HomeBar />
          </NavigationContainer>
        </View>
      </CartProvider>
    </AuthContext.Provider>
  );
};