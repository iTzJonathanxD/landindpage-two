import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

function toPascalCase(str: string) {
  return str
    .replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());
}

export function getLucideIconByName(name: string): LucideIcon | undefined {
  if (!name) return undefined;
  const pascal = toPascalCase(name);
  return (LucideIcons as any)[pascal] || undefined;
}
