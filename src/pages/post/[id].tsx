import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";

const SinglePostPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          Single Post View
        </div>
      </main>
    </>
  );
};


export default SinglePostPage;
