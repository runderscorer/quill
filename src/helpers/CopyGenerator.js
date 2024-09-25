export default class CopyGenerator {
  static playerResponse = () => {
    const copy = [
      'Behold this wonderous creation!',
      'Gaze upon this marvel!',
      'See the beauty woven here:',
      'Hark! and take in this masterpiece:',
      'Witness this splendid craft:'
    ]

    return copy[Math.floor(Math.random() * copy.length)]
  } 
}
