import { Head } from "$fresh/runtime.ts";

export interface Props {
  Page: string;
}

function MyAccount({ Page }: Props) {
  return (
    <Head>
      <meta
        http-equiv="refresh"
        content={`0; URL='https://www.austral.com.br${Page}'`}
      />
    </Head>
  );
}

export default MyAccount;
