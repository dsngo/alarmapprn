import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import PNotification from 'react-native-push-notification';
import ImagePicker from 'react-native-image-picker';
import {
  ListItem,
  Icon,
  Toolbar,
  Checkbox,
  RadioButton,
} from 'react-native-material-ui';
import Container from '../../components/Container';
import {
  addUserAlarm,
  updateUserAlarm,
  removeUserAlarm,
  saveDataToStorage,
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
  saveDataToStorage: PropTypes.func.isRequired,
};

//  Put Music Uri and name here for user to choose
const musics = [
  { name: 'Morning Meditation', uri: 'meditation_morning.mp3' },
  { name: 'Afternoon Meditation', uri: 'meditation_afternoon.mp3' },
  { name: 'Evening Meditation', uri: 'meditation_evening.mp3' },
];

class EditAlarm extends Component {
  state = {
    userAlarm: {
      id: Date.now(),
      hours: getTimeUnits().hours,
      minutes: getTimeUnits().minutes,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      active: true,
      snooze: true,
      label: 'Alarm',
      repeat: false,
      sound: 'meditation_morning.mp3',
      description: '',
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
  handleConfirm = async () => {
    const { navigation: { goBack, state } } = this.props;
    if (state.params) {
      this.props.updateUserAlarm(
        state.params.userAlarm.id,
        this.state.userAlarm
      );
    } else {
      const { hours, minutes, id } = this.state.userAlarm;
      const alarmId = id.toString();
      console.log(alarmId); // eslint-disable-line
      const a = new Date();
      const b = new Date(
        `20${a.getYear() - 100}/${a.getMonth() +
          1}/${a.getDate()} ${hours}:${minutes}`
      );
      const localNotif = {
        /* Android Only Properties */
        date: b,
        key: alarmId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        ticker: 'Ticker Message',
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
        smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: '瞑想の時間となりました。瞑想を始めてください。', // (optional) default: "message" prop
        subText: '瞑想時間の通知', // (optional) default: none
        ongoing: true, // (optional) set whether this is an "ongoing" notification
        title: 'ブレインストレッチ', // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        message: '', // (required)
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
      };
      await PNotification.localNotificationSchedule(localNotif);
      await this.props.addUserAlarm(this.state.userAlarm);
    }
    await this.props.saveDataToStorage();
    return goBack();
  };
  handleRemoveAlarm = async () => {
    this.props.removeUserAlarm(this.props.navigation.state.params.userAlarm.id);
    await PNotification.cancelLocalNotifications({
      key: this.state.userAlarm.id.toString(),
    });
    await this.props.saveDataToStorage();
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
        centerElement="アラーム時刻設定"
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
        placeholder={'ご自由に入力してください\n(再生画面に表示されます)'}
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
      {musics.map(e => (
        <RadioButton
          key={`music-${e.name}`}
          label={e.name}
          checked={e.uri === this.state.userAlarm.sound}
          value="Value"
          onCheck={() => {
            this.setState(prevState => ({
              ...prevState,
              isMusicsVisible: false,
              userAlarm: {
                ...prevState.userAlarm,
                sound: e.uri,
              },
            }));
          }}
        />
      ))}
    </Modal>
  );
  selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, rs => {
      this.setState(prevState => ({
        ...prevState,
        userAlarm: { ...prevState.userAlarm, backgroundImg: rs.uri },
      }));
    });
  };
  // render method
  render() {
    return (
      <Container>
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
        >
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
              // rightElement="edit"
              // onRightElementPress={() => this.handleShowModal(true)}
            />
            <ListItem
              divider
              leftElement="insert-photo"
              centerElement="背景画像を選ぶ"
              rightElement="edit"
              onRightElementPress={() => this.selectPhotoTapped()}
            />
            <View
              style={{
                justifyContent: 'center',
                marginTop: '3%',
                marginBottom: '3%',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  // flex: 1,
                  width: this.width / 4,
                  height: 150,
                }}
                source={{ uri: this.state.userAlarm.backgroundImg }}
              />
            </View>
            <ListItem
              divider
              leftElement="library-music"
              centerElement="再生するオーディオを選ぶ"
              rightElement="edit"
              onRightElementPress={() => this.handleShowMusics(true)}
            />
            <ListItem
              centerElement={
                <View
                  style={{
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <Icon style={{ marginRight: 10 }} name="music-note" />
                  <Text>{this.state.userAlarm.sound}</Text>
                </View>
              }
            />
          </View>
          {this.renderTextInput()}
          {this.props.navigation.state.params && (
            <ListItem
              divider
              leftElement="remove-circle"
              centerElement="このアラームを削除する"
              onPress={() => this.handleRemoveAlarm()}
            />
          )}
          {this.renderTimePicker()}
          {this.state.isModalVisible && this.renderModal()}
          {this.state.isMusicsVisible && this.renderMusics()}
        </ScrollView>
      </Container>
    );
  }
}

EditAlarm.propTypes = propTypes;

const mapStateToProps = () => ({
  // userAlarms: state.userAlarms,
});
const mapDispatchToProps = dispatch => ({
  addUserAlarm: newAlarm => dispatch(addUserAlarm(newAlarm)),
  updateUserAlarm: (alarmId, updatedAlarm) =>
    dispatch(updateUserAlarm(alarmId, updatedAlarm)),
  removeUserAlarm: alarmId => dispatch(removeUserAlarm(alarmId)),
  saveDataToStorage: () => dispatch(saveDataToStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAlarm);
