import { useEffect, useRef } from 'react';

import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';

const defaults = {
    Dots: false,
    Thumbs: {
        type: 'classic',
    },
};

function Carousel(props) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const options = { ...defaults, ...(props.options || {}) };
        const instance = new NativeCarousel(container, options, { Thumbs });

        return () => {
            instance.destroy();
        };
    }, [props.options]);

    return (
        <div className="f-carousel" ref={containerRef}>
            {props.children}
        </div>
    )

}

export default Carousel;