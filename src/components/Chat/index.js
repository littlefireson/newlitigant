import React,{Component} from 'react';
import {connect} from 'react-redux';
import {message} from 'antd';
import classNames from 'classnames';
import E from 'wangeditor';

@connect((state)=>({
    litigantType: state.litigantType
}))
export default class Chat extends Component{
    constructor(props) {
        super(props);
        let chatType = '秘书';
        let title = '沟通记录';
        const {debateFlag} = this.props;
        if(debateFlag){
            chatType = '仲裁员';
            title ='辩论记录';
        }
        this.state = {
            editorContent: '',
            title,
            chatType,
        }
    }
    static defaultProps={
        debateFlag:false,
        disabled:false,
        chatList:[],
        sendMsg:()=>{}
    }
    setSrollDown=()=>{
        const chatContent = this.refs.chatContent;
        chatContent.scrollTop=chatContent.scrollHeight;
    }
    getChatContent=()=>{
        const {chatList=[],litigantType} =this.props;
        const {chatType} =this.state;
        const type={
            0:'申请方',
            1:'被申请方',
            2:chatType
        };
        if (chatList.length>0){
            return chatList.map(({createTime,content,sendType},index)=>{
                const cls = classNames({
                    'chatItem': sendType!=litigantType,
                    'myChat' :  sendType==litigantType
                })
                return(<li className={cls} key={createTime}>
                    <header>
                        {type[sendType]} {createTime}
                    </header>
                    <article dangerouslySetInnerHTML={{__html:content}}></article>
                </li>)
            })
        }
    }
    editorInit=()=>{
        const toolbar = this.refs.toolbar;
        const elem = this.refs.editorElem;
        const editor = new E(toolbar,elem);
        this.editor =editor;
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }
        editor.customConfig.zIndex = 1;
        // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
        editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
        // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        editor.customConfig.pasteFilterStyle = true;
        // 自定义处理粘贴的文本内容
        editor.customConfig.pasteTextHandle = function (content) {
            // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
            return content;
        }
        editor.customConfig.menus = [
            'image',
        ]
        editor.create();
        try{
            editor.$textElem[0].blur();
        }catch (e){
            console.log(e)
        }
    }
    componentDidMount(){
        const {disabled} =this.props;
        if(!disabled){
            this.editorInit();
        }
        this.setSrollDown();
    }
    componentDidUpdate(){
        setTimeout(this.setSrollDown);

    }
    handleClick=()=>{
        const {sendMsg} =this.props;
        const {editorContent} = this.state;
        if(editorContent.length>0){
            if(sendMsg){
                sendMsg(editorContent).then(()=>{
                    this.editor.txt.html('');
                    this.setState({
                        editorContent:''
                    })
                });
            }
        }else{
            message.error('请输入要发送的内容');
        }
    }
    render(){
        const {title} =this.state;
        const {disabled} =this.props;
        return(<article className="chat">
                <h2 className="chat-title">{title}</h2>
                <div className="chat-box">
                    <ul className="chat-content" ref='chatContent'>
                        {this.getChatContent()}
                    </ul>
                    {!disabled && (<footer className="chat-ctrl">
                        <aside ref="toolbar"></aside>
                        <div className="chat-ctrl-container">
                            <div className="chat-input" ref="editorElem">
                            </div>
                            <button onClick={this.handleClick}>
                                发送
                            </button>
                        </div>
                    </footer>)}
                </div>
            </article>
        )
    }
}