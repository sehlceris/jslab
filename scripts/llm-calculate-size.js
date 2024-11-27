function calculateGpuMemory(parameters, precisionBits) {
  const bytesPerParam = 4; // 4 bytes per parameter
  const overhead = 1.2; // 20% overhead
  const bitsPerByte = 32; // 32 bits in 4 bytes

  // Memory calculation in GB
  const memoryGB =
    ((bitsPerByte / precisionBits) * (parameters * bytesPerParam) * overhead) /
    1024 ** 3;
  return memoryGB;
}

const models = [
  { name: "70B", params: 70e9 },
  { name: "32B", params: 32e9 },
  { name: "14B", params: 14e9 },
  { name: "7B", params: 7e9 },
  { name: "3B", params: 3e9 },
];

const precisions = [8, 6, 5, 4];

models.forEach((model) => {
  console.log(`\nMemory Requirements for ${model.name} Model:`);
  precisions.forEach((precision) => {
    const memory = calculateGpuMemory(model.params, precision).toFixed(2);
    console.log(` - ${precision}-bit precision: ${memory} GB`);
  });
});

/*
Memory Requirements for 70B Model:
 - 8-bit precision: 1251.70 GB
 - 6-bit precision: 1668.93 GB
 - 5-bit precision: 2002.72 GB
 - 4-bit precision: 2503.40 GB

Memory Requirements for 32B Model:
 - 8-bit precision: 572.20 GB
 - 6-bit precision: 762.94 GB
 - 5-bit precision: 915.53 GB
 - 4-bit precision: 1144.41 GB

Memory Requirements for 14B Model:
 - 8-bit precision: 250.34 GB
 - 6-bit precision: 333.79 GB
 - 5-bit precision: 400.54 GB
 - 4-bit precision: 500.68 GB

Memory Requirements for 7B Model:
 - 8-bit precision: 125.17 GB
 - 6-bit precision: 166.89 GB
 - 5-bit precision: 200.27 GB
 - 4-bit precision: 250.34 GB

Memory Requirements for 3B Model:
 - 8-bit precision: 53.64 GB
 - 6-bit precision: 71.53 GB
 - 5-bit precision: 85.83 GB
 - 4-bit precision: 107.29 GB
*/
