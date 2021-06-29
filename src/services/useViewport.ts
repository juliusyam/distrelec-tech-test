import { useState, useEffect } from 'react';

export function useViewport() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleWindowResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // const { width, height } = useViewport(); to retrieve width and height of screen
  return { width, height };
}

export enum Width {
  Phone = 600,
  SmallTablet = 992,
  LargeTablet = 1200,
}