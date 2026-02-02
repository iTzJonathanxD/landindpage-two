import { useEffect, useState } from "react";

export interface Slide {
  backgroundImage: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  description: string;
  badge: {
    value: string;
    label: string;
  };
  alphyImage: string;
  button: {
    text: string;
    url: string;
  };
}

export interface HeroData {
  slides: Slide[];
}

export function useHeroData() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/hero.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar hero.json");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error desconocido");
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
