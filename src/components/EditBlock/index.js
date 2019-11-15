import React,{Component} from 'react';
import E from 'wangeditor';

export default class EditBlock extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorContent: ''
        }
    }
    editorInit=()=>{
        const {onChange,name}=this.props;
        const elem = this.refs.editorElem;
        const editor = new E({},elem);

        const {initHtml} = this.props;

        // if(initHtml){
        //     this.editor.txt.html(initHtml)
        // }
        // this.editor =editor;
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            if(html.indexOf('<p><br></p>')!=-1){
                html = html.replace(/<p><br><\/p>/g,'');
            }
            if(html.indexOf('<br>')!=-1){
                html = html.replace(/<br>/g,'<br/>');
            }
            this.setState({
                editorContent: html
            })
            if(typeof onChange ==="function"){
                onChange(name,html);
            }
        }
        // 打开粘贴样式的过滤
        editor.customConfig.pasteFilterStyle = false;
        // 自定义处理粘贴的文本内容
        editor.customConfig.pasteTextHandle = function (content) {
            return content;
        }
        // editor.customConfig.menus = [];
        editor.customConfig.zIndex = 10;
        editor.create();

        if(initHtml){
            editor.txt.html(initHtml);
        }
        try{
            editor.$textElem[0].blur();
        }catch (e){
            console.log(e)
        }
    }
    componentDidMount(){
        this.editorInit();
    }
    render(){
        const {title} = this.props;
        return(<section className="editBlock">
            <header className="editBlock-title">{title}</header>
            <div ref="editorElem" className="editBlock-edit"></div>
        </section>)
    }
}