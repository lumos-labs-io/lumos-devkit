#!/usr/bin/env node
import { scaffold } from "./scaffold";

const args = process.argv.slice(2);
const usage = `
create-lumos-app <project-name> --template <next|express|static>

Examples:
  create-lumos-app my-lumos --template next
  lumos-devkit my-api --template express
  lumos-devkit my-landing --template static
`;

async function run() {
  const name = args[0];
  const tIdx = args.indexOf("--template");
  const template = tIdx >= 0 ? args[tIdx + 1] : undefined;

  if (!name || !template || !["next", "express", "static"].includes(template)) {
    console.log(usage.trim());
    process.exit(template ? 0 : 1);
  }

  try {
    await scaffold({ name, template });
    console.log(`\n✅ Project created at ./${name}`);
    console.log(`\nNext steps:`);
    console.log(`  cd ${name}`);
    console.log(`  npm install`);
    console.log(`  npm run dev`);
  } catch (e: any) {
    console.error("❌ Failed to scaffold:", e?.message || e);
    process.exit(1);
  }
}

run();
