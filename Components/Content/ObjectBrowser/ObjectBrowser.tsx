import * as Scrivito from 'scrivito';
import React, {useState, useEffect, useCallback} from 'react';
import type {Node} from 'react-checkbox-tree';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {I18nConfigId} from '../../../Objects/I18NConfig/i18nConfigId';

import {
    faCheckSquare,
    faChevronDown,
    faChevronRight,
    faLeaf,
    faMinusSquare,
    faPlusSquare,
    faSitemap,
    faSpinner,
    faSquare
} from '@fortawesome/free-solid-svg-icons';
import useAsync from '../../../util/useAsync';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    animation: spin 4s linear infinite;
  }

  margin-top: 10px;


`;

/**
 * Dirty hack to align the checkboxes without a chevron
 */
const CheckboxTreeWrapper = styled.div`
  .react-checkbox-tree ol .rct-disabled .rct-text .rct-collapse{
    padding: 0;
    padding-left: 4px;
  }
`;

const Tooltip = styled.span``;

const PathTooltip = styled.span`
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-weight: bold;
  font-size: 12px;
`;

const PathToolTipError = styled(PathTooltip)`
  color: red;
`;

/**
 * Change the icons of RCT with their respective widgets because of tree shaking
 */
const icons = {
    check: <FontAwesomeIcon className='rct-icon rct-icon-check' icon={faCheckSquare}/>,
    uncheck: <FontAwesomeIcon className='rct-icon rct-icon-uncheck' icon={faSquare}/>,
    halfCheck: <FontAwesomeIcon className='rct-icon rct-icon-half-check' icon={faCheckSquare}/>,
    expandClose: <FontAwesomeIcon className='rct-icon rct-icon-expand-close' icon={faChevronRight}/>,
    expandOpen: <FontAwesomeIcon className='rct-icon rct-icon-expand-close' icon={faChevronDown}/>,
    expandAll: <FontAwesomeIcon className='rct-icon rct-icon-expand-close' icon={faPlusSquare}/>,
    collapseAll: <FontAwesomeIcon className='rct-icon rct-icon-expand-close' icon={faMinusSquare}/>,
    parentClose: <FontAwesomeIcon className='rct-icon rct-icon-expand-close' icon={faSitemap}/>,
    parentOpen: <FontAwesomeIcon className='rct-icon rct-icon-expand-close' icon={faSitemap}/>,
    leaf: <FontAwesomeIcon className='rct-icon rct-icon-expand-close' icon={faLeaf}/>
};

/**
 * Filter for all objects those, which do not have a parent, e
 * @param {objects} objs
 */



const getRootNodes = (objs: Scrivito.Obj[]) => Scrivito.load(() => objs.filter(obj => !obj.parent()));

const generateTooltip = (node: Scrivito.Obj) => {
    return (
        <Tooltip>
            {node.objClass()}
            {'\t@'}
            {
                node.siteId() && <PathTooltip>{node.siteId()}</PathTooltip>
            }
            {'\t'}
            {
                node.path() && <PathTooltip>Path: {node.path()}</PathTooltip>
            }
        </Tooltip>
    );
};

const generateNodes = async (objs: Scrivito.Obj[], depth = 0) => {
    const nodes: Node[] = [];

    for (let i = 0; i < objs.length; i++) {
        const scrivitoObj = objs[i];
        const children = await Scrivito.load(() => scrivitoObj.children());

        let childNodes;
        if (children) {
            childNodes = await generateNodes(children, depth + 1);
        }

        if (scrivitoObj.objClass() === 'Image' || scrivitoObj.permalink() === I18nConfigId) {
            continue;
        }

        nodes.push({
            value: `${scrivitoObj.id()}`,
            label: generateTooltip(scrivitoObj),
            ...((childNodes && childNodes.length > 0) ? {children: childNodes} : {}),
            showCheckbox: depth == 0
        });
    }
    return nodes;
};

const getNodes = async () => {
    const objs = await Scrivito.load(() => Scrivito.Obj.onAllSites().all().toArray());
    const rootNodes = await getRootNodes(objs);
    return generateNodes(rootNodes);
};

interface OverviewTabProps {
    onIdChecked: (id: string | undefined) => void;
}

function OverviewTab(props: OverviewTabProps) {
    const {onIdChecked} = props;
    const [nodes, setNodes] = useState<Node[]>([]);
    const [checked, setChecked] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);

    useEffect(() => {
        getNodes().then(nodes => setNodes(nodes));
    }, [getNodes]);

    const getSelectedRootNode = (currentlyChecked: string[]): string | undefined => {
        const filtered = nodes.filter(node => {
            return currentlyChecked.includes(node.value)
        });
        return filtered.shift()?.value;
    }

    const handleCheck = (newChecked: string[]) => {
        setChecked(newChecked);
        onIdChecked(getSelectedRootNode(newChecked));
        disableOtherRootNodes(newChecked);
    };

    const disableOtherRootNodes = (checked: string[]) => {
        const newNodes: Node[] = [];
        for (const node of nodes) {
            if(checked.includes(node.value) || checked.length === 0) {
                newNodes.push({...node, disabled: false})
            } else {
                newNodes.push({...node, disabled: true})
               
            }
        }

        setNodes(newNodes);
    }

    

    return (
        <CheckboxTreeWrapper>
            {nodes.length > 0
                ? <CheckboxTree
                    nodes={nodes}
                    checked={checked}
                    expanded={expanded}
                    onCheck={(checked: string[]) => handleCheck(checked)}
                    onExpand={(expanded: string[]) => setExpanded(expanded)}
                    icons={icons}
                    nativeCheckboxes
                    showExpandAll
                    nameAsArray
                    checkModel='all'
                />
                : <SpinnerWrapper><FontAwesomeIcon className='fa-2x' icon={faSpinner}/></SpinnerWrapper>}
        </CheckboxTreeWrapper>
    );
}

export default Scrivito.connect(OverviewTab);
