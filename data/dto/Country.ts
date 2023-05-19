import {DefaultType} from "@/data/dto/DefaultType";
import {Language} from "@/data/dto/Language";

export type Country = Required<DefaultType> & { languages: Language[] }