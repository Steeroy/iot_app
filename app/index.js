import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import {
  TouchableHighlight,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Audio, AVPlaybackStatus } from 'expo-av';

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const handlePress = async () => {
    if (!isRecording) {
      const recordingPath = AudioUtils.DocumentDirectoryPath + '/recording.wav';
      await AudioRecorder.prepareRecordingAtPath(recordingPath, {
        SampleRate: 44100,
        Channels: 1,
        AudioQuality: 'High',
        AudioEncoding: 'wav',
      });
      await AudioRecorder.startRecording();
      setIsRecording(true);
    } else {
      const recording = await AudioRecorder.stopRecording();
      setIsRecording(false);
    }
  };

  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FCF6F5FF' }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#FCF6F5FF' },
          headerShadowVisible: false,
          headerTitle: '',
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
            onPress={handlePress}
          >
            <Text style={styles.buttonStopText}>Stop Recording</Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="#CCCCCC"
            activeOpacity={0.7}
            style={styles.button}
            onPress={handlePress}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCF6F5FF',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#00203FFF',
    borderRadius: 8,
    width: '80%',
    aspectRatio: 4 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStop: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    width: '80%',
    aspectRatio: 4 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 32,
    color: '#ADEFD1FF',
    fontWeight: 800,
  },
  buttonStopText: {
    fontSize: 32,
    color: '#FAFAFA',
    fontWeight: 800,
  },
});

export default Home;
