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

export const popIn = {
  initial: {
    scale: 0
  },
  animate: {
    scale: [0, 1.1, 1]
  },
  transition: {
    duration: 0.4
  }
}

export const slideUpFade = {
  initial: {
    y: 0,
    opacity: 0
  },
  animate: {
    y: [-30, 0],
    opacity: [0, 1]
  },
  transition: {
    duration: 0.3,
    ease: ["easeIn", "easeOut"]
  }
}

export const parentStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.5,
      staggerDirection: -1
    },
  },
}

export const childStagger = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
    }
  },
}
