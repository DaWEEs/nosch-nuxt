<template>
  <div id="quick">
      <div class="container-nopadding container">
        <v-icon color="black">mdi-map-marker</v-icon><a href="https://goo.gl/maps/SkZ5TJRdf7W8bKSr9">Energetiků 144</a>
      </div>
  </div>
</template>

<script>
export default {
  async asyncData(){
    
  }
}
</script>

<style scoped>
.container-nopadding{
  padding:0 12px !important;
}
.theme--light.v-icon{
    color: rgba(0, 0, 0, 1);
}
    #quick{
      padding:6px;
      height:30px;
      width:100%;
      margin:0 auto;
      background-color: #EC9F35;
      display: block;
      position:relative;
      z-index:9999;
    }
    #quick a{
      text-decoration: none;
      color:black;
    }
    #quick a:visited{
      color:black;
    }
</style>