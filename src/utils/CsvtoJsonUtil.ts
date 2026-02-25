import * as fs from "fs";
import path from "path";

/**
 * Convert CSV string data into JSON array
 */
const CSVToJSON = (data: string, delimiter: string = ",") => {
  const lines = data.trim().split("\n");

  const titles = lines[0].split(delimiter);

  return lines.slice(1).map((line) => {
    const values = line.split(delimiter);

    return titles.reduce((obj: any, title: string, index: number) => {
      obj[title.trim()] = values[index]?.trim();
      return obj;
    }, {});
  });
};

// Get current directory
const currentDir = __dirname;

// Go one level up (to src folder)
const srcDir = path.resolve(currentDir, "..");

// Go to testdata folder
const testdataDir = path.resolve(srcDir, "testdata");

/**
 * Convert CSV file to JSON file
 */
export const convertCsvFileToJsonFile = (
  csvFileName: string,
  jsonFileName: string,
  delimiter: string = ","
) => {
  try {
    const csvFilePath = path.join(testdataDir, csvFileName);
    const jsonFilePath = path.join(testdataDir, jsonFileName);

    // Read CSV file
    const csvData = fs.readFileSync(csvFilePath, "utf-8");

    // Convert CSV string → JSON
    const jsonData = CSVToJSON(csvData, delimiter);

    // Write JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    console.log("CSV converted successfully!");
  } catch (error) {
    console.error("Error converting CSV to JSON:", error);
  }
};