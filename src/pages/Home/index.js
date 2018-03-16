/* eslint no-console: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  ScrollView,
  Platform,
  Animated,
  Easing,
  Image,
  Text,
  View,
  CameraRoll, // eslint-disable-line
} from 'react-native';
import { ListItem, Toolbar } from 'react-native-material-ui';
import PNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
// import MaterialSwitch from '../../components/Switch';
import Container from '../../components/Container';
import {
  pullDataFromStorage,
  saveDataToStorage,
} from '../../redux/actionCreators';
import { renderAlarmString, renderAlarmLabel, imageAssets } from '../../utils';

const UP = 1;
const DOWN = -1;
function testNavigate({ navigation }) {
  PNotification.configure({
    onNotification(notification) {
      console.log('NOTIFICATION:', notification); // eslint-disable-line
      navigation.navigate('alarmShow', { id: notification.id });
    },
  });
}
const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  userAlarms: PropTypes.arrayOf(PropTypes.shape({})).isRequired, // eslint-disable-line
  pullDataFromStorage: PropTypes.func.isRequired,
  saveDataToStorage: PropTypes.func.isRequired,
};
class Home extends Component {
  state = {
    // active: 'people',
    moveAnimated: new Animated.Value(0),
    isEditing: false,
  };
  componentWillMount() {
    if (this.state.isEditing) {
      this.state.isEditing = false;
    }
    this.props.pullDataFromStorage();
    testNavigate(this.props);
  }
  componentWillUnmount() {
    this.props.saveDataToStorage();
  }

  handleOpenURL = event => {
    this.navigate(event.url);
  };

  navigate = url => {
    const { navigate } = this.props.navigation;

    const route = url.replace(/.*?:\/\//g, '');
    // const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];
    if (routeName === 'alarmshow') {
      navigate('alarmShow');
    }
  };

  offset = 0;
  scrollDirection = 0;
  onScroll = ev => {
    const currentOffset = ev.nativeEvent.contentOffset.y;
    const sub = this.offset - currentOffset;
    // don't care about very small moves
    if (sub > -2 && sub < 2) {
      return;
    }
    this.offset = ev.nativeEvent.contentOffset.y;
    const currentDirection = sub > 0 ? UP : DOWN;
    if (this.scrollDirection !== currentDirection) {
      this.scrollDirection = currentDirection;
      // this.setState({
      //   bottomHidden: currentDirection === DOWN,
      // });
    }
  };

  show = () => {
    Animated.timing(this.state.moveAnimated, {
      toValue: 0,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  };
  hide = () => {
    Animated.timing(this.state.moveAnimated, {
      toValue: 56, // because the bottom navigation bar has height set to 56
      duration: 195,
      easing: Easing.bezier(0.4, 0.0, 0.6, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  };
  navigateEditAlarm = () => {};
  handleToggleEditAlarm = () =>
    this.setState(prevState => ({
      ...prevState,
      isEditing: !prevState.isEditing,
    }));
  renderToolbar = () => {
    const { navigate } = this.props.navigation;
    const { isEditing } = this.state;
    return (
      <Toolbar
        // key="toolbar"
        onLeftElementPress={() => this.handleToggleEditAlarm()}
        leftElement={isEditing ? 'done' : 'edit'}
        // centerElement="ブレインストレッチ"
        centerElement={
          <View
            style={{
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              flexDirection: 'row',
            }}
          >
            <Image source={imageAssets.spoonLogo} />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
              ブレインストレッチ
            </Text>
          </View>
        }
        rightElement="add-alarm"
        onRightElementPress={() => navigate('editAlarm')}
        style={{
          titleText: {
            // fontWeight: '900',
            fontSize: 20,
            textAlign: 'center',
            paddingRight: 10,
          },
          leftElementContainer: {
            // paddingLeft: 15,
          },
          rightElementContainer: {
            // paddingRight: 15,
          },
        }}
      />
    );
  };
  renderAlarm = (alarmContent, route) => {
    const { hours, minutes, daysOfWeek, label, id } = alarmContent;
    const { isEditing } = this.state;
    return (
      <View key={`renderedAlarm-${id}`}>
        <ListItem
          divider
          numberOfLines="dynamic"
          style={{
            container: { height: 115 },
            primaryText: {
              paddingTop: 30,
              fontSize: 50,
              fontWeight: '900',
            },
            tertiaryText: { fontSize: 15, paddingLeft: 5 },
            leftElementContainer: {
              paddingTop: 12,
            },
          }}
          centerElement={{
            primaryText: renderAlarmString(hours, minutes),
            tertiaryText: renderAlarmLabel(label, daysOfWeek),
          }}
          onPress={() =>
            isEditing
              ? this.props.navigation.navigate(route, {
                  userAlarm: alarmContent,
                })
              : this.props.navigation.navigate('alarmShow', {
                  id: id.toString(),
                })
          }
          rightElement={isEditing ? 'keyboard-arrow-right' : 'alarm'}
        />
      </View>
    );
  };
  render() {
    return (
      <Container>
        {this.renderToolbar()}
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          {this.props.userAlarms.map(e => this.renderAlarm(e, 'editAlarm'))}
        </ScrollView>
      </Container>
    );
  }
}
Home.propTypes = propTypes;
//  RESET
const mapStateToProps = state => ({
  userAlarms: state.userAlarms,
});
const mapDispatchToProps = dispatch => ({
  pullDataFromStorage: () => dispatch(pullDataFromStorage()),
  saveDataToStorage: () => dispatch(saveDataToStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/* for the switch feature
(
              <MaterialSwitch
                active={active || false}
                activeBackgroundColor="#F48FB1"
                inactiveBackgroundColor="#E0E0E0"
                activeButtonColor="#D81B60"
                activeButtonPressedColor="#D81B60"
                inactiveButtonColor="#fff"
                inactiveButtonPressedColor="#fff"
              />
            ) 
*/
