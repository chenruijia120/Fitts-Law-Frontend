<template>
    <div class="main" id="Test">
    <div class="cl-header"></div>
    <div class="content">
        <div>{{cue_text}}</div>
        <br>
        <div>{{question}}</div>
        <el-row class="ans-row" >
            <el-col :span="6" class="ans-col">
                A.{{choice[0]}}
            </el-col>
            <el-col :span="6" class="ans-col">
                S.{{choice[1]}}
            </el-col>
            <el-col :span="6" class="ans-col">
                D.{{choice[2]}}
            </el-col>
            <el-col :span="6" class="ans-col">
                F.{{choice[3]}}
            </el-col>
        </el-row>
    </div>
    </div>
</template>

<script>
    export default{
        name:"CognitiveLoadStudy",
        data(){
            return{
                cue_text:"Please press the button for the correct answer!",
                right_ans_num:0,
                total_ans_num:0,
                level:0,
                add1:0,
                add2:0,
                question:"0",
                right_idx:0,
                choice:['','','',''],
                time_question_record:[],
                time_question_start:0,
                time_question_end:0,
                times:0,
            };
        },
        methods:{
            setLevel(){
            this.right_idx = Math.floor(Math.random() * 4);
            var a,b,c,d;
            switch(this.level){
                case 0:
                    break;
                case 1:// 1+2 0 carry
                    this.add1 = Math.floor(Math.random() * 10);
                    this.add2 = Math.floor(Math.random() * 90)+10;
                    while(this.add1+this.add2%10>=10){
                        this.add1 = Math.floor(Math.random() * 10);
                        this.add2 = Math.floor(Math.random() * 90)+10;
                    }
                    this.choice[this.right_idx] = this.add1+this.add2;
                    this.choice[(this.right_idx+1)%4] = this.add1+this.add2+Math.floor(Math.random() * 40)+1;
                    this.choice[(this.right_idx+2)%4] = this.add1+this.add2-Math.floor(Math.random() * 100)-1;
                    this.choice[(this.right_idx+3)%4] = this.add1+this.add2+Math.floor(Math.random() * 80)+1;
                    break;
                case 2:// 1+2 1 carry
                    this.add1 = Math.floor(Math.random() * 10);
                    this.add2 = Math.floor(Math.random() * 90)+10;
                    while(this.add1+this.add2%10<10){
                        this.add1 = Math.floor(Math.random() * 10);
                        this.add2 = Math.floor(Math.random() * 90)+10;
                    }
                    this.choice[this.right_idx] = this.add1+this.add2;
                    this.choice[(this.right_idx+1)%4] = this.add1+this.add2+Math.floor(Math.random() * 40)+1;
                    this.choice[(this.right_idx+2)%4] = this.add1+this.add2-Math.floor(Math.random() * 100)-1;
                    this.choice[(this.right_idx+3)%4] = this.add1+this.add2+Math.floor(Math.random() * 80)+1;
                    break;
                case 3:// 2+2 1 carry
                    this.add1 = Math.floor(Math.random() * 9)+1;
                    this.add2 = Math.floor(Math.random() * 9)+1;
                    a = Math.floor(Math.random() * 10);
                    b = Math.floor(Math.random() * 10);
                    while(((this.add1+this.add2<10)&&(a+b<10))||((this.add1+this.add2>=10)&&(a+b>=10))){
                        this.add1 = Math.floor(Math.random() * 9)+1;
                        this.add2 = Math.floor(Math.random() * 9)+1;
                        a = Math.floor(Math.random() * 10);
                        b = Math.floor(Math.random() * 10);
                    }
                    this.add1 = this.add1*10+a;
                    this.add2 = this.add2*10+b;
                    this.choice[this.right_idx] = this.add1+this.add2;
                    this.choice[(this.right_idx+1)%4] = this.add1+this.add2+Math.floor(Math.random() * 40)+1;
                    this.choice[(this.right_idx+2)%4] = this.add1+this.add2-Math.floor(Math.random() * 100)-1;
                    this.choice[(this.right_idx+3)%4] = this.add1+this.add2+Math.floor(Math.random() * 80)+1;
                    break;
                case 4:// 2+2 2 carry
                    this.add1 = Math.floor(Math.random() * 9)+1;
                    this.add2 = Math.floor(Math.random() * 9)+1;
                    while(this.add1+this.add2<10){
                        this.add1 = Math.floor(Math.random() * 9)+1;
                        this.add2 = Math.floor(Math.random() * 9)+1;
                    }
                    a = Math.floor(Math.random() * 10);
                    b = Math.floor(Math.random() * 10);
                    while(a+b<10){
                        a = Math.floor(Math.random() * 10);
                        b = Math.floor(Math.random() * 10);
                    }
                    this.add1 = this.add1*10+a;
                    this.add2 = this.add2*10+b;
                    this.choice[this.right_idx] = this.add1+this.add2;
                    this.choice[(this.right_idx+1)%4] = this.add1+this.add2+Math.floor(Math.random() * 40)+1;
                    this.choice[(this.right_idx+2)%4] = this.add1+this.add2-Math.floor(Math.random() * 100)-1;
                    this.choice[(this.right_idx+3)%4] = this.add1+this.add2+Math.floor(Math.random() * 80)+1;
                    break;
                case 5:// 2+3 1 carry
                    this.add1 = Math.floor(Math.random() * 9)+1;
                    this.add2 = Math.floor(Math.random() * 90)+10;
                    a = Math.floor(Math.random() * 10);
                    b = Math.floor(Math.random() * 10);
                    while(((this.add1+this.add2%10<10)&&(a+b<10))||((this.add1+this.add2%10>=10)&&(a+b>=10))){
                        this.add1 = Math.floor(Math.random() * 9)+1;
                        this.add2 = Math.floor(Math.random() * 90)+10;
                        a = Math.floor(Math.random() * 10);
                        b = Math.floor(Math.random() * 10);
                    }
                    this.add1 = this.add1*10+a;
                    this.add2 = this.add2*10+b;
                    this.choice[this.right_idx] = this.add1+this.add2;
                    this.choice[(this.right_idx+1)%4] = this.add1+this.add2+Math.floor(Math.random() * 40)+1;
                    this.choice[(this.right_idx+2)%4] = this.add1+this.add2-Math.floor(Math.random() * 100)-1;
                    this.choice[(this.right_idx+3)%4] = this.add1+this.add2+Math.floor(Math.random() * 80)+1;
                    break;
                case 6:// 2+3 2 carry
                    this.add1 = Math.floor(Math.random() * 9)+1;
                    this.add2 = Math.floor(Math.random() * 90)+10;
                    while(this.add1+this.add2%10<10){
                        this.add1 = Math.floor(Math.random() * 9)+1;
                        this.add2 = Math.floor(Math.random() * 90)+10;
                    }
                    a = Math.floor(Math.random() * 10);
                    b = Math.floor(Math.random() * 10);
                    while(a+b<10){
                        a = Math.floor(Math.random() * 10);
                        b = Math.floor(Math.random() * 10);
                    }
                    this.add1 = this.add1*10+a;
                    this.add2 = this.add2*10+b;
                    this.choice[this.right_idx] = this.add1+this.add2;
                    this.choice[(this.right_idx+1)%4] = this.add1+this.add2+Math.floor(Math.random() * 40)+1;
                    this.choice[(this.right_idx+2)%4] = this.add1+this.add2-Math.floor(Math.random() * 100)-1;
                    this.choice[(this.right_idx+3)%4] = this.add1+this.add2+Math.floor(Math.random() * 80)+1;
                    break;
                case 7:// 3+3 3 carry
                    this.add1 = Math.floor(Math.random() * 9)+1;
                    this.add2 = Math.floor(Math.random() * 9)+1;
                    while(this.add1+this.add2%10<10){
                        this.add1 = Math.floor(Math.random() * 9)+1;
                        this.add2 = Math.floor(Math.random() * 9)+1;
                    }
                    a = Math.floor(Math.random() * 10);
                    b = Math.floor(Math.random() * 10);
                    while(a+b<10){
                        a = Math.floor(Math.random() * 10);
                        b = Math.floor(Math.random() * 10);
                    }
                    c = Math.floor(Math.random() * 10);
                    d = Math.floor(Math.random() * 10);
                    while(a+b<10){
                        c = Math.floor(Math.random() * 10);
                        d = Math.floor(Math.random() * 10);
                    }
                    this.add1 = this.add1*100+a*10+c;
                    this.add2 = this.add2*100+b*10+d;
                    this.choice[this.right_idx] = this.add1+this.add2;
                    this.choice[(this.right_idx+1)%4] = this.add1+this.add2+Math.floor(Math.random() * 40)+1;
                    this.choice[(this.right_idx+2)%4] = this.add1+this.add2-Math.floor(Math.random() * 100)-1;
                    this.choice[(this.right_idx+3)%4] = this.add1+this.add2+Math.floor(Math.random() * 80)+1;
                    break;
                }
                if(this.level==0){
                    this.question = "Please return!";
                }
                else{
                    this.question = this.add1.toString()+"+"+this.add2.toString();
                }
            },
        },
        mounted(){
            console.log("reset!");
            var _this = this;
            _this.level = _this.$route.query.level;
            _this.setLevel();
            _this.time_question_start = new Date();
            var tmp;
            document.onkeydown = function (e) {
                if((e.keyCode==65)||(e.keyCode==83)||(e.keyCode==68)||(e.keyCode==70)){
                    _this.time_question_end = new Date();
                    if (e.keyCode == 65) {//A
                        if(_this.right_idx==0){
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':true,
                            }
                            _this.right_ans_num +=1;
                        }
                        else{
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':false,
                            }
                        }
                    }
                    else if (e.keyCode == 83) {//S
                        if(_this.right_idx==0){
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':true,
                            }
                            _this.right_ans_num +=1;
                        }
                        else{
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':false,
                            }
                        }
                    }
                    else if (e.keyCode == 68) {//D
                        if(_this.right_idx==0){
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':true,
                            }
                            _this.right_ans_num +=1;
                        }
                        else{
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':false,
                            }
                        }
                    }
                    else if (e.keyCode == 70) {//F
                        if(_this.right_idx==0){
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':true,
                            }
                            _this.right_ans_num +=1;
                        }
                        else{
                            tmp = {
                                'start_time':_this.time_question_start.getTime(),
                                'end_time':_this.time_question_end.getTime(),
                                'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                                'right':false,
                            }
                        }
                    }
                    _this.time_question_record.push(tmp);
                    _this.total_ans_num +=1;
                    _this.times+=1;
                    if(_this.times>=100){
                        var result = {};
                        result['level'] = _this.level;
                        result['right_ans_num'] = _this.right_ans_num;
                        result['total_ans_num'] = _this.total_ans_num;
                        result['time_question_record'] = _this.time_question_record;
                        localStorage.setItem("cl_result", JSON.stringify(result));
                        _this.$router.push({path:'/finish'});
                        return;
                    }
                    _this.setLevel();
                    _this.time_question_start = new Date();
                }
            }
        }
    };
</script>

<style>
    .content{
        margin:0;
        padding-top: 2cm;
        padding-bottom: 2cm;
        text-align: center;
        background-color: #B3C0D1;
        font-size: 24px;
    }
    .cl-header{
        height : 200px;
    }
</style>
