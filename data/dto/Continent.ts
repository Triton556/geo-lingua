import {DefaultType} from "@/data/dto/DefaultType";
import {Country} from "@/data/dto/Country";

export type Continent = Required<DefaultType> & { countries: Country[] }