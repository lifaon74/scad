import { debugFunctionBased } from './__debug/debug-function-based.ts';

async function main(): Promise<void> {
  await debugFunctionBased();
  // await houseProject();
  // await debugClassBased();
  // await debugPartBased();
}

main();
