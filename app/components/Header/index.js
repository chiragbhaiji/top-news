import PropTypes from 'prop-types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Theme from '../../Theme';

const color = Theme.color;

export const Header = ({title, left, right}) => {
  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        {left && (
          <HeaderActionItem iconSource={left.iconSource} action={left.action} />
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.actionContainer}>
        {right && (
          <HeaderActionItem
            iconSource={right.iconSource}
            action={right.action}
          />
        )}
      </View>
    </View>
  );
};

const HeaderActionItem = ({iconSource, action}) => {
  return (
    <TouchableOpacity
      style={styles.imgContainer}
      onPress={action ? action : undefined}>
      <Image style={styles.img} source={iconSource} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 3,
    color: color.text.primary,
  },
  actionContainer: {
    flex: 1,
  },
  imgContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flex: 1,
  },
  img: {
    aspectRatio: 1,
    height: 30,
    tintColor: color.icon.primary,
  },
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
  left: PropTypes.shape({
    iconSource: PropTypes.number.isRequired,
    action: PropTypes.func.isRequired,
  }),
  right: PropTypes.shape({
    iconSource: PropTypes.number.isRequired,
    action: PropTypes.func.isRequired,
  }),
};
