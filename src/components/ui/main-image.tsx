import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RotatingImageProps {
    src: string;
    alt: string;
}

const RotatingImage: React.FC<RotatingImageProps> = ({ src, alt }) => {
    const [innerWidth, setInnerWidth] = useState(0);
    const [innerHeight, setInnerHeight] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        }
        const handleMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    const rotateX = useTransform(mouseY, [0, innerHeight], [15, -15]);
    const rotateY = useTransform(mouseX, [0, innerWidth], [-15, 15]);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
    };

    return (
        <motion.div
            className='ml-60'
            style={{
                perspective: 250,
            }}
        >
            <motion.img
                src={src}
                alt={alt}
                style={{
                    rotateX,
                    rotateY,
                }}
                className="w-[400px] h-[400px]"
                onLoad={handleImageLoad}
            />
        </motion.div>
    );
};

export default RotatingImage;