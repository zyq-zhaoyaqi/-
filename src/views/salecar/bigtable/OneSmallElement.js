import React, {Component} from 'react';
import {sortable} from 'react-sortable';
import {Icon} from 'antd';

@sortable
export default class OneSmallElement extends Component {
    render () {
        return (
            <div className='onesmallelement' {...this.props}>
                {this.props.chinese}
                <b>
                    <Icon
                        type='close'
                        onClick={()=>{
                            this.props.other.deloneitem(this.props.english);
                        }}
                    ></Icon>
                </b>
            </div>
        );
    }
}
