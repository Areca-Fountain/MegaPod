import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";
import BGImage from "../assets/login/01.svg"; // Use the same image

function Register() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Move with pointer
    const moveX = useTransform(mouseX, (val) => (window.innerWidth / 2 - val) * 0.05);
    const moveY = useTransform(mouseY, (val) => (window.innerHeight / 2 - val) * 0.05);

    const x = useSpring(moveX, { stiffness: 80, damping: 20 });
    const y = useSpring(moveY, { stiffness: 80, damping: 20 });

    const rotation = {
        animate: {
            rotate: [0, 360],
            transition: { repeat: Infinity, duration: 30, ease: "linear" },
        },
    };

    // Define positions and sizes for each image
    const images = [
        { top: "top-1/4", left: "left-1/4", size: "w-32 md:w-56 h-56" },
        { top: "top-1/4", left: "left-5/6", size: "w-16 md:w-44 h-44" },
        { top: "top-3/4", left: "left-1/4", size: "w-24 md:w-40 h-40" },
        { top: "top-6/8", left: "left-2/3", size: "w-12 md:w-32 h-32" },
    ];

    return (
        <div className="relative w-screen h-screen overflow-hidden z-0 bg-linear-65 from-pink-600 to-red-600 min-h-screen">
            {images.map((img, index) => (
                <motion.img
                    key={index}
                    src={BGImage}
                    alt={`BG-${index}`}
                    className={`absolute ${img.size} ${img.top} ${img.left} -translate-x-1/2 -translate-y-1/2 drop-shadow-xl`}
                    style={{ x, y }}
                    {...rotation}
                />
            ))}
        </div>
    );
}

export default Register;
