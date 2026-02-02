import { useEffect, useState } from "react";

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

type PlanType = "pricing" | "iptv" | "voip";
type Segmento = "residencial" | "comercial";

export function usePlanes(type: PlanType, segmento: Segmento = "residencial") {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/planes/${type}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el archivo de planes");
        return res.json();
      })
      .then((data) => {
        let planData;
        if (type === "pricing") {
          planData = data.internet;
        } else {
          planData = data;
        }
        setPlanes(planData[segmento] || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type, segmento]);

  return { planes, loading, error };
}
