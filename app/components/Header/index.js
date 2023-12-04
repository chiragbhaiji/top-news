import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Appearance,
} from 'react-native';

import PropTypes from 'prop-types';

const colorScheme = Appearance.getColorScheme();

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
    tintColor: colorScheme === 'dark' ? 'white' : 'black',
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
