function Loading({ ready, children }) {
  if (ready) {
    return children;
  } else {
    return (
      <div>Loading...</div>
    );
  }
}

export default Loading;
