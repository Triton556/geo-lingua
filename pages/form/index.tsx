import {NextPageWithLayout} from "@/pages/_app";
import {ReactNode} from "react";
import {Layout} from "@/layouts/Layout";

interface Props {

}

const FormPage: NextPageWithLayout<Props> = () => {
    return(
            <div>
                FormPage
            </div>
    )
}

FormPage.getLayout = (page: ReactNode) => {
    return <Layout title={'FormPage'}>{page}</Layout>
}

export default FormPage