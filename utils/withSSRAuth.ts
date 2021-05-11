import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSSRAuth<P>(func: GetServerSideProps<P>): GetServerSideProps {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    if (!cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await func(context);
  };
}
