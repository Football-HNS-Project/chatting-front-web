import { useState } from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
  layout?: "fill" | "responsive";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = "path/to/fallback/image.jpg",
  layout = "responsive",
  objectFit = "cover",
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const getWrapperClass = () => {
    if (layout === "fill") return "absolute inset-0";
    if (layout === "responsive") return "relative w-full h-0 pb-[100%]"; // 1:1 aspect ratio
    return "";
  };

  const getImageClass = () => {
    let classes = "transition-opacity duration-300 ";
    classes += isLoading ? "opacity-0" : "opacity-100";
    if (layout === "fill" || layout === "responsive")
      classes += " absolute inset-0 w-full h-full";
    classes += ` object-${objectFit}`;
    return classes;
  };

  return (
    <div className={`${getWrapperClass()} ${className || ""}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={getImageClass()}
        {...props}
      />
    </div>
  );
};
