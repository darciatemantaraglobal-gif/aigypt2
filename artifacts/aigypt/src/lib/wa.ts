const WA_NUMBER = import.meta.env.VITE_WA_NUMBER ?? "628xxxxxxxxxx";

export const waUrl = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
