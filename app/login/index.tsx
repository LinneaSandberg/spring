import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LoginInfo } from "@/types/Auth.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { loginSchema } from "@/validation/yupValidation";
import { InputField } from "@/components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginScreen = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();

  const onLogin: SubmitHandler<LoginInfo> = async (data) => {
    setIsLoggingIn(true);

    try {
      await login(data.email, data.password);
      alert("Login successful");
      router.push("/home");

    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found.");
            break;
          case "auth/wrong-password":
            alert("Wrong password.");
            break;
          default:
            alert("An error occurred when logging in.");
        }
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <InputField
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        error={errors.email?.message}
      />

      <InputField
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password?.message}
      />

      <TouchableOpacity
        style={[styles.button, isLoggingIn && styles.buttonDisabled]}
        onPress={handleSubmit(onLogin)}
        disabled={isLoggingIn}
      >
        <Text style={styles.buttonText}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Link style={styles.registerLink} href="/login/forgot">
        Forgot your password?
      </Link>

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
  button: {
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#FFD700',
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
    fontSize: 18,
    textAlign: 'center',
  },
  registerLink: {
    color: '#1E1E1E',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default LoginScreen;
