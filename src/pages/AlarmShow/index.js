import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Toolbar, Icon, Button } from 'react-native-material-ui';
import Container from '../../components/Container';

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  iconAlarm: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 80,
  },
});

const propTypes = {
  // userAlarms: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};
class AlarmShow extends Component {
  render() {
    const { navigation: { navigate, goBack, state } } = this.props;
    // const alarmDetail = this.props.userAlarms.find(
    //   e => e.id.toString() === this.props.navigation.state.params.id
    // );
    const alarmDetail = (state.params && state.params.alarmObj) || {
      id: 0,
      hours: 0,
      minutes: 0,
      daysOfWeek: [],
      active: true,
      snooze: true,
      label: 'Alarm',
      repeat: false,
      sound: 'meditation.mp3',
      description: 'New and beautiful Sunshine',
      backgroundImg:
        'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2Fimage%2F2016%2F02%2Fmain%2Fevergladesgettyimages-569057955-copy.jpg%3Fitok%3DrGqT412D&w=800&q=85',
    };
    // console.log(this.props.navigation.state.params.alarmObj, alarmDetail);
    return (
      <Container>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => goBack()}
          centerElement=""
        />
        <View style={styles.iconAlarm}>
          <Icon name="alarm" size={250} />
        </View>
        <Button
          raised
          primary
          text="瞑想導入へ"
          style={{ container: styles.viewButton }}
          onPress={() =>
            navigate('alarmShowDetail', {
              alarmDetail,
            })
          }
        />
      </Container>
    );
  }
}
AlarmShow.propTypes = propTypes;
export default AlarmShow;
