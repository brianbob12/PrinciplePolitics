import { useState, useEffect } from 'react';

export default () => {
  const getWindowDimensions = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    return ({
      width,
      height
    })

  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}
