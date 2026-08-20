import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Animated,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function LoginScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 500;

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // BLOB ANIMATIONS>>>>>>>>>>>>
  const blob1X = useRef(new Animated.Value(0)).current;
  const blob1Y = useRef(new Animated.Value(0)).current;
  const blob2X = useRef(new Animated.Value(0)).current;
  const blob2Y = useRef(new Animated.Value(0)).current;
  const blob3X = useRef(new Animated.Value(0)).current;
  const blob3Y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateBlob = (
      animX: Animated.Value,
      animY: Animated.Value,
      toX: number,
      toY: number,
      duration: number,
    ) => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(animX, {
              toValue: toX,
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(animY, {
              toValue: toY,
              duration: duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(animX, {
              toValue: 0,
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(animY, {
              toValue: 0,
              duration: duration,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animateBlob(blob1X, blob1Y, 20, -15, 3000);
    animateBlob(blob2X, blob2Y, -25, 20, 4000);
    animateBlob(blob3X, blob3Y, 15, 25, 5000);
  }, []);
  const handleLogin = () => {
    if (!userId || !password) {
      console.log("Error", "Please enter both User ID and Password.");
      return;
    }
    console.log("Success", `Logged in as ${userId}`);
  };

  const handleGuest = () => {
    Alert.alert("Guest", "Continuing as a guest...");
  };    
  return (
    <View style={styles.outerContainer}>
      {/* BACKGROUND BLOBS>>>>>>>>>> */}
   <Animated.View
        style={[
          styles.blob1,
          { transform: [{ translateX: blob1X }, { translateY: blob1Y }] },
        ]}
      >
        <LinearGradient
          colors={["#5DDEB8", "#0A5F5C"]}
          style={styles.blobGradient}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.blob2,
          { transform: [{ translateX: blob2X }, { translateY: blob2Y }] },
        ]}
      >
        <LinearGradient
          colors={["#3AB0A2", "#B8E6DC"]}
          style={styles.blobGradient}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.blob3,
          { transform: [{ translateX: blob3X }, { translateY: blob3Y }] },
        ]}
      >
        <LinearGradient
          colors={["#0A5F5C", "#3AB0A2"]}
          style={styles.blobGradient}
        />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          bounces={false}
        >
          {/*LOGIN GLASS CARRDD>>>>>>>>*/}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View
            style={[styles.glassCard, isLargeScreen && styles.glassCardStretch]}
          >
            <BlurView intensity={30} tint="light" style={styles.blurFill} />
            <View style={styles.glassContent}>

             <Text style={styles.opmisTitle}>OPMIS</Text>
                            <Text style={styles.subtitle}>
                Ombudsman Punjab Management Information System
              </Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="User ID"
                  placeholderTextColor="#888"
                  value={userId}
                  onChangeText={setUserId}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                               <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.eyeIcon}>
                    {showPassword ? "👁" : "🙈"}
                  </Text>
                </Pressable>
              </View>
              <Pressable style={styles.buttonWrapper} onPress={handleLogin}>
                <LinearGradient
                  colors={["#1C9B8E", "#4CBB6E"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
              </Pressable>

              {/* /------/ */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>
              <Pressable style={styles.buttonWrapper} onPress={handleGuest}>
                <LinearGradient
                  colors={["#1C9B8E", "#4CBB6E"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Continue as a Guest</Text>
                </LinearGradient>
              </Pressable>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#B8E6DC",
  },
  blob1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -30,
    right: 0,
    opacity: 0.4,
    overflow: "hidden",
  },
  blob2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    top: "40%",
    left: -30,
    opacity: 0.2,
    overflow: "hidden",
  },
  blob3: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    bottom: 50,
    right: 0,
    opacity: 0.3,
    overflow: "hidden",
  },
   blobGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  glassCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  glassCardStretch: {
    alignSelf: "stretch",
  },
  blurFill: {
    ...StyleSheet.absoluteFill,
  },
  glassContent: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
    logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  opmisTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0A5F5C",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A5F5C",
    textAlign: "center",
    marginBottom: 20,
  },
    inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
    alignSelf: "stretch",
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  eyeIcon: {
    fontSize: 18,
    marginLeft: 10,
  },
    buttonWrapper: {
    alignSelf: "stretch",
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 30,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#1C9B8E",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "bold",
    color: "#0A5F5C",
  },
});