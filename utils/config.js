const BASE_URL =
  process.env.NEXT_PUBLIC_PRODUCTION === "production"
    ? "http://api.intannuzulina.online/api"
    : "http://localhost:8000/api";

const IMAGE_URL =
  process.env.NEXT_PUBLIC_PRODUCTION === "production"
    ? "http://api.intannuzulina.online/api"
    : "http://localhost:8000/storage";

export { BASE_URL, IMAGE_URL };
