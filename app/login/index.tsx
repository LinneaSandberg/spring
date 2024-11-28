import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginInfo } from "@/types/Auth.types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link, useRouter } from "expo-router";
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

      <TouchableOpacity
        style={[styles.button, isLoggingIn && styles.buttonDisabled]}
        onPress={handleSubmit(onLogin)}
        disabled={isLoggingIn}
      >
        <Text style={styles.buttonText}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Link style={styles.registerLink} href="/login/forgot">Forgot your password?</Link>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
    boxSizing: 'border-box',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E1E1E',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
  button: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#FAECC4',
    borderColor: '#1E1E1E',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#1E1E1E',
    fontSize: 16,
    textAlign: 'center',
  },
  registerLink: {
    color: '#1E1E1E',
    textAlign: 'center',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});


export default LoginScreen;
