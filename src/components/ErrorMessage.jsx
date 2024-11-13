import { motion } from "motion/react";
import { shakeX } from "../animations";

const ErrorMessage = ({ message }) => (
  <motion.p {...shakeX}>
    {message}
  </motion.p>
);

export default ErrorMessage;