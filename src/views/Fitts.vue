<template>
    <div class="main" id="Test">
        
    <div id="fitts-header">
    </div>
    <div>
        <el-button circle type="info" :style="style_choice[0]" @click="click($event)" :disabled="!origin"></el-button>
        <el-button circle type="info" :style="style_choice[1]" @click="click($event)" :disabled="origin"></el-button>
    </div>
    </div>
</template>

<script>
import Recorder from 'js-audio-recorder';
export default{
    name:"Fitts",
    data(){
        return {
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
            }],
            level:0,
            time_question_record:[],
            time_fitts_record:[],
            time_question_start:0,
            time_question_end:0,
            time_fitts_start:0,
            time_fitts_end:0,
            fitts_times:0,
            width:[15,30,45],
            distance:[105,135],
            direction:[0,36,72,108,144],
            now_direction:0,
            wd_level:-1,
            wd_level_record:[false,false,false,false,false,false],
            right_question_num:0,
            total_question_num:0,
            now_dw_question_num:0,
            question_num:[1,8,8,6,6,5,5,4],
            now_width:0.5,
            now_distance:2,
            next_width:0.5,
            next_distance:2,
            origin:false,
            center_left:640,//px
            center_top:400,//px
            px_cm:41,
            recoder:null,
            last_x:0,
            last_y:0,
        };
    },
    methods:{
        setFitts(){
            this.now_width = this.next_width;
            this.now_distance = this.next_distance;

            this.fitts_times += 1;
            this.now_direction = Math.floor(Math.random() * 5);

            var angle = this.direction[this.now_direction];
            var tmp_length,tmp_width;
            tmp_length = this.now_distance/2*Math.sin(angle*Math.PI/180.0);
            tmp_width = this.now_distance/2*Math.cos(angle*Math.PI/180.0);

          
            this.style_choice[0]['width'] = this.now_width+'px';
            this.style_choice[0]['height'] = this.now_width+'px';
            this.style_choice[0]['left'] = (this.center_left-this.now_width/2+tmp_length)+'px';
            this.style_choice[0]['top'] =  (this.center_top-this.now_width/2+tmp_width)+'px';

            this.style_choice[1]['width'] = this.now_width+'px';
            this.style_choice[1]['height'] = this.now_width+'px';
            this.style_choice[1]['left'] = (this.center_left-this.now_width/2-tmp_length)+'px';
            this.style_choice[1]['top'] =  (this.center_top-this.now_width/2-tmp_width)+'px';
        },
        click(e){
            var tmp;
            if(this.origin){
                this.time_end = new Date();
                this.origin = false;
                console.log(Math.sqrt((this.last_x-e.x)*(this.last_x-e.x)+(this.last_y-e.y)*(this.last_y-e.y)))
                console.log(this.now_distance)
                tmp = {
                    last_x:this.last_x,
                    last_y:this.last_y,
                    now_x:e.x,
                    now_y:e.y,
                    width:this.now_width,
                    distance:this.now_distance,
                    cal_distance:Math.sqrt((this.last_x-e.x)*(this.last_x-e.x)+(this.last_y-e.y)*(this.last_y-e.y)),
                    direction:this.now_direction,
                    time:this.time_end.getTime()-this.time_start.getTime(),
                    start_time:this.time_start.getTime(),
                    end_time:this.time_end.getTime(),
                    origin_to_choice:true,
                };
                this.setFitts();
                this.last_x = e.x;
                this.last_y = e.y;
                this.time_fitts_record.push(tmp);
            }
            else{
                this.time_start = new Date();
                this.origin = true;
                console.log(Math.sqrt((this.last_x-e.x)*(this.last_x-e.x)+(this.last_y-e.y)*(this.last_y-e.y)))
                tmp = {
                    last_x:this.last_x,
                    last_y:this.last_y,
                    now_x:e.x,
                    now_y:e.y,
                    width:this.now_width,
                    distance:this.now_distance,
                    cal_distance:Math.sqrt((this.last_x-e.x)*(this.last_x-e.x)+(this.last_y-e.y)*(this.last_y-e.y)),
                    direction:this.now_direction,
                    time:this.time_start.getTime()-this.time_end.getTime(),
                    start_time:this.time_end.getTime(),
                    end_time:this.time_start.getTime(),
                    origin_to_choice:false,
                };
                this.last_x = e.x;
                this.last_y = e.y;
                this.time_fitts_record.push(tmp);
            }
        },
        checkQustionNum(){
            console.log('now num:'+this.now_dw_question_num);
            if(this.now_dw_question_num>=this.question_num[this.level]){
                let all_levels = true;
                for(var i=0;i<6;i++){
                    if(this.wd_level_record[i]==false){
                        all_levels = false;
                        break;
                    }
                }
                
                if(all_levels==false){
                    this.wd_level = Math.floor(Math.random() * 6);
                    while(this.wd_level_record[this.wd_level]==true){
                        this.wd_level = Math.floor(Math.random() * 6);
                    }
                    this.wd_level_record[this.wd_level] = true;
                    this.now_dw_question_num = 0;
                    this.next_width = this.width[parseInt(this.wd_level/3)];
                    this.next_distance = this.distance[parseInt(this.wd_level%3)];
                    console.log('width:'+this.next_width+'  distance:'+this.next_distance);
                    console.log(this.wd_level_record)
                }
                else{
                    var result = {};
                    result['time_fitts_record'] = this.time_fitts_record;
                    result['level'] = this.level;
                    result['right_question_num'] = this.right_question_num;
                    result['total_question_num'] = this.total_question_num;
                    result['time_question_record'] = this.time_question_record;
                    localStorage.setItem("fitts_result", JSON.stringify(result));
                    console.log(JSON.stringify(result));
                    this.recorder.stop();
                    this.recorder.downloadWAV('record');
                    this.$router.push({path:'/finish'});
                    return;
                }
            }
        }
    },
    mounted(){
        console.log("Fitts:Aduio!");
        var _this = this;
        _this.recorder = new Recorder();
        _this.recorder.start().then(() => {}, (error) => {
            console.log(`${error.name} : ${error.message}`);
        });
        _this.level = _this.$route.query.level;
        _this.last_x = _this.$route.query.x;
        _this.last_y = _this.$route.query.y;
        _this.wd_level = Math.floor(Math.random() * 6);
        _this.wd_level_record[_this.wd_level] = true;
        _this.next_width = _this.width[parseInt(_this.wd_level/3)];
        _this.next_distance = _this.distance[parseInt(_this.wd_level%3)];
        console.log('width:'+_this.next_width+'  distance:'+_this.next_distance);
        console.log(_this.wd_level_record)
        _this.setFitts();
        _this.time_question_start = new Date();
        var tmp;
        document.onkeydown = function (e) {
            if(e.keyCode==65||e.keyCode == 83){
                _this.time_question_end = new Date();
                if (e.keyCode == 65) {//A
                    // console.log('A');
                    tmp = {
                        'start_time':_this.time_question_start.getTime(),
                        'end_time':_this.time_question_end.getTime(),
                        'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                        'right':true,
                    }
                    _this.time_question_record.push(tmp);
                    _this.right_question_num +=1;
                }
                else{
                    _this.time_question_end = new Date();
                    // console.log('S');
                    tmp = {
                        'start_time':_this.time_question_start.getTime(),
                        'end_time':_this.time_question_end.getTime(),
                        'time':(_this.time_question_end.getTime()-_this.time_question_start.getTime()),
                        'right':false,
                    }
                    _this.time_question_record.push(tmp);
                }
                _this.total_question_num +=1;
                _this.now_dw_question_num +=1;
                _this.time_question_start = new Date();
                _this.checkQustionNum();
            }
            
        };
    }
};
</script>

<style>
    #fitts-header{
        height : 200px;
    }
</style>