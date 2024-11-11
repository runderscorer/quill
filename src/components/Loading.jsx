function Loading({ ready, text = 'Loading', children }) {
  if (ready) {
    return children;
  } else {
    return (
      <div>{text}...</div>
    );
  }
}

export default Loading;
