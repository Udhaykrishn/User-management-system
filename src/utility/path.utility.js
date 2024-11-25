import path from "node:path";
import { fileURLToPath } from "node:url";

const srcPath = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export default srcPath;
