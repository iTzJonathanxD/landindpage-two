import { useEffect, useState } from "react";

export interface HeroIPTVButton {
  text: string;
  url: string;
}

export interface HeroIPTVSlide {
  backgroundImage: string;
  title?: string;
  description?: string;
  button?: HeroIPTVButton;
  backgroundOnly?: boolean;
  link?: string;
}

export interface HeroIPTVData {
  slides: HeroIPTVSlide[];
}

export function useHeroIPTVData() {
  const [data, setData] = useState<HeroIPTVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/hero-iptv.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar hero-iptv.json");
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
