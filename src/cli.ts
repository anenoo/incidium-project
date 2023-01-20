import { createReadStream } from "node:fs";
import { convertCSVFile } from "./convertMatrix.js";

if (process.argv.length !== 3) {
  console.error("input CSV file path argument is required.");
  process.exit(1);
}

const inputFilePath = process.argv[2]!;

convertCSVFile(
  createReadStream(inputFilePath, {
    encoding: "utf8",
    autoClose: true,
    flags: "r",
  })
).on("data", (data) => {
  console.log(data);
});
