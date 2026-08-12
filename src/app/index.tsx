import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function HomeScreen() {
const { width } = useWindowDimensions();
  const isLargeScreen = width > 500;

  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 10;
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -120) {
          Alert.alert(
            'Welcome!',
            'Navigating to the next screen...',
            [{ text: 'OK' }]
          );
        }
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;
  return (
    <View style={styles.outerContainer}>
      <LinearGradient colors={["#5DDEB8", "#0A5F5C"]} style={styles.blob1} />
      <LinearGradient colors={["#3AB0A2", "#B8E6DC"]} style={styles.blob2} />
      <LinearGradient colors={["#0A5F5C", "#3AB0A2"]} style={styles.blob3} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          bounces={false}
        >
          {/* // tttttttttttooooooooooppppppppppppp------ */}
          <View
            style={[styles.glassCard, isLargeScreen && styles.glassCardStretch]}
          >
            <BlurView intensity={30} tint="light" style={styles.blurFill} />
            <View style={styles.glassContent}>
              <Image
                source={require("../../assets/images/logo.png.jpg")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.officeText}>
                Office of the Ombudsman Punjab
              </Text>
            </View>
          </View>

          {/* //weeeeeeeeeelcooomeeeeeeeee---------------- */}
          <View
            style={[styles.glassCard, isLargeScreen && styles.glassCardStretch]}
          >
            <BlurView intensity={30} tint="light" style={styles.blurFill} />
            <View style={styles.glassContent}>
              <Text style={styles.welcomeText}>Welcome To</Text>
              <Text style={styles.titleText}>Ombudsman Punjab</Text>
              <Text style={styles.subtitleText}>
                Management Information System
              </Text>
              <Text style={styles.subtitleText}>(OPMIS)</Text>
            </View>
          </View>

          {/* //Certificationnnnnnnnnnnnsssssss------------- */}
          <View
            style={[styles.glassCard, isLargeScreen && styles.glassCardStretch]}
          >
            <BlurView intensity={30} tint="light" style={styles.blurFill} />
            <View style={styles.glassContent}>
              <View style={styles.certRow}>
                <Image
                  source={require("../../assets/images/sgs.png.jpg")}
                  style={styles.certBadge}
                  resizeMode="contain"
                />
                <Image
                  source={require("../../assets/images/ukas.png.jpg")}
                  style={styles.certBadge}
                  resizeMode="contain"
                />
                <Image
                  source={require("../../assets/images/iaf.png.jpg")}
                  style={styles.certBadge}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.certText}>
                ISO 9001:2015 Quality Management System
              </Text>
              <Text style={styles.certText}>Certification: PK25/00000138</Text>
            </View>
          </View>

          {/* //indiicatorrrrrrrr-------------- */}
          <Animated.View
            style={[
              styles.glassCard,
              isLargeScreen && styles.glassCardStretch,
              { transform: [{ translateY }] },
            ]}
            {...panResponder.panHandlers}
          >
            <BlurView intensity={30} tint="light" style={styles.blurFill} />
            <View style={styles.glassContent}>
              <View style={styles.arrowCircle}>
                <Text style={styles.arrowText}>▲</Text>
              </View>
              <Text style={styles.swipeText}>Swipe Up To Proceed</Text>
            </View>
          </Animated.View>

          {/* //foooooooooootttttteeeeeeeeeerrrrr */}
          <View
            style={[styles.glassCard, isLargeScreen && styles.glassCardStretch]}
          >
            <BlurView intensity={30} tint="light" style={styles.blurFill} />
            <View style={styles.glassContent}>
              <Text style={styles.footerText}>Copyright reserved @ 2026</Text>
              <Text style={styles.footerBold}>Powered By:</Text>
              <Text style={styles.footerText}>
                IT Infrastructure and Development Wing
              </Text>
              <Text style={styles.footerText}>
                Office of the Ombudsman Punjab
              </Text>
              <Text style={styles.footerVersion}>Version 1.10</Text>
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
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
  },
  officeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A5F5C",
    marginTop: 8,
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
  welcomeText: {
    fontSize: 22,
    color: "#3AB0A2",
    fontWeight: "600",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0A5F5C",
    marginTop: 4,
  },
  subtitleText: {
    fontSize: 18,
    color: "#3AB0A2",
    fontWeight: "600",
  },
  certRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 260,
    marginBottom: 10,
  },
  certBadge: {
    width: 70,
    height: 70,
  },
  certText: {
    fontSize: 13,
    color: "#0A5F5C",
    marginTop: 2,
  },
  arrowCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#0A5F5C",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 22,
    color: "#0A5F5C",
  },
  swipeText: {
    marginTop: 8,
    fontSize: 14,
    color: "#3AB0A2",
  },
  footerText: {
    fontSize: 12,
    color: "#0A5F5C",
    textAlign: "center",
  },
  footerBold: {
    fontSize: 12,
    color: "#0A5F5C",
    fontWeight: "bold",
    marginTop: 8,
  },
  footerVersion: {
    fontSize: 12,
    color: "#0A5F5C",
    fontWeight: "bold",
    marginTop: 8,
  },
});
