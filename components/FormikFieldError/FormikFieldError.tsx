import React, {FC} from "react";
import styles from './FormikFiledError.module.scss'
interface Props {
    name: string;
    formik: any
}

export const FormikFieldError: FC<Props> = ({name, formik}) => {

    return formik.touched[name] && formik.errors[name] ? (

        <div className={styles.root}>{formik.errors[name]}</div>
    ) : null
}