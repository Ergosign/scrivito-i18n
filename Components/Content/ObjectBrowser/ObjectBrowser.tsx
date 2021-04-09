import * as Scrivito from 'scrivito';
import React, {useState} from 'react';
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
            {'\t'}
            {
                node.path() && <PathTooltip>{node.path()}</PathTooltip>
            }
            {
                !node.path() && node.permalink() &&
                <PathToolTipError>(No Path. Permalink: {node.permalink()} )</PathToolTipError>
            }
            {
                !node.path() && !node.permalink() && <PathToolTipError>(No path or permalink)</PathToolTipError>
            }
        </Tooltip>
    );
};

const generateNodes = async (objs: Scrivito.Obj[]) => {
    const nodes: Node[] = [];

    for (let i = 0; i < objs.length; i++) {
        const node = objs[i];
        const children = await Scrivito.load(() => node.children());

        let childNodes;
        if (children) {
            childNodes = await generateNodes(children);
        }

        if (node.objClass() === 'Image' || node.permalink() === I18nConfigId) {
            continue;
        }

        nodes.push({
            value: `${node.id()}`,
            label: generateTooltip(node),
            ...((childNodes && childNodes.length > 0) ? {children: childNodes} : {}),
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
    onIdChecked: (values: string[]) => void;
}

function OverviewTab(props: OverviewTabProps) {
    const {onIdChecked} = props;

    const [nodes, setnodes] = useState([]);

    useAsync(getNodes, setnodes);

    const [checked, setChecked] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleCheck = (checked: string[]) => {
        setChecked(checked);
        onIdChecked(checked);
    };

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

export default OverviewTab;
