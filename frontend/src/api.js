const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function testBackend() {
  const res = await fetch(`${API_BASE_URL}/pratyush`);
  return res.json();
}
