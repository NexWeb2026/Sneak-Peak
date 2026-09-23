export type SneakerDrop = {
  id: string;
  handle: string;
  name: string;
  date: string;
  displayDate: string;
  time: string;
  image: string;
  imageAlt: string;
  colourway: string;
};

export const upcomingDrops: SneakerDrop[] = [
  {
    id: "drop-velocity-signal",
    handle: "velocity-cream-runner",
    name: "Velocity Signal",
    date: "2026-10-03T10:00:00+02:00",
    displayDate: "03 Oct 2026",
    time: "10:00 SAST",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Red Velocity sneaker release",
    colourway: "Signal Red",
  },
  {
    id: "drop-summit-stone",
    handle: "summit-knit-high",
    name: "Summit Stone",
    date: "2026-10-17T10:00:00+02:00",
    displayDate: "17 Oct 2026",
    time: "10:00 SAST",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Summit high top sneaker release",
    colourway: "Stone / Chalk",
  },
  {
    id: "drop-aero-ice",
    handle: "aero-blue-knit",
    name: "Aero Ice",
    date: "2026-11-07T10:00:00+02:00",
    displayDate: "07 Nov 2026",
    time: "10:00 SAST",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Aero blue knit sneaker release",
    colourway: "Ice Blue",
  },
];
