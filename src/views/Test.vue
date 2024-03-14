<template>
  <div class="main" id="Test">
    <div class="header">
        <div>{{click_text}}</div>
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
    <el-button circle type="info" :style="style_choice[0]" @click="click()" :disabled="!origin">A</el-button>
    <el-button circle type="info" :style="style_choice[1]" @click="click()" :disabled="!origin">B</el-button>
    <el-button circle type="info" :style="style_origin" @click="click()" :disabled="origin">O</el-button>
    <el-button circle type="info" :style="style_choice[2]" @click="click()" :disabled="!origin">C</el-button>
    <el-button circle type="info" :style="style_choice[3]" @click="click()" :disabled="!origin">D</el-button>
  </div>
</template>

<script>
  export default{
    name:"Test",
    data(){
        return {
            origin:false,
            click_text:"Click Origin",
            right_ans_num:0,
            total_ans_num:0,
            level:0,
            add1:0,
            add2:0,
            question:"0",
            right_idx:0,
            // right_idx_num:[0,0,0,0],
            choice:['','','',''],
            radius:[0.25,0.5,0.75],
            distance:[2,3,4],
            px_cm:41,
            center_left:14,//cm
            center_top:9,//cm
            test_num:[[0,0,0],[0,0,0],[0,0,0]],
            style_origin:{
                'width':'1cm',
                'height':'1cm',
                'margin':'0cm',
                'position': 'absolute',
                'left': '8cm',
                'top': '5cm',
                'font-size': '18px',
                'text-align': 'center',
                'padding': 0,
                'visibility':'visible',
            },
            style_choice:[
                {
                'width':'1cm',
                'height':'1cm',
                'margin':'0cm',
                'position': 'absolute',
                'left': '8cm',
                'top': '5cm',
                'font-size': '18px',
                'text-align': 'center',
                'padding': 0,
                'visibility':'hidden',
            },
            {
                'width':'1cm',
                'height':'1cm',
                'margin':'0cm',
                'position': 'absolute',
                'left': '8cm',
                'top': '5cm',
                'font-size': '18px',
                'text-align': 'center',
                'padding': 0,
                'visibility':'hidden',
            },
            {
                'width':'1cm',
                'height':'1cm',
                'margin':'0cm',
                'position': 'absolute',
                'left': '8cm',
                'top': '5cm',
                'font-size': '18px',
                'text-align': 'center',
                'padding': 0,
                'visibility':'hidden',
            },
            {
                'width':'1cm',
                'height':'1cm',
                'margin':'0cm',
                'position': 'absolute',
                'left': '8cm',
                'top': '5cm',
                'font-size': '18px',
                'text-align': 'center',
                'padding': 0,
                'visibility':'visible',
            }],
            header_style:{
                'visibility':'visible',
            },
            time_record:[],
            time_question_record:[],
            time_question_start:0,
            time_question_end:0,
            time_start:0,
            time_end:0,
            now_radius:0,
            now_distance:0,
            last_radius:0,
            last_distance:0,
            times:0,

        };
    },
    methods:{
        setLevel(){
            this.right_idx = Math.floor(Math.random() * 4);
            // while(this.right_idx_num[this.right_idx]>=3*3*20/4){
            //     this.right_idx = Math.floor(Math.random() * 4);
            // }
            // this.right_idx_num[this.right_idx]+=1;
            var a,b,c,d;
            switch(this.level){
                case 0:
                    // this.style_choice[this.right_idx]['visibility']='visible';
                    // this.style_choice[(this.right_idx+1)%4]['visibility']='hidden';
                    // this.style_choice[(this.right_idx+2)%4]['visibility']='hidden';
                    // this.style_choice[(this.right_idx+3)%4]['visibility']='hidden';
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
                this.question = "Please click origin and then click choice button!";
            }
            else{
                this.question = this.add1.toString()+"+"+this.add2.toString();
            }
        },
        setFitts(){
            this.times += 1;
            this.last_radius = this.now_radius;
            this.last_distance = this.now_distance;
            this.now_radius = Math.floor(Math.random() * 3);
            this.now_distance = Math.floor(Math.random() * 3);
            while(this.test_num[this.now_radius][this.now_distance]>=20){
                this.now_radius = Math.floor(Math.random() * 3);
                this.now_distance = Math.floor(Math.random() * 3);
            }
            this.test_num[this.now_radius][this.now_distance]+=1;
            this.now_radius = this.radius[this.now_radius];
            this.now_distance = this.distance[this.now_distance];

            this.style_origin['width'] = (this.now_radius*2*this.px_cm)+'px';
            this.style_origin['height'] = (this.now_radius*2*this.px_cm)+'px';
            this.style_origin['left'] = ((this.center_left-this.now_radius)*this.px_cm)+'px';
            this.style_origin['top'] =  ((this.center_top-this.now_radius)*this.px_cm)+'px';
            
            // this.style_choice[0]['width'] = (this.now_radius*2*this.px_cm)+'px';
            // this.style_choice[0]['height'] = (this.now_radius*2*this.px_cm)+'px';
            // this.style_choice[0]['left'] = ((this.center_left-this.now_radius)*this.px_cm)+'px';
            // this.style_choice[0]['top'] =  ((this.center_top-this.now_radius-this.now_distance)*this.px_cm)+'px';

            // this.style_choice[1]['width'] = (this.now_radius*2*this.px_cm)+'px';
            // this.style_choice[1]['height'] = (this.now_radius*2*this.px_cm)+'px';
            // this.style_choice[1]['left'] = ((this.center_left-this.now_radius-this.now_distance)*this.px_cm)+'px';
            // this.style_choice[1]['top'] =  ((this.center_top-this.now_radius)*this.px_cm)+'px';
            
            // this.style_choice[2]['width'] = (this.now_radius*2*this.px_cm)+'px';
            // this.style_choice[2]['height'] = (this.now_radius*2*this.px_cm)+'px';
            // this.style_choice[2]['left'] = ((this.center_left-this.now_radius)*this.px_cm)+'px';
            // this.style_choice[2]['top'] =  ((this.center_top-this.now_radius+this.now_distance)*this.px_cm)+'px';
            
            this.style_choice[3]['width'] = (this.now_radius*2*this.px_cm)+'px';
            this.style_choice[3]['height'] = (this.now_radius*2*this.px_cm)+'px';
            this.style_choice[3]['left'] = ((this.center_left-this.now_radius+this.now_distance)*this.px_cm)+'px';
            this.style_choice[3]['top'] =  ((this.center_top-this.now_radius)*this.px_cm)+'px';
        },
        click(){
            var tmp;
            if(this.origin){
                this.time_end = new Date();
                this.origin = false;
                this.click_text = "now times: "+this.times;
                // if(this.right_idx==button_idx){
                //     this.right_ans_num +=1;
                // }
                // this.total_ans_num +=1;
                tmp = {
                    radius:this.now_radius,
                    distance:this.now_distance,
                    time:this.time_end.getTime()-this.time_start.getTime(),
                    start_time:this.time_start.getTime(),
                    end_time:this.time_end.getTime(),
                    origin_to_choice:true,
                };
                this.time_record.push(tmp);
                if(this.times>=3*3*20){
                    var result = {};
                    result['time_record'] = this.time_record;
                    result['level'] = this.level;
                    result['right_ans_num'] = this.right_ans_num;
                    result['total_ans_num'] = this.total_ans_num;
                    result['time_question_record'] = this.time_question_record;
                    localStorage.setItem("fitts_result", JSON.stringify(result));
                    console.log(JSON.stringify(result));
                    this.$router.push({path:'/finish'});
                    return;
                }
                this.setFitts();
                // this.setLevel();
            }
            else{
                this.time_start = new Date();
                this.origin = true;
                // this.click_text = "Click Answer";
                tmp = {
                    radius:this.now_radius,
                    distance:this.now_distance,
                    time:this.time_start.getTime()-this.time_end.getTime(),
                    start_time:this.time_end.getTime(),
                    end_time:this.time_start.getTime(),
                    origin_to_choice:false,
                };
                this.time_record.push(tmp);
                // console.log(tmp);
            }
        }
    },
    mounted(){
        console.log("reset!");
        var _this = this;
        _this.level = _this.$route.query.level;
        _this.setLevel();
        _this.setFitts();
        _this.time_question_start = new Date();
        var tmp;
        document.onkeydown = function (e) {
            if (e.keyCode == 65) {//A
                _this.time_question_end = new Date();
                // console.log('A');
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
                _this.time_question_record.push(tmp);
                _this.total_ans_num +=1;
                _this.setLevel();
                _this.time_question_start = new Date();
            }
            else if (e.keyCode == 83) {//S
                _this.time_question_end = new Date();
                // console.log('S');
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
                _this.time_question_record.push(tmp);
                _this.total_ans_num +=1;
                _this.setLevel();
                _this.time_question_start = new Date();
            }
            else if (e.keyCode == 68) {//D
                _this.time_question_end = new Date();
                // console.log('D');
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
                _this.time_question_record.push(tmp);
                _this.total_ans_num +=1;
                _this.setLevel();
                _this.time_question_start = new Date();
            }
            else if (e.keyCode == 70) {//F
                _this.time_question_end = new Date();
                // console.log('F');
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
                _this.time_question_record.push(tmp);
                _this.total_ans_num +=1;
                _this.setLevel();
                _this.time_question_start = new Date();
            }
        }
    },
  };
</script>

<style>
    .question{
        width: 5cm;
        height: 5cm;
        font-size: 18px;
    }
    .choice{
        width: 5cm;
        height: 5cm;
        font-size: 18px;
    }
    #app{
        height: 100%;
    }
    #Test{
        height: 100%;
    }
    .header{
        margin:0;
        padding-top: 1cm;
        padding-bottom: 1cm;
        text-align: center;
        background-color: #B3C0D1;
        font-size: 24px;
    }
    .ans-row{
        text-align: center;
        margin: 0;
    }
    .ans-col{
        text-align: center;
    }
</style>