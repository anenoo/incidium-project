import { createInterface } from "node:readline";
import { PassThrough } from "node:stream";
import chunk from "lodash.chunk";

type Matrix = readonly (readonly string[])[];

interface ParseMatrixResult {
  readonly unwrap: () => { readonly isValid: boolean; readonly json: string };
  readonly map: (mapper: (matrix: Matrix) => Matrix) => ParseMatrixResult;
}

function IsNotValid(): ParseMatrixResult {
  return {
    unwrap() {
      return { isValid: false, json: "[]" };
    },
    map() {
      return IsNotValid();
    },
  };
}

function isValid(matrix: Matrix): ParseMatrixResult {
  return {
    unwrap() {
      return { isValid: true, json: `[${matrix.flat(1).map(x => JSON.stringify(x)).join(', ')}]` };
    },
    map(mapper) {
      return isValid(mapper(matrix));
    },
  };
}

function passData(raw: string): ParseMatrixResult {
  try {
    const json = JSON.parse(raw);
    if (!Array.isArray(json)) {
      return IsNotValid();
    }

    const matrixEdgeLen = Math.sqrt(json.length);
    if (!Number.isInteger(matrixEdgeLen)) {
      return IsNotValid();
    }

    return isValid(chunk(json, matrixEdgeLen));
  } catch (error) {
    return IsNotValid();
  }
}

function restore(matrix: Matrix): Matrix {
  let top = 0;
  let right = matrix.length - 1;
  let bottom = matrix.length - 1;
  let left = 0;

  const output = Array.from(matrix, (r) => Array.from(r));

  while (left < right && top < bottom) {
    let previous = matrix[top + 1]![left]!;

    for (let i = left; i <= right; i++) {
      const curr = matrix[top]![i]!;
      output[top]![i] = previous;
      previous = curr;
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      const curr = matrix[i]![right]!;
      output[i]![right] = previous;
      previous = curr;
    }
    right--;

    for (let i = right; i >= left; i -= 1) {
      const curr = matrix[bottom]![i]!;
      output[bottom]![i] = previous;
      previous = curr;
    }
    bottom--;

    for (let i = bottom; i >= top; i -= 1) {
      const curr = matrix[i]![left]!;
      output[i]![left] = previous;
      previous = curr;
    }
    left++;
  }

  return output;
}

export function convertCSVFile(
  stream: NodeJS.ReadableStream
): NodeJS.ReadableStream {
  const rl = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  const outStream = new PassThrough({
    decodeStrings: false,
    encoding: "utf8",
    defaultEncoding: "utf8",
  });

  function getLine(line: string) {
    const indexOfComma = line.indexOf(",");
    const id = line.slice(0, indexOfComma);
    const json = line.slice(indexOfComma + 1).replaceAll(/^"|"$/g, "");
    const result = passData(json).map(restore).unwrap();
    outStream.write(
      [id, `"${result.json}"`, result.isValid].join(",")
    );
  }

  rl.once("line", () => {
    outStream.write("id,json,is_valid");
    rl.on("line", getLine);
  });

  rl.on("close", () => outStream.end());

  return outStream;
}
