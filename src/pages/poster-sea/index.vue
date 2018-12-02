<template>
    <div>
      <MyHeader/>
      <main class="col-9">
        <div>

        </div>
        <div>

        </div>
      </main>
      <aside class="col-3">

      </aside>
      <MyFooter/>
    </div>
</template>

<script>
    import MyHeader from '../../components/MyHeader'
    import MyFooter from '../../components/MyFooter'
    export default {
        name: "index",
        components:{MyHeader,MyFooter},
        created(){

        }
    }
</script>

<style scoped>

</style>
<style src="../../assets/css/layout.css"></style>
