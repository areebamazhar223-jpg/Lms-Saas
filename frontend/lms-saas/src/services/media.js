import api from "./api";

const API_ORIGIN = api.defaults.baseURL?.replace(/\/api\/?$/, "") || window.location.origin;

export const getCourseImageUrl = (thumbnail) => {
  if (!thumbnail) return "https://placehold.co/800x500?text=Course+Thumbnail";

  const value = String(thumbnail).trim();
  if (/^(https?:|data:|blob:)/i.test(value)) return value;

  const path = value.replace(/^\/?uploads[\\/]/i, "");
  const encodedPath = path.split(/[\\/]+/).filter(Boolean).map(encodeURIComponent).join("/");
  return `${API_ORIGIN}/uploads/${encodedPath}`;
};
