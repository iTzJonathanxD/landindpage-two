import { useEffect, useState } from "react";

export interface SocialLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
}

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/social-links.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar social-links.json");
        return res.json();
      })
      .then((json) => {
        setLinks(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error desconocido");
        setLoading(false);
      });
  }, []);

  return { links, loading, error };
}
