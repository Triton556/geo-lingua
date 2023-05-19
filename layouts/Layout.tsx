import Head from 'next/head';
import {Header} from '@/components/Header';
import styles from '@/styles/Home.module.scss';
import {Card} from "antd";

interface LayoutProps {
    title: string;
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> =
    ({title, children}) => {
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <main>
                    <Header/>
                    <div className={styles.main}>
                        <Card>
                            <div className={styles.layout}>{children}</div>
                        </Card>
                    </div>
                </main>
            </>
        );
    };
