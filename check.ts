const res = await fetch(
  `https://floodwatch.io/api/public/v0/devices/70B3D57ED00686C3/data`
);

if (!res.ok) {
  throw new Error("Failed to fetch data");
}

console.log(JSON.stringify(await res.json(), null, 2));
