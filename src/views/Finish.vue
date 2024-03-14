<template>
    <div class="main" id="Home">
      <el-container direction="vertical">
        <el-header>Congratulations! You have finished one level test!</el-header>
        <el-container direction="vertical">
          <el-main>
            <el-row :gutter="20" id="FirstMainRow">
            <div></div>
            </el-row>
            <el-row :gutter="20">
            <div></div>
            </el-row>
            <el-row :gutter="20">
            <el-button type="info" round @click="restart()">Restart</el-button>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  export default {
    name:"Finish",
    methods: {
      restart() {
        this.$router.push({path:'/'});
      }
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