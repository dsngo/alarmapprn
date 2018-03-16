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
});

const propTypes = {
  userAlarms: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};
class AlarmShow extends Component {
  render() {
    const { navigation: { navigate } } = this.props;
    const alarmDetail = this.props.userAlarms.find(
      e => e.id.toString() === this.props.navigation.state.params.id
    );
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
