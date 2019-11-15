import React,{Component} from 'react';
import { Form,Input, Button ,DatePicker,} from 'antd';
import ajax from "../../utils/ajax";
import moment from 'moment';
import cache from '../../utils/cache';
const FormItem = Form.Item;
const {TextArea} = Input;
@Form.create()
export default class QuestionContent extends Component{
    static defaultProps ={
        answer:true,
        caseId:'',
        upDate:()=>{},
        QA:{
            quizAnswers:[],
            question:'',
            questionTime:'',
            arbiName:'',
            id:''
        }
    }
    constructor(props){
        super(props);
        this.state={
            loading:false,
            counting:false,
            count:0,
            countdown:' 0天 0时 0分 0秒 ',
            leftTime:0,
            QA:this.props.QA
        }
    }
    componentWillReceiveProps(nextProps) {

        const newdata = nextProps.QA;
        this.setState({
            QA: newdata,
          })
      }
    handleSubmit = (e) => {
        e.preventDefault();
        const {caseId,upDate} = this.props;
        const {QA:{id}} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const answer = values.answer.replace(/\n/gm,'<br/>');
                this.setState({
                    loading:true
                });
                console.log(id,caseId,answer)
                ajax.put(`/litigant/question/answer`,{
                    id,
                    caseId,
                    quizAnswer:answer
                }).then(()=>{
                    this.props.form.resetFields();
                    if(typeof upDate ==='function'){
                        upDate();
                    }
                }).finally(()=>{
                    this.setState({
                        loading:false
                    });
                })
            }
        });
    }
    getAnswer=(quizAnswers)=>{
        return quizAnswers.map((item,index)=>(<li key={index} className="question-answer-content-item" >
            <p dangerouslySetInnerHTML={{__html:item.quizAnswer}}></p>
            <time>{item.answerTime}</time>
        </li>))
    }
    componentDidMount(){
        const {QA}= this.state;
        const {questionTime,limitNum} =QA;
        if(limitNum != 0){
            let countDownTime = moment(questionTime).add(limitNum, 'hours')
            let nowTime = moment();
            const leftTime = countDownTime.diff(nowTime,'seconds')
            this.setState( { counting: true, count:leftTime});
            this.setInterval();
        }
    }
    countDown = ()=>{
        const {count} = this.state;
        const days = parseInt(count / 60 / 60 / 24),
        hours = parseInt(count  / 60 / 60 % 24),
        minutes = parseInt(count / 60 % 60),
        seconds = parseInt(count % 60);
        if (count <= 1){
            this.clearInterval();
            this.setState({counting:true,countdown:' 0天 0时 0分 0秒 '});
        }else{
            this.setState({counting:false,count:count-1,countdown:`${days}天 ${hours}时 ${minutes}分 ${seconds}秒`})
        }
    
    }
    setInterval=()=>{
        this.timer = setInterval(this.countDown, 1000)
    }

    clearInterval = ()=>{
        clearInterval(this.timer)
    }
    getAnswerContent=()=>{
        const {loading,counting} = this.state;
        const {answer,form}= this.props;
        const {QA} = this.state;
        const {quizAnswers} =QA;
        const {getFieldDecorator} = form;
        const {currentProgress} = JSON.parse(cache.getItem('commInfo')).progress;
        if(answer||(quizAnswers && quizAnswers.length>0)){
            return (<article className="question-answer">
                <header>
                    回答
                </header>
                <article>
                    {quizAnswers && quizAnswers.length>0 && <ul className="question-answer-content">
                        {this.getAnswer(quizAnswers)}
                    </ul>}
                    { answer && currentProgress!='5'&& <div className="question-answer-input">
                        <FormItem>
                            {getFieldDecorator('answer', {
                                rules: [{ required: true, message: '请输入回答' }],
                            })(
                                <TextArea  disabled={counting} placeholder={counting?"回答时间已到":"请输入回答"}   autosize={{ minRows: 4,maxRows:20}} />
                            )}
                        </FormItem>
                        <Button disabled={counting} loading={loading} type="primary" htmlType="submit" ghost>{loading?'正在提交':'提交'}</Button>
                    </div>}
                </article>
            </article>)
        }
    }
    render(){
        const {QA}= this.state;
        const {arbiName,question,questionTime,limitNum} =QA;
        let {counting,countdown} = this.state;
        return(<Form onSubmit={this.handleSubmit}>
            <section className="question-content">
                <header>
                    <h2>
                        <strong>问</strong>
                        <span>仲裁庭</span>
                        <em>（仲裁员{arbiName}）</em>
                    </h2>
                    <article>
                        {question}
                        {limitNum!=0?<span className="fr">回答倒计时：{countdown}</span>:""}
                        
                        <time>{questionTime}</time>
                    </article>
                </header>
                {this.getAnswerContent()}
            </section>
        </Form>)
    }
}