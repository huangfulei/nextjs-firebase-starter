import * as React from "react";
import Image from "next/image";

import { type ILogoProps } from ".";

/**
 * Logo component.
 * @param props - Logo props.
 * @returns Header with component name.
 */
export const Logo: React.FC<ILogoProps> = (props) => {
  const { title, imageUrl } = props;
  return (
    <div className={"flex items-center"}>
      <p className={"font-semibold "}>{title}</p>
      {imageUrl && (
        <Image
          className={"ml-2 rounded-md"}
          src={imageUrl}
          alt={title || "brand image"}
          width={70}
          height={70}
          placeholder={"blur"}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOccel1PQAHNQLWmSisQgAAAABJRU5ErkJggg=="
        />
      )}
    </div>
  );
};
