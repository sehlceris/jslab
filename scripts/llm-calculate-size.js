function calculateGpuMemory(billionParameters, precisionBits) {
  const bytesPerParam = 4; // 4 bytes per parameter
  const overhead = 1.2; // 20% overhead
  const bitsPerByte = 32; // 32 bits in 4 bytes

  // Memory calculation in GB - https://www.substratus.ai/blog/calculating-gpu-memory-for-llm
  const memoryGB =
    ((billionParameters * bytesPerParam) / (bitsPerByte / precisionBits)) *
    overhead;
  return memoryGB;
}

const models = [
  { name: "72B", params: 70 },
  { name: "70B", params: 70 },
  { name: "32B", params: 32 },
  { name: "14B", params: 14 },
  { name: "8B", params: 8 },
  { name: "7B", params: 7 },
  { name: "3B", params: 3 },
  { name: "1B", params: 1 },
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
    Memory Requirements for 72B Model:
    - 8-bit precision: 84.00 GB
    - 6-bit precision: 63.00 GB
    - 5-bit precision: 52.50 GB
    - 4-bit precision: 42.00 GB

    Memory Requirements for 70B Model:
    - 8-bit precision: 84.00 GB
    - 6-bit precision: 63.00 GB
    - 5-bit precision: 52.50 GB
    - 4-bit precision: 42.00 GB

    Memory Requirements for 32B Model:
    - 8-bit precision: 38.40 GB
    - 6-bit precision: 28.80 GB
    - 5-bit precision: 24.00 GB
    - 4-bit precision: 19.20 GB

    Memory Requirements for 14B Model:
    - 8-bit precision: 16.80 GB
    - 6-bit precision: 12.60 GB
    - 5-bit precision: 10.50 GB
    - 4-bit precision: 8.40 GB

    Memory Requirements for 8B Model:
    - 8-bit precision: 9.60 GB
    - 6-bit precision: 7.20 GB
    - 5-bit precision: 6.00 GB
    - 4-bit precision: 4.80 GB

    Memory Requirements for 7B Model:
    - 8-bit precision: 8.40 GB
    - 6-bit precision: 6.30 GB
    - 5-bit precision: 5.25 GB
    - 4-bit precision: 4.20 GB

    Memory Requirements for 3B Model:
    - 8-bit precision: 3.60 GB
    - 6-bit precision: 2.70 GB
    - 5-bit precision: 2.25 GB
    - 4-bit precision: 1.80 GB

    Memory Requirements for 1B Model:
    - 8-bit precision: 1.20 GB
    - 6-bit precision: 0.90 GB
    - 5-bit precision: 0.75 GB
    - 4-bit precision: 0.60 GB
 */
