import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  TouchableHighlight,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Audio } from "expo-av";

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState();
  const startRecording = async () => {
    (async () => {
      let { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      try {
        const recording = new Audio.Recording();

        await recording.prepareToRecordAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        recording._options?.isMeteringEnabled;
        recording.setOnRecordingStatusUpdate((status) => {
          const scaledValue = (Number(status?.metering) + 160) / 160;
        });
        await recording.startAsync();
        setRecording(recording);
        setIsRecording(true);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      const uri = recording.getURI();
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FCF6F5FF" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FCF6F5FF" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {isRecording ? (
          <TouchableHighlight
            underlayColor="#CCCCCC"
            activeOpacity={0.7}
            style={styles.buttonStop}
            onPress={stopRecording}
          >
            <Text style={styles.buttonStopText}>Stop Recording</Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="#CCCCCC"
            activeOpacity={0.7}
            style={styles.button}
            onPress={startRecording}
          >
            <Text style={styles.buttonText}>Start Recording</Text>
          </TouchableHighlight>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCF6F5FF",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    backgroundColor: "red",
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#00203FFF",
    borderRadius: 8,
    width: "80%",
    aspectRatio: 4 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStop: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    width: "80%",
    aspectRatio: 4 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 32,
    color: "#ADEFD1FF",
    fontWeight: 800,
  },
  buttonStopText: {
    fontSize: 32,
    color: "#FAFAFA",
    fontWeight: 800,
  },
});

export default Home;
