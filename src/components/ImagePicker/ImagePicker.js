import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import Config from 'config/colors';

const ImagePicker = ({ imageSource, setImageSource }) => {
  const selectImage = () => {
    let options = {
      maxWidth: 256,
      maxHeight: 256,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageSource(response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.imageContainer}>
      {imageSource === null ? (
        <Image
          source={require('../../assets/default-avatar.png')}
          style={styles.imageBox}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{ uri: imageSource.uri }}
          style={styles.imageBox}
          resizeMode="cover"
        />
      )}
      <TouchableOpacity
        onPress={selectImage}
        style={[styles.selectButtonContainer]}>
        <Text style={styles.selectButtonTitle}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  selectButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: Config.secondary,
  },
  selectButtonTitle: {
    padding: 10,
    fontSize: 18,
    color: '#fff',
  },
  imageContainer: {
    paddingVertical: 20,
    backgroundColor: Config.lightGray,
    display: 'flex',
    alignItems: 'center',
  },
  imageBox: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Config.secondary,
  },
});

export default ImagePicker;
