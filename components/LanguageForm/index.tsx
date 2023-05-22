import React, {FC, memo, useLayoutEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import styles from "./LanguageForm.module.scss";
import {AutoComplete, Button, Card, Select} from "antd";
import {LanguagePageProps} from "@/pages/form";
import {FormikFieldError} from "@/components/FormikFieldError/FormikFieldError";
import {LocalStorageService} from "@/local-storage-service/LocalStorageService";
import {mapFormToContinent} from "@/utils/mapFormToContinent";


const validationSchema = Yup.object({
    country: Yup.string()
        .required("Необходимо ввести название"),
    continent: Yup.string()
        .required("Необходимое поле"),
    languages: Yup.array().of(Yup.string()).min(1)
        .required("Необходимо выбрать хотя бы 1 язык"),
});

enum InputFields {
    country = "country",
    continent = "continent",
    languages = "languages"
}

interface InputFieldsTypes {
    country: string,
    continent: string,
    languages: string[],
}

const LanguageForm: FC<LanguagePageProps> = ({continents, languages}) => {
    const [addedCountries, setAddedCountries] = useState<string[]>([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const formik = useFormik({

        initialValues: {
            country: "",
            continent: "",
            languages: [],
        },
        validationSchema: validationSchema,

        onSubmit: (values: InputFieldsTypes) => {
            alert(JSON.stringify(values, null, 2));
            LocalStorageService.saveCountry(values.country, mapFormToContinent(values));
            setAddedCountries(LocalStorageService.getItems());
        },
    });

    const autocompleteHandleChange = (value: string) => {
        formik.setFieldValue(InputFields.country, value);
        formik.setFieldValue(InputFields.continent, "");
        formik.setFieldValue(InputFields.languages, []);
        setShowDeleteButton(false)


        const continent = LocalStorageService.getContinent(value);
        if (continent) {
            const country = continent?.countries?.[0]?.name
            const languages = continent?.countries?.[0]?.languages?.map(value => value.name)

            formik.setFieldValue(InputFields.continent, continent?.name);
            formik.setFieldValue(InputFields.country, country);
            formik.setFieldValue(InputFields.languages, languages);
            setShowDeleteButton(true)
        }
    }

    const handleDeleteCountry = (name: string) => {
        LocalStorageService.deleteCountry(name)
        setAddedCountries(prevState => prevState.filter(v => v !== name))
    }

    useLayoutEffect(() => {
        const localStorageKeys = LocalStorageService.getItems();
        if (localStorageKeys?.length) {
            setAddedCountries(localStorageKeys);
        }
    }, []);

    return (
        <div className={styles.root}>
            <Card className={styles.ant_card_body} title={"Новая страна"}>

                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.input_group}>
                        <div className={styles.inline_input_group}>
                            <div className={styles.form_filed}>
                                <AutoComplete
                                    id={InputFields.country}
                                    placeholder={"Название"}
                                    onChange={autocompleteHandleChange}
                                    value={formik.values?.country === "" ? null : formik.values.country}
                                    options={addedCountries?.map(country => {
                                        return {
                                            label: country,
                                            value: country,
                                        };
                                    })}
                                    filterOption={(inputValue, option) =>
                                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />

                                <FormikFieldError name={InputFields.country} formik={formik}/>

                            </div>

                            <div className={styles.form_filed} style={{justifyContent: "end"}}>

                                <Select
                                    id={InputFields.continent}
                                    placeholder={"Континент"}
                                    onChange={(value) => formik.setFieldValue(InputFields.continent, value)}
                                    value={formik.values?.continent === "" ? null : formik.values.continent}
                                    options={continents?.map(continent => {
                                        return {
                                            label: continent.name,
                                            value: continent.name
                                        };
                                    })}
                                />
                                <FormikFieldError name={InputFields.continent} formik={formik}/>

                            </div>

                        </div>

                        <div className={styles.form_filed}>

                            <Select
                                mode={"tags"}
                                id={InputFields.languages}
                                placeholder={"Языки"}
                                onChange={(value) => {
                                    formik.setFieldValue(InputFields.languages, value);
                                }}
                                value={formik.values.languages}
                                options={languages?.map(language => {
                                    return {
                                        label: language.name,
                                        value: language.name
                                    };
                                })}
                            />
                            <FormikFieldError name={InputFields.languages} formik={formik}/>

                        </div>

                        <Button className={styles.ant_btn_primary} htmlType={"submit"} type={"primary"}>
                            Сохранить
                        </Button>
                        {showDeleteButton && (
                            <Button onClick={() => handleDeleteCountry(formik.values.country)} danger>
                                Удалить
                            </Button>)}
                    </div>

                </form>
            </Card>

        </div>
    );
};

export default memo(LanguageForm)