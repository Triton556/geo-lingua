import {DataNode} from "antd/es/tree";
import {Continent} from "@/data/dto/Continent";

export function mapContinentsToTree(continents: Continent[] | undefined): DataNode[] | undefined {
    return continents?.map((continent) => {
        return {
            title: continent.name,
            key: continent.name,
            children: continent?.countries?.map((country): DataNode => {
                const countryKey = `${continent.name}-${country.name}`
                return {
                    title: country.name,
                    key: countryKey,
                    children: country?.languages?.map((language): DataNode => {
                        return {
                            title: language.name,
                            key: `${countryKey}-${language.name}`,
                        }
                    })
                }
            }),
        }
    })
}