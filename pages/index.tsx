import Head from 'next/head';
import client from "@/api/apollo-client";
import {ContinentsData} from "@/data/dto/ContinentsData";
import {GET_CONTINENTS_WITH_DATA} from "@/api/query/continent";
import {notification} from "antd";

 function Home() {
  return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>Hello World</h1>
        </main>
      </>
  );
}

export async function getServerSideProps() {

    return {
        redirect: {
            destination: '/geo',
            permanent: false,
        },
    }

}

export default Home