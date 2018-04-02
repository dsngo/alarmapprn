import { StyleSheet, Text, Image, View } from 'react-native';
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
    playerStatus: 'play',
  };

  componentWillMount() {
    // SAVE SOUND FILE TO : android/app/src/main/res/raw (Android) - Add Files to [PROJECTNAME] (IOS)
    if (this.props.navigation.state.params.alarmDetail.sound) {
      this.sound = new Sound(
        this.props.navigation.state.params.alarmDetail.sound,
        Sound.MAIN_BUNDLE,
        () => {
          this.sound.play();
          this.duration = this.sound.getDuration();
          this.handleUpdateProgressBar();
        }
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.pInterval);
    this.sound.stop();
    this.sound.release();
  }
  sound;
  pInterval;
  duration;
  handleUpdateProgressBar = () => {
    this.pInterval = setInterval(() => {
      this.sound.getCurrentTime(s => {
        this.setState({ progress: s / this.duration });
      });
    }, 1000);
    if (this.state.progress >= 1) {
      this.setState({ playerStatus: 'stop' });
    }
  };
  handlePressControl = () => {
    if (this.state.playerStatus === 'play') {
      this.sound.pause();
      this.setState({ playerStatus: 'pause' });
    } else {
      this.sound.play();
      this.setState({ playerStatus: 'play' });
    }
  };
  render() {
    const { alarmDetail } = this.props.navigation.state.params;
    const { playerStatus, progress } = this.state;
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Progress.Bar
            progress={progress}
            width={300}
            color="white"
            style={styles.progress}
          />
          <Container styles={styles.buttonAudioContainer}>
            <Button
              icon={
                /* eslint-disable */
                playerStatus === 'play'
                  ? 'pause'
                  : playerStatus === 'stop' ? 'stop' : 'play-arrow'
                /* eslint-enable */
              }
              text=""
              raised
              primary={playerStatus !== 'play'}
              style={{
                text: { textAlign: 'center' },
                container: {
                  marginTop: 20,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#ffffff',
                },
              }}
              onPress={() => this.handlePressControl()}
            />
          </Container>
        </View>
      </Container>
    );
  }
}

AlarmShowDetail.propTypes = propTypes;

export default AlarmShowDetail;
