import srcPath from "#utility/path.utility.js";
import fs from "fs/promises";
import path from "path";
import morgan from "morgan";
import fsSync from "fs";

const Logger = "Log";
const LoggerPath = path.join(srcPath, Logger);
const accessPath = path.join(LoggerPath, "access.log");

const createAccessLogFile = async () => {
  try {
    const isFileCretaed = await fs
      .access(accessPath)
      .then(() => true)
      .catch(() => false);

    if (!isFileCretaed) {
      await fs.writeFile(accessPath, "", "utf-8");
    } else {
      await fs.writeFile(accessPath, "", "utf-8");
    }
  } catch (error) {
    console.error(error.message);
  }
};

const createMorganStreamFile = async () => {
  try {
    await createAccessLogFile();
    const accessLog = fsSync.createWriteStream(accessPath, { flags: "a" });
    return morgan("combined", { stream: accessLog });
  } catch (error) {
    console.error(error.message);
  }
};

export default createMorganStreamFile;
