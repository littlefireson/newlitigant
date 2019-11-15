import React,{Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-build-classic';
require('./mystyle.css');

export default class EditBlock extends Component{
    constructor(props, context){
        super(props,context);
    };

    componentWillMount(){};

    componentDidMount(){
        var me = this;
        const ckEditorContent = this.refs.ckEditorContent;
        CKEditor.create(ckEditorContent,{
            removePlugins: [ 'Heading', 'Link', 'Bold' ]
            ,toolbar: []
        }).then( editor => {
            editor.setData("");
            editor.data.model.document.on( 'change:data', function( event,batch ) {
                me.saveData(editor.getData());
            });
        } ).catch( error => {
            console.error( error );
        } );
    };

    saveData = (editorData) => {
        let props = this.props;
        props.onChange(props.name,editorData);
    };

    render(){
        const {title} = this.props;
        return(<section className="editBlock">
            <header className="editBlock-title">{title}</header>
            <div ref="ckEditorContent"></div>
        </section>)
    }
}