<template>
  <div>
    <MyHeader/>
    <main class="col-9 flex" >
      <img :src="poster.path" class="image"/>
      <h1>{{poster.title}}</h1>
      <div style="width: 80%">
        <strong style="float: left">作者：{{poster.auther}}</strong>
        <strong style="float: right"> {{poster.time}}</strong>
        <p class="description">描述：{{poster.description}}</p>
        <div>
          <strong>该海报的热门标签：</strong>
          <el-tag v-for="tag in posterTags" class="el-tag">{{tag.tag}}</el-tag>
        </div>
        <el-button type="primary" @click="handleShowDialog" style="float: right">评价</el-button>
      </div>
      <h2>评论</h2>
      <comment v-for="co in posterComments" v-bind="co" :key="co.time"></comment>
    </main>
    <el-dialog
      title="评价"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <h3>星级评分</h3>
      <el-rate
        v-model="rate"
        show-text>
      </el-rate>
      <h3>标签评论</h3>
      <div style="margin-bottom: 15px">
        <strong>热门标签:</strong>
        <el-button
          size="small"
          :key="tag"
          v-for="tag in hotTags"
          @click="handleAddTag(tag)"
          >
          {{tag.content}}
        </el-button>
      </div>
      <el-tag
        :key="tag"
        v-for="tag in curTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag.content}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      <h3>评论</h3>
      <el-input type="textarea" v-model="comment"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleComment">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
    import {getPoster,getComments,getPosterTag} from "../../api/poster"
    import {getHotTags,comment} from "../../api/tag"
    import MyHeader from '../../components/MyHeader';
    import Comment from '../../components/comment';
    export default {
        name: "index",
        components:{MyHeader,Comment},
        data(){
          return({
            poster:{},
            dialogVisible:false,
            rate:null,
            curTags:[],
            inputValue:'',
            inputVisible:false,
            comment:'',
            hotTags:[],
            posterComments:[],
            posterTags:[],
          })
        },
        created(){
          getPoster(this.$route.query.path,res=>{
            this.poster=res.data;
            getPosterTag(res.data.path,(res)=>this.posterTags = res.data);
            getComments(res.data.path,(res)=>this.posterComments = res.data);
            this.poster.path = 'http://localhost:3000/'+this.poster.path;
          });
          getHotTags((res)=>this.hotTags = res.data);

        },
        methods:{
          handleClose(tag) {
            this.curTags.splice(this.curTags.indexOf(tag), 1);
          },
          showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },
          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue ) {
              for(let i=0;i<this.curTags.length;i++){
                if(this.curTags[i].content === inputValue){
                  this.inputVisible = false;
                  this.inputValue = '';
                  return ;
                }
              }
              this.curTags.push({content:inputValue});
            }
            this.inputVisible = false;
            this.inputValue = '';
          },
          handleComment(){
            comment(
              {
                rate:this.rate,
                comment:this.comment,
                user:sessionStorage.getItem('cid'),
                tags:this.curTags,
                path:this.poster.path.slice(22),
              }
            )
            this.dialogVisible = false;
            this.$router.go(0);
          },
          handleAddTag(tag){
            if(this.curTags.indexOf(tag)<0){
              this.curTags.push(tag);
            }
          },
          handleShowDialog(){
            if(sessionStorage.getItem('cid')){
              this.dialogVisible = true;
            }else{
              alert('请先登录!');
            }
          }
        }
    }
</script>

<style scoped>
  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .image{
    width: 80%;
  }
  .description{
    margin-left: 0;
    font-size: 1.5em;
    font-weight: bold;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<style src="../../assets/css/layout.css"></style>
