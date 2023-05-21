import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactNode} from "react";
import {Layout} from "@/layouts/Layout";
import {Language} from "@/data/dto/Language";
import client from "@/api/apollo-client";
import {ContinentsData} from "@/data/dto/ContinentsData";
import {GET_CONTINENTS_AND_LANGUAGES} from "@/api/query/continent";
import {Continent} from "@/data/dto/Continent";
import {notification} from "antd";
import LanguageForm from "@/components/LanguageForm";

export interface LanguagePageProps {
    languages?: Language[];
    continents?: Continent[]
}

const FormPage: NextPageWithLayout<LanguagePageProps> = ({languages, continents}) => {
    return (
        <LanguageForm languages={languages} continents={continents}/>
    )
}

FormPage.getLayout = (page: ReactNode) => {
    return <Layout title={'FormPage'}>{page}</Layout>
}

export async function getServerSideProps() {
    try {
        const {data} = await client.query<ContinentsData & { languages?: Language[] }>({
            query: GET_CONTINENTS_AND_LANGUAGES
        })
        return {
            props: {
                continents: data.continents,
                languages: data.languages
            }
        }

    } catch (e) {
        notification.error({message: 'Ошибка при запросе данных ' + e, duration: 3})
        return {props: []}
    }

}

export default FormPage