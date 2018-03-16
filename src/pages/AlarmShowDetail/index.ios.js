import { StyleSheet, Text, Image } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Toolbar, Button } from 'react-native-material-ui';
import * as Progress from 'react-native-progress';

import Sound from 'react-native-sound';
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
    margin: 10,
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
    const { alarm } = this.props.navigation.state.params.alarmDetail; // eslint-disable-line
    this.playSound(alarm);
  }
  componentWillUnmount() {
    this.state.alarm.pause();
    clearInterval(this.state.playingProgress);
  }
  playSound = soundName => {
    // SAVE SOUND FILE TO : android/app/src/main/res/raw (Android) - Add Files to [PROJECTNAME] (IOS)
    const sound = new Sound(soundName, Sound.MAIN_BUNDLE, err => {
      if (err) {
        // console.log(err.message); // eslint-disable-line
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
    const newAlamrState = alarmState === 'playing' ? 'paused' : 'playing';
    if (alarmState === 'playing') {
      alarm.pause();
      clearInterval(this.state.playingProgress);
    } else {
      alarm.play();
      this.updateProgressBar(alarm);
    }
    this.setState(prevState => ({
      ...prevState,
      alarmState: newAlamrState,
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
          centerElement="Detail"
        />
        <Image
          style={styles.imageBackgroundStyle}
          source={{ uri: alarmDetail.imageUrl }}
        />
        <Text style={styles.textAlarm}>{alarmDetail.text}</Text>
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

AlarmShowDetail.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AlarmShowDetail);
