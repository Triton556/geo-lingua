import {DataNode} from "antd/es/tree";
import {Continent} from "@/data/dto/Continent";

export function mapContinentsToTree(continents: Continent[] | undefined): DataNode[] | undefined {
    return continents?.map((continent) => {
        return {
            title: continent.name,
            key: continent.code,
            children: continent.countries.map((country): DataNode => {
                const countryKey = `${continent.code}-${country.code}`
                return {
                    title: country.name,
                    key: countryKey,
                    children: country.languages.map((language): DataNode => {
                        return {
                            title: language.name,
                            key: `${countryKey}-${language.code}`,
                        }
                    })
                }
            }),
        }
    })
}