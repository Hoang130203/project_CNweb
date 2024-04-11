import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect, useRef } from 'react';

const defaults = {
  Dots: false,
  Thumbs: {
      type: 'classic',
  },
};

function Fancybox(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const delegate = props.delegate || '[data-fancybox]';
    const options = { ...defaults, ...(props.options || {}) };

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, [props.delegate, props.options]);

  return  <div ref={containerRef}>{props.children}</div>;

}

export default Fancybox;