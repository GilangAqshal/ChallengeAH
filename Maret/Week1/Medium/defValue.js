const config = {
  fps: 60
};

const { fps, resolution = "1080" } = config;

console.log(fps, resolution);
// Ekspektasi: 60 "1080p"