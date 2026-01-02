const fs = require("fs");

const WORD_LENGTH = 5;
const input = "words.txt";
const output = "words.ts";

const words = fs
  .readFileSync(input, "utf-8")
  .split(/\r?\n/)
  .map((w) => w.trim())
  .filter(Boolean)
  .map((w) => w.replace("Ё", "Е"))
  .filter((w) => w.length === WORD_LENGTH);

const ts = `
export const WORDS = new Set<string>([
${words.map((w) => `  "${w}"`).join(",\n")}
]);
`;

fs.writeFileSync(output, ts);

console.log("✔ words.ts создан");
