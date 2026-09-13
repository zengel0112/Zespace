import { motion } from "framer-motion";
import { useState, useRef, useCallback, memo } from "react";
import { ParticleSystem } from "./ParticleSystem";

interface AvatarProps {
  frameSrc?: string;
  avatarSrc?: string;
  frameSize?: string;
  avatarSize?: string;
  className?: string;
  onClick?: () => void;
}

export const Avatar = memo(
  ({
    frameSrc = "/frame.png",
    avatarSrc,
    frameSize,
    avatarSize,
    className = "",
    onClick,
  }: AvatarProps) => {
    // Images to toggle between
    const images = ["/IMG_6506.jpg", "/itachi1.png"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [particleTrigger, setParticleTrigger] = useState(0);
    const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });
    const avatarRef = useRef<HTMLDivElement>(null);

    // Use provided avatarSrc or default to first image in toggle list
    const currentAvatarSrc = avatarSrc || images[currentImageIndex];

    // Calculate avatar size based on frame size if not provided
    const calculatedAvatarSize =
      avatarSize || (frameSize ? `${parseInt(frameSize) * 0.7}px` : "40px");

    const handleClick = useCallback(() => {
      // Get avatar position for particles
      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setParticlePosition({ x: centerX, y: centerY });
        setParticleTrigger((prev) => prev + 1);
      }

      // Toggle between images if no custom onClick provided
      if (!onClick) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else {
        onClick();
      }
    }, [onClick]);

    return (
      <>
        <motion.div
          ref={avatarRef}
          className={`cursor-pointer relative z-10 ${className}`}
          transition={{
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 17,
            },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{
            scale: 0.85,
            y: 5,
          }}
          onClick={handleClick}
        >
          <div
            className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
            style={{
              width: frameSize || "60px",
              height: frameSize || "60px",
            }}
          >
            {/* Frame */}
            <img
              src={frameSrc}
              alt="Avatar frame"
              className="absolute inset-0 z-10 object-contain w-full h-full"
              loading="eager"
              decoding="async"
            />
            {/* Avatar - Centered inside frame */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
              <motion.img
                key={currentImageIndex}
                src={currentAvatarSrc}
                alt="Avatar"
                className="object-contain w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[55px] md:h-[55px]"
                style={{
                  width: calculatedAvatarSize,
                  height: calculatedAvatarSize,
                }}
                loading="eager"
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
        <ParticleSystem trigger={particleTrigger} position={particlePosition} />
      </>
    );
  }
);
