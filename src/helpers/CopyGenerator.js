export default class CopyGenerator {
  static playerResponseHeader = () => {
    const copy = [
      'Behold this wonderous creation!',
      'Gaze upon this marvel!',
      'See the beauty woven here:',
      'Hark! and take in this masterpiece:',
      'Witness this splendid craft:'
    ]

    return copy[Math.floor(Math.random() * copy.length)]
  } 

  static chooseWisely = () => {
    const copy = [
      'Each choice is a seed -- nurture it wisely and select a response below:',
      'Let the winds of fate guide your hand and select a response below:',
      'Paint your future with vision and select a response below:',
      'Follow the path of your heart and select a response below:'
    ]

    return copy[Math.floor(Math.random() * copy.length)]
  }

  static choseWisely = () => {
    const copy = [
      'Selected like a rare gem! Bravo!',
      'Hark! Your selection is made bare!',
      'Chosen with the wisdom of the ages! A masterful selection!',
      'A decision made with the heart! The most tender choice!'
    ]

    return copy[Math.floor(Math.random() * copy.length)]
  }

  static playerNameLabel = () => {
    const copy = [
      'lyrical odist.',
      'evocative bard.',
      'visionary poet.',
      'masterful lyricist.'
    ]

    return copy[Math.floor(Math.random() * copy.length)]
  }
}
