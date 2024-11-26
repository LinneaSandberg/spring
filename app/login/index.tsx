import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { LoginInfo } from "@/types/Auth.types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";

const LoginScreen = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();
  const router = useRouter();

  const onLogin: SubmitHandler<LoginInfo> = async (data) => {
    setIsLoggingIn(true);

    try {
      await login(data.email, data.password);
      alert("Login successful");
      router.push("/home");

    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred");
      }
    }

    setIsLoggingIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button
        title={isLoggingIn ? "Logging in..." : "Login"}
        onPress={handleSubmit(onLogin)}
        disabled={isLoggingIn}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});


export default LoginScreen;
