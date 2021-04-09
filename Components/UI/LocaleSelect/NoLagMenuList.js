import React, {Component} from 'react';
import {FixedSizeList as List} from 'react-window';

// thanks to https://blog.johnnyreilly.com/2019/04/react-select-with-less-typing-lag.html

const height = 35;

export default class MenuList extends Component {
    render() {
        const {options, children, maxHeight, getValue} = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({index, style}) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }
}
