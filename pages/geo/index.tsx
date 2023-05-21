import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactNode} from "react";
import {Layout} from "@/layouts/Layout";
import {notification} from "antd";
import client from "@/api/apollo-client";
import {GET_CONTINENTS_WITH_DATA} from "@/api/query/continent";
import {Continent} from "@/data/dto/Continent";
import {ContinentsData} from "@/data/dto/ContinentsData";
import ContinentsTree from "@/components/ContinentsTree";

interface Props {
    continents?: Continent[]
}

const GeoPage: NextPageWithLayout<Props> = ({continents}) => {

    return (
        <ContinentsTree continents={continents}/>
    )
}

GeoPage.getLayout = (page: ReactNode) => {
    return <Layout title={'GeoPage'}>{page}</Layout>
}

export async function getServerSideProps() {

    return await client.query<ContinentsData>({
        query: GET_CONTINENTS_WITH_DATA
    }).then(({data}) => {
        return {
            props: {
                continents: data.continents
            }
        }
    }).catch((e) => {
        notification.error({message: 'Ошибка при запросе данных ' + e, duration: 3})
        return {
            props: []
        }
    })


}

export default GeoPage;
