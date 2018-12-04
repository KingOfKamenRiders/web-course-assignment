<template>
    <div style="width: 100%">
      <MyHeader></MyHeader>
      <main class="col-9 flex">
        <h3>标签热度排行</h3>
        <el-table
          :data="tableData"
          stripe
          fit="false"
          style="max-width: 400px">
          <el-table-column
            prop="content"
            label="标签"
            width="180"
            >
          </el-table-column>
          <el-table-column
            prop="heat"
            label="热度"
            width="180">
          </el-table-column>
        </el-table>
      </main>
      <aside class="col-3" >
        <h3>词云</h3>
        <word-cloud :data="tableData"
        name-key="content" value-key="heat"
        :color="myColors" :show-tooltip="true">
        </word-cloud>
      </aside>
    </div>
</template>

<script>
    import MyHeader from '../../components/MyHeader';
    import WordCloud from "vue-wordcloud/src/components/WordCloud"
    import {getAllTags} from "../../api/tag"

    export default {
        name: "index",
        components:{
          WordCloud,
          MyHeader},
        data(){
          return({
            myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
            tableData:[],
          })
        },
        created(){
          getAllTags((res)=>this.tableData = res.data);
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
</style>
