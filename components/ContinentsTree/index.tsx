import {Spin, Tree} from "antd";
import React, {FC, memo, useEffect, useMemo, useState} from "react";
import {Continent} from "@/data/dto/Continent";
import {mapContinentsToTree} from "@/utils/mapContinentsToTree";
import {LocalStorageService} from "@/local-storage-service/LocalStorageService";
import {DataNode} from "antd/es/tree";
import {mergeObjectsByName} from "@/utils/mergeObjectsByName";

interface Props {
    continents: Continent[] | undefined;
}

const ContinentsTree: FC<Props> = ({continents}) => {
    const serverContinents = continents;
    const [userAddedContinents, setUserAddedContinents] = useState<Continent[]>([]);
    const [continentsTreeData, setContinentsTreeData] = useState<DataNode[] | undefined>([]);

    const addContinents = useMemo(() => {
        let addContinents: Continent[] = []
        if (serverContinents?.length) {
            addContinents = [...serverContinents];
            if (userAddedContinents?.length) {
                addContinents = [...serverContinents, ...userAddedContinents];
            }
        }
        console.log('addContinents', addContinents)
        return mergeObjectsByName(addContinents);
    }, [serverContinents, userAddedContinents])

    useEffect(() => {
        setContinentsTreeData(mapContinentsToTree(addContinents));
    }, [addContinents]);


    useEffect(() => {
        setUserAddedContinents(LocalStorageService.getContinents());
        console.log("userContinents", LocalStorageService.getContinents());
    }, []);


    if (!continentsTreeData?.length) {
        return (
            <Spin/>
        );
    }

    return (
        <Tree
            treeData={continentsTreeData}
        />
    );
};

export default memo(ContinentsTree);