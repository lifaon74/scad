import { houseProject } from './__projects/house/house.project.ts';

async function main(): Promise<void> {
  // await debugFunctionBased();
  await houseProject();
  // await debugClassBased();
  // await debugPartBased();
}

main();
