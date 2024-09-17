type Device = {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
};

type Reading = {
  createdAt: string;
  temperature: number;
  humidity: number;
  rain: number;
};

const root = "https://floodwatch.io/api/public/v0/";

const allDevices = await fetch(`${root}devices`);

if (!allDevices.ok) {
  throw new Error("Failed to fetch devices");
}

const devices = (await allDevices.json()) as Device[];

const promises: Promise<Reading[]>[] = [];

for (const device of devices) {
  const readings = fetch(`${root}devices/${device.id}/data`)
    .then((r) => r.json())
    .catch((e) => {
      console.log(e);
      console.log(device.id);
    });
  promises.push(readings);
}

const readings = (await Promise.all(promises)).flat();

const outfile = Bun.file("readings.json");
await Bun.write(outfile, JSON.stringify(readings, null, 2));

console.log("Done!");
