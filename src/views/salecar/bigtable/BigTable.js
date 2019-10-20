import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';

import './bigtable.less';
import columnsMap from './columnsMap.js';
import ModalInner from './ModalInner.js';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class BigTable extends Component {
    constructor () {
        super();
        this.state = {
            move: false
        };
    }
    componentDidMount () {
        this.props.dispatch({'type':'bigtable/GETCOLUMNSFROMLOCALSTORAGE'});
        this.props.dispatch({'type':'bigtable/INIT'});
    }
    render () {
        return (
            <div>
                <Modal
                    title='请调整表格列的显示'
                    visible={this.state.move}
                    footer={null}
                >
                    <ModalInner
                        ref='modalinner'
                        cancelHandler={()=>{
                            this.setState({
                                move: false
                            });
                        }}
                        okHandler={(columns)=>{
                            // 点击确定按钮之后做的事情
                            this.props.dispatch({'type': 'bigtable/SETCOLUMNSTOLOCALSTORAGE', columns});
                            this.setState({
                                move: false
                            });
                        }}
                    />
                </Modal>
                <div className='button_box'>
                    <Button
                        className='btn'
                        type='primary'
                        shape='circle'
                        icon='setting'
                        onClick={()=>{
                            this.setState({
                                move:true
                            });
                        }}
                    ></Button>
                </div>
                <Table
                    rowKey='id'
                    columns={
                        this.props.columnsArr.map(str => ({
                            'key': str,
                            'dataIndex': str,
                            ...columnsMap[str]
                        }))
                    }
                    dataSource={this.props.results}
                ></Table>
            </div>
        );
    }
}
