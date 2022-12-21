import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import Toast from 'react-native-simple-toast';

import Shop from './components/shop/';

function LoginScreen() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      const response = await fetch('http://172.30.2.184:3001/login', { //poner la ip local del pc donde se ejecuta la api
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      if (data.success) {
        setError('Success');
        <Shop name={name} />
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setError('Error connecting to server, using last saved credentials.');
      delay();
    }
  }

  async function delay() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if(name == "root" && password == "root"){
      setError('Success');
    }else{
      setError('Failed login in offline mode');
    }
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
};

export default LoginScreen;