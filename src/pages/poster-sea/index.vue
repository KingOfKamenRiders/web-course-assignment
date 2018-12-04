<template>
    <div>
      <MyHeader/>
      <main class="col-9">
        <div>
          <h3>已选择标签</h3>
          <el-tag v-for="tag in curTags"
                  :key="tag.content"
                  type="primary"
                  closable
                  @close="handleTagClose(tag)"
                  class="hotTag">
            {{tag.content}}</el-tag>
        </div>
        <div>
          <div>
            排序方式：
            <el-radio-group v-model="curComparator" @change="handleSortChange">
              <el-radio  label="heat">热度</el-radio>
              <el-radio  label="time">时间</el-radio>
            </el-radio-group>
          </div>
          <div>

            <div class="col-12" v-for="i in 3" :key="i">
              <div class="col-3" v-for="j in 4" :key="j" v-if="(curPage-1)*12+(i-1)*4+j-1<curPosters.length" >
                <PosterItem v-bind="curPosters[(curPage-1)*12+(i-1)*4+j-1]"></PosterItem>
              </div>
            </div>
            <el-pagination
              background
              layout="prev,pager,next"
              :total="curPosters.length"
              :page-size="12"
              @current-change="setCurPage"
              class="col-12"></el-pagination>

          </div>

        </div>
      </main>
      <aside class="col-3">
        <div>
          <strong>{{weatherInfo.forecasts[0].city}}</strong>
          <strong>{{weatherInfo.forecasts[0].casts[0].dayweather}}</strong>
          <strong>{{weatherInfo.forecasts[0].casts[0].daytemp}} ℃</strong>
          <div style="display: flex; justify-content: center;margin: 10px auto">
            <div class="cast">
              <span>今天</span>
              <p>{{weatherInfo.forecasts[0].casts[0].dayweather}}~{{weatherInfo.forecasts[0].casts[0].nightweather}}</p>
              <p>{{weatherInfo.forecasts[0].casts[0].daytemp}}℃~{{weatherInfo.forecasts[0].casts[0].nighttemp}}℃</p>
            </div>
            <div class="cast" style="border-left: solid 2px deepskyblue;border-right: solid 2px deepskyblue;">
              <span>明天</span>
              <p>{{weatherInfo.forecasts[0].casts[1].dayweather}}~{{weatherInfo.forecasts[0].casts[1].nightweather}}</p>
              <p>{{weatherInfo.forecasts[0].casts[1].daytemp}}℃~{{weatherInfo.forecasts[0].casts[1].nighttemp}}℃</p>
            </div>
            <div class="cast">
              <span>后天</span>
              <p>{{weatherInfo.forecasts[0].casts[2].dayweather}}~{{weatherInfo.forecasts[0].casts[2].nightweather}}</p>
              <p>{{weatherInfo.forecasts[0].casts[2].daytemp}}℃~{{weatherInfo.forecasts[0].casts[2].nighttemp}}℃</p>
            </div>
          </div>
        </div>
        <h2>热门标签</h2>
        <el-button v-for="tag in hotTags" type="primary" :key="tag.content" @click="handleAdd(tag)" class="hotTag">
          {{tag.content}}
        </el-button>
        <p><a href="/#/tag-sea">所有标签</a></p>
      </aside>
      <MyFooter/>
    </div>
</template>

<script>
    import MyHeader from '../../components/MyHeader';
    import MyFooter from '../../components/MyFooter';
    import PosterItem from '../../components/PosterItem';
    import {getAllPosters} from "../../api/poster";
    import {getHotTags} from "../../api/tag";
    import {getWeather} from "../../api/thirdParty"

    export default {
        name: "index",
        components:{MyHeader,MyFooter,PosterItem},
        created(){
          getAllPosters(this.curTags,(res)=>this.curPosters=res.data);
          getHotTags(res=>this.hotTags=res.data);
          getWeather(res=>this.weatherInfo = res.data);
        },
        data(){
          return({
            curTags:[],
            curPosters:[],
            hotTags:[],
            curComparator:'heat',
            curPage:1,
            totalPage:5,
            weatherInfo:{},
          })
        },
        methods:{
          handleTagClose(tag){
            this.curTags.splice(this.curTags.indexOf(tag), 1);
            getAllPosters(this.curTags,(res)=>this.curPosters=res.data);
          },
          setCurPage(page){
            this.curPage = page;
          },
          handleAdd(tag){
            if(this.curTags.indexOf(tag)<0){
              this.curTags.push(tag);
              getAllPosters(this.curTags,(res)=>this.curPosters=res.data);
            }
          },
          handleSortChange(v){
            console.log(v);
            if(v === 'heat' ){
              console.log('sorting!');
              this.curPosters.sort((x,y)=> y.heat-x.heat);
            }else if(v === 'time'){
              this.curPosters.sort((x,y)=>{
                let a =  new Date(x.time);
                let b = new Date(y.time);
                console.log(a);
                return b-a;
              })
            }
          }
        }
    }
</script>

<style scoped>
  .hotTag{
    margin: 5px 10px;
  }
  .cast{
    text-align: center;
    padding: 0 10px;
  }
</style>

