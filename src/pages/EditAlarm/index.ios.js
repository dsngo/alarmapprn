import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  CameraRoll,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

import { ListItem, Toolbar, Checkbox } from 'react-native-material-ui';
import Container from '../../components/Container';
import {
  addUserAlarm,
  updateUserAlarm,
  removeUserAlarm,
} from '../../redux/actionCreators';
import {
  getTimeUnits,
  weekdaysArr,
  renderAlarmString,
  renderWeekdayString,
  logicWeekday,
} from '../../utils';

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  textInput: {
    textAlignVertical: 'top',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  modal: {
    backgroundColor: 'white',
    margin: 76,
    marginTop: 180,
    marginBottom: 180,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 22,
  },
});

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
  addUserAlarm: PropTypes.func.isRequired,
  updateUserAlarm: PropTypes.func.isRequired,
  removeUserAlarm: PropTypes.func.isRequired,
};

const musics = [{ name: 'Test Music', uri: 'meditation.mp3' }];

class EditAlarm extends Component {
  state = {
    userAlarm: {
      id: Date.now(),
      hours: getTimeUnits().hours,
      minutes: getTimeUnits().minutes,
      daysOfWeek: [],
      active: true,
      snooze: true,
      label: 'Alarm',
      repeat: false,
      sound: 'meditation.mp3',
      description: 'TEst here',
      backgroundImg:
        'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2Fimage%2F2016%2F02%2Fmain%2Fevergladesgettyimages-569057955-copy.jpg%3Fitok%3DrGqT412D&w=800&q=85',
    },
    photos: [],
    isTimePickerVisible: false,
    isModalVisible: false,
    isPhotosVisible: false,
    isMusicsVisible: false,
  };
  componentWillMount() {
    if (this.props.navigation.state.params) {
      this.setState({
        userAlarm: this.props.navigation.state.params.userAlarm,
      });
    }
  }
  componentDidMount() {
    this.handleGetPhotos();
  }
  width = Dimensions.get('window').width / 0.8;
  handleShowTimePicker = isVisible =>
    this.setState({ isTimePickerVisible: isVisible });
  handleShowModal = isVisible => this.setState({ isModalVisible: isVisible });
  handleShowPhotos = isVisible => this.setState({ isPhotosVisible: isVisible });
  handleShowMusics = isVisible => this.setState({ isMusicsVisible: isVisible });
  handleTimePicked = dateObj => {
    this.setState(prevState => ({
      ...prevState,
      userAlarm: {
        ...prevState.userAlarm,
        hours: dateObj.getHours(),
        minutes: dateObj.getMinutes(),
      },
    }));
    this.handleShowTimePicker(false);
  };
  handleChangeWeekdays = (name, checked, value) => {
    this.setState(prevState => ({
      ...prevState,
      userAlarm: {
        ...prevState.userAlarm,
        daysOfWeek: logicWeekday(
          checked,
          prevState.userAlarm.daysOfWeek,
          value
        ),
      },
    }));
  };
  handleConfirm = () => {
    const { navigation: { goBack, state } } = this.props;
    // const { hours, minutes } = this.state.userAlarm;
    // const a = new Date();
    // const alarmId = this.state.userAlarm.id.toString();
    // console.warn(Date.parse(a).toString());
    // const miliStr = Date.parse(
    //   `20${a.getYear() - 100}/${a.getMonth() +
    //     1}/${a.getDate()} ${hours}:${minutes}`
    // );
    // const miliStr = Date.parse(
    //   `20${a.getYear() - 100}-${a.getMonth() +
    //     1}-${a.getDate()}T`
    // );
    // const delay = miliStr - Date.now();
    // console.warn(`test : ${delay > 0 ? delay : 1000}`);
    if (state.params) {
      this.props.updateUserAlarm(
        state.params.userAlarm.id,
        this.state.userAlarm
      );
    } else {
      this.props.addUserAlarm(this.state.userAlarm);
    }
    // const b = new Date(
    //   `20${a.getYear() - 100}/${a.getMonth() +
    //     1}/${a.getDate()} ${a.getHours()}:${a.getMinutes() + 1}`
    // );
    // AlarmAndroid.alarmSetRTC(alarmId, b, 8.64e7);
    // AlarmAndroid.alarmExists(alarmId).then(([exists]) =>
    //   console.warn(`test6 ${exists ? 'exists' : 'does not exist'}`)
    // );
    // const testDate = new Date();
    // const alarmNotifData = {
    //   id: '12345', // Required
    //   title: 'My Notification Title', // Required
    //   message: 'My Notification Message', // Required
    //   ticker: 'My Notification Ticker',
    //   auto_cancel: true, // default: true
    //   vibrate: true,
    //   vibration: 100, // default: 100, no vibration if vibrate: false
    //   small_icon: 'ic_launcher', // Required
    //   large_icon: 'ic_launcher',
    //   play_sound: true,
    //   sound_name: 'meditation.mp3', // Plays custom notification ringtone if sound_name: null
    //   color: 'red',
    //   schedule_once: true, // Works with ReactNativeAN.scheduleAlarm so alarm fires once
    //   tag: 'some_tag',
    //   fire_date: `23-01-2018 ${testDate.getHours()}:${testDate.getMinutes()}:${testDate.getSeconds() + 2}`, // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm. Format: dd-MM-yyyy HH:mm:ss
    // };
    // ReactNativeAN.scheduleAlarm(alarmNotifData);
    return goBack();
  };
  handleRemoveAlarm = () => {
    this.props.removeUserAlarm(this.props.navigation.state.params.userAlarm.id);
    // AlarmAndroid.clearAlarm(this.state.userAlarm.id.toString());
    return this.props.navigation.goBack();
  };
  // render parts
  renderToolbar = () => {
    const { navigation: { goBack, state } } = this.props;
    const alarmId = state.params && state.params.alarmId;
    return (
      <Toolbar
        leftElement="arrow-back"
        onLeftElementPress={() => goBack()}
        centerElement="Edit Alarm"
        rightElement={alarmId ? 'done' : 'add'}
        onRightElementPress={() => this.handleConfirm()}
      />
    );
  };
  renderTextInput = () => (
    <View>
      <TextInput
        multiline
        maxHeight={100}
        maxWidth={this.width}
        placeholder="Please input new description"
        value={this.state.userAlarm.description}
        onChangeText={e =>
          this.setState(prevState => ({
            ...prevState,
            userAlarm: { ...prevState.userAlarm, description: e },
          }))
        }
        style={styles.textInput}
      />
    </View>
  );
  renderTimePicker = () => (
    <DateTimePicker
      mode="time"
      isVisible={this.state.isTimePickerVisible}
      onConfirm={this.handleTimePicked}
      onCancel={() => this.handleShowTimePicker(false)}
    />
  );
  renderModal = () => (
    <Modal
      style={styles.modal}
      isVisible={this.state.isModalVisible}
      onBackdropPress={() => this.handleShowModal(false)}
    >
      {weekdaysArr.map(e => (
        <Checkbox
          key={e.name}
          label={e.name}
          checked={this.state.userAlarm.daysOfWeek.indexOf(e.id) !== -1}
          value={e.id}
          onCheck={checked => this.handleChangeWeekdays(e.name, checked, e.id)}
        />
      ))}
    </Modal>
  );
  renderPhotos = () => (
    <Modal
      style={styles.modal}
      isVisible={this.state.isPhotosVisible}
      onBackdropPress={() => this.handleShowPhotos(false)}
    >
      {this.state.photos.map((e, i) => (
        <TouchableOpacity
          onPress={() => {
            this.setState(prevState => ({
              ...prevState,
              isPhotosVisible: false,
              userAlarm: {
                ...prevState.userAlarm,
                backgroundImg: e.node.image.uri,
              },
            }));
          }}
        >
          <Image
            key={i} // eslint-disable-line
            style={{
              width: 50,
              height: 50,
            }}
            source={{ uri: e.node.image.uri }}
          />
        </TouchableOpacity>
      ))}
    </Modal>
  );
  renderMusics = () => (
    <Modal
      style={styles.modal}
      isVisible={this.state.isMusicsVisible}
      onBackdropPress={() => this.handleShowMusics(false)}
    >
      {musics.map((e, i) => (
        <TouchableOpacity
          key={i} // eslint-disable-line
          onPress={() => {
            this.setState(prevState => ({
              ...prevState,
              isMusicsVisible: false,
              userAlarm: {
                ...prevState.userAlarm,
                sound: e.uri,
              },
            }));
          }}
        >
          <Text>{e.name}</Text>
        </TouchableOpacity>
      ))}
    </Modal>
  );
  handleGetPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(err => {
        console.warn(err.toString());
      });
  };
  // render method
  render() {
    return (
      <Container>
        {this.renderToolbar()}
        <View>
          <ListItem
            divider
            leftElement="alarm"
            centerElement={renderAlarmString(
              this.state.userAlarm.hours,
              this.state.userAlarm.minutes
            )}
            rightElement="edit"
            onRightElementPress={() => this.handleShowTimePicker(true)}
          />
          <ListItem
            divider
            leftElement="view-week"
            centerElement={`Repeat ${renderWeekdayString(
              this.state.userAlarm.daysOfWeek
            )}`}
            rightElement="edit"
            onRightElementPress={() => this.handleShowModal(true)}
          />
          <ListItem
            divider
            leftElement="insert-photo"
            centerElement="Choose Photo"
            rightElement="edit"
            onRightElementPress={() => this.handleShowPhotos(true)}
          />
          <ListItem
            divider
            leftElement="music-note"
            centerElement="Choose Music"
            rightElement="edit"
            onRightElementPress={() => this.handleShowMusics(true)}
          />
        </View>
        {this.renderTextInput()}
        {this.props.navigation.state.params && (
          <ListItem
            divider
            leftElement="remove-circle"
            centerElement="Remove Alarm"
            onPress={() => this.handleRemoveAlarm()}
          />
        )}
        {this.renderTimePicker()}
        {this.state.isPhotosVisible && this.renderPhotos()}
        {this.state.isModalVisible && this.renderModal()}
        {this.state.isMusicsVisible && this.renderMusics()}
      </Container>
    );
  }
}

EditAlarm.propTypes = propTypes;

const mapStateToProps = state => ({
  // userAlarms: state.userAlarms,
});
const mapDispatchToProps = dispatch => ({
  addUserAlarm: newAlarm => dispatch(addUserAlarm(newAlarm)),
  updateUserAlarm: (alarmId, updatedAlarm) =>
    dispatch(updateUserAlarm(alarmId, updatedAlarm)),
  removeUserAlarm: alarmId => dispatch(removeUserAlarm(alarmId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAlarm);
