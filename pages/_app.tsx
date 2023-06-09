import '@/styles/globals.css';
import '@/styles/antd.min.css'
import type {AppProps} from 'next/app';
import React, {ReactElement, ReactNode} from 'react';
import {NextPage} from 'next';

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
    P,
    IP
> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

    return getLayout(<Component {...pageProps} />);
}
