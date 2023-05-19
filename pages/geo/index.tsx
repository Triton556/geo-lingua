import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactNode} from "react";
import {Layout} from "@/layouts/Layout";
import {Spin, Tree} from "antd";
import client from "@/api/apollo-client";
import {GET_CONTINENTS} from "@/api/query/continent";
import {Continent} from "@/data/dto/Continent";
import {ContinentsData} from "@/data/dto/ContinentsData";
import {mapContinentsToTree} from "@/utils/mapContinentsToTree";

interface Props {
    continents?: Continent[]
}

const GeoPage: NextPageWithLayout<Props> = ({continents}) => {
    const continentsTreeData = mapContinentsToTree(continents);

    if (!continentsTreeData?.length) {
        return (
            <Spin/>
        )
    }
    return (
        <Tree
            treeData={continentsTreeData}
        />
    )
}

GeoPage.getLayout = (page: ReactNode) => {
    return <Layout title={'GeoPage'}>{page}</Layout>
}

export async function getServerSideProps() {
    const {data} = await client.query<ContinentsData>({
        query: GET_CONTINENTS
    })
    return {
        props: {
            continents: data.continents
        }
    }
}

export default GeoPage;
