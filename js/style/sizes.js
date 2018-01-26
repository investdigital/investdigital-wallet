/**
 * App Theme - Sizes
 *
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {

  // Window Dimensions
  screen: {
    height: screenHeight,
    width: screenWidth,

    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthThreeQuarters: screenWidth * 0.75,
  },
  // Padding
    padding_5: 5,
    padding_10: 10,
    padding_20: 20,
    padding_25: 25,
    padding_30: 30,
    //margin
    margin_5:5,
    margin_10:10,
    margin_20:20,
    margin_25:25,
    margin_30:30,
    margin_40:40,
};
