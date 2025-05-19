// import {useAuthSession} from "@/providers/AuthProvider";
import { ReactNode } from "react";
import { Button, Text, View } from "react-native";
import TextInput from "../../components/TextInput";
import { app } from "../../firebase/config";

export default function Login(): ReactNode {
  const efetuarLogin = async () => {
    let userCredentials = app
      .auth()
      .signInWithEmailAndPassword(username.toString(), password.toString())
      .then((userCredential) => {
        let user = userCredential.user;
        if (!user.emailVerified) {
          setTextoModal(
            'Email não não verificado. Veja sua caixa e confirme sua conta.'
          );
          setModalVisivel(true);
          return;
        }
        // Verificar se o usuário já está na entrada de usuários do firebase
        const dbRef = app.database().ref();

        dbRef
          .child('usuarios')
          .child(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists() && snapshot.val().funcao != 'INABILITADO') {
              // O usuário já está na entrada de usuários no firebase
              navigation.navigate('Alunos');
            } else {
              setTextoModal(
                'Sua conta ainda não foi liberada por um administrador.'
              );
              setModalVisivel(true);
              // O usuário já pediu para criar uma conta no sistema, mas ainda
              // não tem uma entrada em 'usuários'
              dbRef
                .child('usuarios')
                .child(user.uid)
                .set({
                  uid: user.uid,
                  email: user.email,
                  funcao: 'INABILITADO',
                })
                .then((msg) => console.log(msg));
            }
          });
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        setTextoModal('Conta ainda não criada.');
        setModalVisivel(true);
        console.log('#------->' + errorMessage + ' ' + errorCode);
      });
  };


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{color: 'rgb(255, 255, 255)'}}>Login screen</Text>
      <TextInput
        label='Email'
      />
      <TextInput
        label='Senha'
      />
      <Button title={"Login"}/>
    </View>
  );
}