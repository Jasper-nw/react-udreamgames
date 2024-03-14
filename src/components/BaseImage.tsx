import Image from "next/image";
declare const VALID_LOADING_VALUES: readonly ["lazy", "eager", undefined];
type LoadingValue = (typeof VALID_LOADING_VALUES)[number];
type props = {
  className: string;
  src: string;
  width?: any;
  height?: any;
  anim?: boolean;
  alt: string;
  loading: LoadingValue;
};

const BaseImage = ({
  className,
  src,
  width = 0,
  height = 0,
  anim = false,
  alt,
  loading = "lazy",
}: props) => {
  const iconUrl = `https://www.doitme.link/cdn-cgi/image/anim=${anim},${width ? `w=${width},` : ""
    }${height ? `h=${height},` : ""},f=webp,fit=cover/${src}`;
  return (
    <Image
      className={className}
      src={iconUrl}
      width={width}
      height={height}
      loading={loading}
      alt={alt}
    />
  );
};

export default BaseImage;
