export async function getDevices() {
  try {
    const res = await fetch("data/devices.json");
    if (!res.ok) throw new Error("Error loading data");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}