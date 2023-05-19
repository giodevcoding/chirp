import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { PostView } from "~/components/postview";

type SinglePostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePostPage: NextPage<SinglePostPageProps> = ({ id }) => {
  const { data: postData } = api.posts.getById.useQuery({
    id,
  });

  if (!postData) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${postData.post.content} - ${postData.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...postData} />
      </PageLayout>
    </>
  );
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const helpers = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await helpers.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SinglePostPage;
