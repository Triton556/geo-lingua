import React from 'react';
import {Layout, Menu} from 'antd';
import styles from './Header.module.scss';
// @ts-ignore
import {CloudOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';

export const Header: React.FC = () => {
    const router = useRouter();
    const selectedMenu = router.pathname;

    const onMenuSelect = (value: any) => router.push(value.key);

    return (
        <Layout.Header className={styles.root}>
            <div className={styles.headerInner}>
                <div className={styles.headerLeft}>
                    <h2>
                        Languages
                    </h2>

                </div>
                <div className={styles.headerRight}>
                    <Menu
                        className={styles.topMenu}
                        theme={'dark'}
                        mode={'horizontal'}
                        onSelect={onMenuSelect}
                        defaultSelectedKeys={[selectedMenu]}
                        items={[
                            {key: '/geo', label: 'GeoPage'},
                            {key: '/form', label: 'FormPage'},
                        ]}
                    />
                </div>
            </div>
        </Layout.Header>
    );
};
