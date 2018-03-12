import { View, StyleSheet } from 'react-native';
import React from 'react';
import { PropTypes } from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Container = props => (
  <View style={styles.container}>{props.children}</View>
);

Container.propTypes = propTypes;

export default Container;
