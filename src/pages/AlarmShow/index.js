import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
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
  // viewButton: {
  //   textAlign: 'center',
  // },
});

const propTypes = {
  userAlarms: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};

// const alarmDetail = {
//   text:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed turpis orci. In elementum auctor pharetra. Etiam laoreet est eget tortor consequat, a malesuada augue dignissim. Nulla ut orci id enim cursus facilisis sit amet vitae massa. Nullam egestas tellus sit amet accumsan auctor. Duis aliquam, sapien vitae malesuada consequat, nisl turpis venenatis urna, in aliquam justo erat vel erat. Etiam volutpat odio sit amet lectus convallis rutrum. Vestibulum luctus erat sed lobortis ornare. Mauris vestibulum odio vitae erat vulputate, vitae tempus nibh rhoncus.',
//   imageUrl:
//     'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2Fimage%2F2016%2F02%2Fmain%2Fevergladesgettyimages-569057955-copy.jpg%3Fitok%3DrGqT412D&w=800&q=85',
//   alarm: 'sleep.aac',
// };

class AlarmShow extends Component {
  // componentDidMount() {
  //   Linking.addEventListener('url', this.handleOpenURL);
  // }
  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // }
  // handleOpenURL = event => {
  //   // D
  //   this.navigate(event.url);
  // };
  // navigate = url => {
  //   // E
  //   const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   // const id = route.match(/\/([^\/]+)\/?$/g)[1];
  //   const routeName = route.split('/')[0];
  //   if (routeName === 'alarmShow') {
  //     navigate('alarmShow' /* , { id, name: 'chris' } */);
  //   }
  // };
  render() {
    const { navigation: { navigate } } = this.props;
    const alarmDetail = this.props.userAlarms.find(
      e => e.id.toString() === this.props.navigation.state.params.key
    );
    // console.log(this.props.userAlarms);
    // console.log(this.props.navigation.state.params.key);
    // console.log(alarmDetail);
    return (
      <Container>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
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
const mapStateToProps = state => ({
  userAlarms: state.userAlarms,
});

export default connect(mapStateToProps)(AlarmShow);
