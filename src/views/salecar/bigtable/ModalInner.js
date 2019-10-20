import React, {Component} from 'react';
import OneSmallElement from './OneSmallElement.js';
import {connect} from 'dva';
import _ from 'lodash';
import {Icon, Button} from 'antd';

import columnsMap from './columnsMap.js';


@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class ModalInner extends Component {
    constructor (props) {
        super();
        //筹备备选arr的基本值
        let beixuanArr = _.difference(Object.keys(columnsMap), props.columnsArr);
        this.state = {
            columnsArr: props.columnsArr,
            beixuanArr
        };
    }
    deloneitem (english) {
        this.setState({
            columnsArr:this.state.columnsArr.filter(item => item !== english),
            beixuanArr:[...this.state.beixuanArr, english]
        });
    }
    render () {
        return (
            <div>
                <p>当前为你展示的列(你可以拖拽排序)</p>
                <div className='elementbox'>
                    {
                        this.state.columnsArr.map((item, i) => {
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={(columnsArr)=>{
                                        this.setState({
                                            columnsArr
                                        });
                                    }}
                                    items={this.state.columnsArr}
                                    sortId={i}
                                    english={item}
                                    chinese={columnsMap[item].title}
                                    other={{
                                        deloneitem: this.deloneitem.bind(this)
                                    }}
                                >
                                    {item}
                                </OneSmallElement>
                            );
                        })
                    }
                    <div className='flx'></div>
                </div>
                <p>备选排列:</p>
                <div className='beixuanbox'>
                    {
                        this.state.beixuanArr.map((item, i) => <span
                            key={i}
                        >
                            {columnsMap[item].title}
                            <b onClick={()=>{
                                this.setState({
                                    beixuanArr:this.state.beixuanArr.filter(_item => _item !== item),
                                    columnsArr:[...this.state.columnsArr, item]
                                });
                            }}>
                                <Icon type='plus'></Icon>
                            </b>
                        </span>)
                    }
                </div>
                <div>
                    <Button className='left'
                        onClick={()=>{
                            this.props.cancelHandler();
                        }}>取消</Button>
                    <Button onClick={()=>{
                        this.props.okHandler(this.state.columnsArr);
                    }}>确定</Button>
                </div>
            </div>
        );
    }
}
