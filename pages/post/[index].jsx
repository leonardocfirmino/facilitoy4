import LayoutBlog from "../../components/LayoutBlog";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import axios from "axios";

export default function Post({ subdomain }) {
  const router = useRouter();
  if (!subdomain) router.push("/login");
  const fetcher = async (query) =>
    axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        (subdomain ? subdomain + "." : null) +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/getPost",
      query
    );

  const { data, mutate } = useSWR({ slug: router.query.index }, fetcher);
  return (
    <LayoutBlog subdomain={subdomain}>
      {data && (
        <Head>
          <title>{data.data.post[0].title}</title>
          <meta
            name="description"
            content={`${data.data.post[0].description}`}
          />
          <meta property="og:title" content={data.data.post[0].title} />
          <meta
            property="og:description"
            content={`${data.data.post[0].description}`}
          />

          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <div className="flex justify-between container mx-auto">
        <div className="w-full min-h-[900px] lg:w-8/12">
          {data && (
            <main className="mt-10">
              <div className="mb-4 md:mb-0 w-full mx-auto relative">
                <div className="px-4 lg:px-0">
                  <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                    {data.data.post[0].title}
                  </h2>
                  <a
                    href="#"
                    className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                  >
                    Categoria
                  </a>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                  <div
                    dangerouslySetInnerHTML={{ __html: data.data.post[0].body }}
                  />
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </LayoutBlog>
  );
}
export async function getServerSideProps(ctx) {
  const subdomain =
    ctx.req.headers["x-forwarded-host"] || ctx.req.headers["host"];
  if (process.env.NEXT_PUBLIC_PREFIX == "http://")
    if (subdomain.split(".")[1] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  if (process.env.NEXT_PUBLIC_PREFIX != "http://")
    if (subdomain.split(".")[2] == undefined)
      return {
        redirect: {
          destination: `/selecionar-estado`,
          permanent: false,
        },
      };
  return { props: { subdomain: subdomain.split(".")[0] } };
}
