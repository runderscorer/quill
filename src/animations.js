export const slideDownFade = {
  initial: { 
    y: 0, 
    opacity: 0 
  },
  animate: {
    y: [0, 30, 0],
    opacity: [0, 0.7, 1]
  },
  transition: { 
    duration: 0.3,
    ease: ["easeIn", "easeOut"]
  }
}

export const shakeX = {
  initial: {
    x: 0
  },
  animate: {
    x: [0, -5, 0, 5, 0]
  },
  transition: {
    duration: 0.2 
  }
}
