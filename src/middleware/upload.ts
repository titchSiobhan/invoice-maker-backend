import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req: any, file: Express.Multer.File, cb: (error: Error | null, destination?: string) => void) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req: any, file: Express.Multer.File, cb: (error: Error | null, filename?: string) => void) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  
  limits: { fileSize: 5 * 1024 * 1024 }
});
export default upload;
