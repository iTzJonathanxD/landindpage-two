import { useEffect, useState } from "react";

export type ConocenosImages = {
  planes: string[];
  servicios: string[];
  contacto: string[];
};

export function useConocenosImages(): ConocenosImages | null {
  const [images, setImages] = useState<ConocenosImages | null>(null);

  useEffect(() => {
    fetch("/conocenos-images.json")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch(() => setImages(null));
  }, []);

  return images;
}
