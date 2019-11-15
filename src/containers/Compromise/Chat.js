import React,{Component} from 'react';
import E from 'wangeditor';

export default class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editorContent: ''
        }
    }
    setSrollDown=()=>{
        const chatContent = this.refs.chatContent;
        chatContent.scrollTop=chatContent.scrollHeight;
    }
    getChatContent=()=>{

    }
    editorInit=()=>{
        const toolbar = this.refs.toolbar;
        const elem = this.refs.editorElem;
        const editor = new E(toolbar,elem);
        // this.editor =editor;
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }
        // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        editor.customConfig.pasteFilterStyle = true;
        // 自定义处理粘贴的文本内容
        editor.customConfig.pasteTextHandle = function (content) {
            // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
            return content + '<p>在粘贴内容后面追加一行</p>'
        }
        editor.customConfig.menus = [
            'image',
        ]

        editor.create()
    }
    componentDidMount(){
        this.editorInit();
        this.setSrollDown();
    }
    handleClick(){
        alert(11)
    }
    render(){
        return(<article className="chat">
                <h2 className="chat-title">沟通记录</h2>
                <div className="chat-box">
                    <ul className="chat-content" ref='chatContent'>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="myChat">
                            <header>
                                申请人 2017-10-09 09:22:03
                            </header>
                            <article>
                                我的个人啊阿里觉得浪费空间阿里斯顿肌肤路卡上的减肥了开始觉得累家里就流口水的减肥离开家路卡上的减肥了看啊时间地方了空间路卡时间地方了开机啊塑料袋封口机拉开时间地方了空间啊塑料袋克己复礼
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        <li className="chatItem">
                            <header>
                                秘书 2017-10-09 09:22:03
                            </header>
                            <article>
                                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            </article>
                        </li>
                        {/*{this.getChatContent()}*/}
                    </ul>
                    <footer className="chat-ctrl">
                        <aside ref="toolbar"></aside>
                        <div className="chat-ctrl-container">
                            <div className="chat-input" ref="editorElem">
                            </div>
                            <button onClick={this.handleClick}>
                                发送
                            </button>
                        </div>

                    </footer>
                </div>
            </article>
        )
    }
}