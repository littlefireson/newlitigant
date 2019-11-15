import React,{Component} from 'react'
import { Modal, Button } from 'antd'

export default class Sample extends Component{
    render(){
        const {hideSample,visible} = this.props;
        return(
            <Modal
                title="示例"
                width="auto"
                className="sample"
                visible={visible}
                onCancel={hideSample}
                footer={[<Button key="1" type="primary" onClick={hideSample}>确定</Button>]}
            >
                <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </Modal>
        )
    }
}