import { useEffect, useState } from "react";

export interface HeroVoIPButton {
  text: string;
  url: string;
}

export interface HeroVoIPSlide {
  backgroundImage: string;
  title?: string;
  description?: string;
  button?: HeroVoIPButton;
  backgroundOnly?: boolean;
  link?: string;
}

export interface HeroVoIPData {
  slides: HeroVoIPSlide[];
}

export function useHeroVoIPData() {
  const [data, setData] = useState<HeroVoIPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/hero-voip.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar hero-voip.json");
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
