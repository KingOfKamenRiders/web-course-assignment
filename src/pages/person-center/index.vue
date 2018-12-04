<template>
  <div>
    <MyHeader/>
  <aside class="col-2 col-m-6">
    <div class="nav-tab col-12">
      我的英雄
    </div>
  </aside>
  <main class="col-10 col-m-6">
    <router-view/>
  </main>
  </div>
</template>

<script>
  import MyHeader from '../../components/MyHeader'
    export default {
        name: "index",
        components:{MyHeader}
    }
</script>

<style scoped>

</style>
<style src="../../assets/css/layout.css" scoped></style>
<style src="./person-center.css" scoped></style>
