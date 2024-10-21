const BASE_URL =
  process.env.NEXT_PUBLIC_PRODUCTION === "production"
    ? "http://202.10.40.136/api"
    : "http://localhost:8000/api";

const IMAGE_URL =
  process.env.NEXT_PUBLIC_PRODUCTION === "production"
    ? "http://202.10.40.136/storage"
    : "http://localhost:8000/storage";

export { BASE_URL, IMAGE_URL };
