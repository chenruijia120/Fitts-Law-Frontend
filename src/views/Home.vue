<template>
    <div class="main" id="Home">
      <el-container direction="vertical">
        <el-header>Fitts' Law with math questions</el-header>
        <el-container direction="vertical">
          <el-main>
            <el-row :gutter="20" id="FirstMainRow">
            <div>Difficulty level:</div>
            </el-row>
            <el-row :gutter="20">
            <el-input-number v-model="num" :min="0" :max="7"/>
            </el-row>
            <el-row :gutter="20">
            <el-button type="info" round @click="start_fitts($event)">Start Fitts' Law Study@Audio</el-button>
            </el-row>
            <el-row :gutter="20">
            <el-button type="info" round @click="start_test()">Start Fitts' Law Study@Vision</el-button>
            </el-row>
            <el-row :gutter="20">
            <el-button type="info" round @click="start_cl()">Start CL Study</el-button>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  import Recorder from 'js-audio-recorder';
  export default {
    name:"Home",
    data() {
      return {
        num: 0
      };
    },
    methods: {
      start_test() {
        this.$router.push({path:'/test',query: {level:this.num}})
        console.log(this.num);
      },
      start_cl() {
        this.$router.push({path:'/cl',query: {level:this.num}})
        console.log(this.num);
      },
      start_fitts(e) {
        this.$router.push({path:'/fitts',query: {level:this.num,x:e.x,y:e.y}})
        console.log(e.x,e.y);
      }
    },
    mounted(){
      Recorder.getPermission().then(() => {
          console.log('给权限了');
      }, (error) => {
          console.log(`${error.name} : ${error.message}`);
      });
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    padding: 100px;
    font-size: 24px;
  }
   .el-main {
    color: #333;
    text-align: center;
    direction:"vertical";
  }

  #Home {
    height: 100%;
  }
   .el-row {
    margin-bottom: 30px;
  }

  #FirstMainRow{
    margin-top: 40px;
  }

</style>