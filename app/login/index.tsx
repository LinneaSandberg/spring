import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LoginInfo } from "@/types/Auth.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { loginSchema } from "@/validation/yupValidation";
import { InputField } from "@/components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThemedText } from "@/components/ThemedText";
import { purple } from "@/constants/Colors";

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
      router.push("/home");

    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("An error occurred when logging in.");
            break;
          case "auth/wrong-password":
            alert("An error occurred when logging in.");
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
      <View style={styles.titlePosition}>
        <ThemedText type='subtitle'>Login</ThemedText>
      </View>

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
        <ThemedText type='defaultSemiBold'>
          {isLoggingIn ? "Logging in..." : "Login"}
        </ThemedText>
      </TouchableOpacity>

      <Link style={styles.registerLink} href="/login/forgot">
        <ThemedText type='default'>
          Forgot your password?
        </ThemedText>
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
  titlePosition: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    backgroundColor: purple,
    borderColor: '#1E1E1E',
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: 10,
  }
});

export default LoginScreen;
