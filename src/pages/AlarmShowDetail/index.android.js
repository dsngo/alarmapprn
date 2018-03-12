import { StyleSheet, Text, Image } from 'react-native';
import React, { Component } from 'react';
import Sound from 'react-native-sound';
import * as Progress from 'react-native-progress';
import { PropTypes } from 'prop-types';
import { Toolbar, Button } from 'react-native-material-ui';
import Container from '../../components/Container';

const resizeMode = 'cover';

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageBackgroundStyle: {
    marginTop: 50,
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  progress: {
    marginHorizontal: 50,
    marginTop: 20,
  },
  textAlarm: {
    backgroundColor: 'transparent',
    // textAlign: "center",
    fontSize: 15,
    padding: 30,
    color: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
  },
  buttonAudioContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  audioButton: {
    backgroundColor: 'transparent',
  },
});

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};

class AlarmShowDetail extends Component {
  state = {
    progress: 0,
    alarm: {},
    alarmState: 'playing',
    playingProgress: '',
  };

  componentDidMount() {
    const { sound } = this.props.navigation.state.params.alarmDetail;
    this.playSound(sound);
  }

  componentWillUnmount() {
    this.state.alarm.pause();
  }

  playSound = soundName => {
    // SAVE SOUND FILE TO : android/app/src/main/res/raw (Android) - Add Files to [PROJECTNAME] (IOS)
    const sound = new Sound(soundName, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log(err.message); // eslint-disable-line
      } else {
        sound.play();
        this.updateProgressBar(sound);
        this.setState(prevState => ({
          ...prevState,
          alarm: sound,
        }));
      }
    });
  };

  updateProgressBar = sound => {
    const playingProgress = setInterval(() => {
      sound.getCurrentTime(seconds => {
        const duration = sound.getDuration();
        const progress = Math.round(seconds / duration * 100) / 100;
        this.setState(prevState => ({
          ...prevState,
          progress,
        }));
      });
    }, 1000);
    this.setState(prevState => ({
      ...prevState,
      playingProgress,
    }));
    if (this.state.progress >= 1) {
      clearInterval(this.state.playingProgress);
      this.setState(prevState => ({
        ...prevState,
        alarmState: 'stopped',
      }));
    }
  };

  actionAlarm = (alarm, alarmState) => {
    const newAlarmState = alarmState === 'playing' ? 'paused' : 'playing';
    if (alarmState === 'playing') {
      alarm.pause();
      clearInterval(this.state.playingProgress);
    } else {
      alarm.play();
      this.updateProgressBar(alarm);
    }
    this.setState(prevState => ({
      ...prevState,
      alarmState: newAlarmState,
    }));
  };

  render() {
    const { alarmDetail } = this.props.navigation.state.params;
    const { alarm, alarmState, progress } = this.state;
    return (
      <Container>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="瞑想導入中"
        />
        <Image
          style={styles.imageBackgroundStyle}
          source={{ uri: alarmDetail.backgroundImg }}
        />
        <Text style={styles.textAlarm}>{alarmDetail.description}</Text>
        <Progress.Bar
          progress={progress}
          width={280}
          color="white"
          style={styles.progress}
        />
        <Container styles={styles.buttonAudioContainer}>
          <Button
            icon={alarmState === 'playing' ? 'pause' : 'play-arrow'}
            text=""
            raised
            primary={alarmState !== 'playing'}
            style={{
              text: { textAlign: 'center' },
              container: {
                width: 100,
                marginHorizontal: 140,
                marginTop: 20,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#ffffff',
              },
            }}
            onPress={() => this.actionAlarm(alarm, alarmState)}
          />
        </Container>
      </Container>
    );
  }
}

AlarmShowDetail.propTypes = propTypes;

export default AlarmShowDetail;
