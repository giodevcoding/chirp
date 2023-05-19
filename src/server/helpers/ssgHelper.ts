import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../api/root";
import superjson from "superjson";
import { prisma } from "../db";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });
