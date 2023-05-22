import {Spin, Tree, TreeProps} from "antd";
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
        return mergeObjectsByName(addContinents);
    }, [serverContinents, userAddedContinents])

    useEffect(() => {
        setContinentsTreeData(mapContinentsToTree(addContinents));
    }, [addContinents]);


    useEffect(() => {
        setUserAddedContinents(LocalStorageService.getContinents());
    }, []);


    if (!continentsTreeData?.length) {
        return (
            <Spin/>
        );
    }

    const onDrop: TreeProps['onDrop'] = (info) => {
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (
            data: DataNode[],
            key: React.Key,
            callback: (node: DataNode, i: number, data: DataNode[]) => void,
        ) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children!, key, callback);
                }
            }
        };
        const data = [...continentsTreeData];

        // Find dragObject
        let dragObj: DataNode;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else if (
            ((info.node as any).props.children || []).length > 0 && // Has children
            (info.node as any).props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
                // in previous version, we use item.children.push(dragObj) to insert the
                // item to the tail of the children
            });
        } else {
            let ar: DataNode[] = [];
            let i: number;
            loop(data, dropKey, (_item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i!, 0, dragObj!);
            } else {
                ar.splice(i! + 1, 0, dragObj!);
            }
        }
        setContinentsTreeData(data);
    };

    return (
        <Tree
            treeData={continentsTreeData}
            draggable
            onDragStart={(e) => {
                console.log('drag start',e)
            }}
            onDrop={onDrop}
        />
    );
};

export default memo(ContinentsTree);