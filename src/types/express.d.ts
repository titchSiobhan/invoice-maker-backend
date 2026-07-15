import { Prisma } from "@prisma/client";

type User = Prisma.UserGetPayload<{}>;


declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}



export {};