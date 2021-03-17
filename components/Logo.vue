<template>
  <div class="container">
    <NuxtLink to="/">
      <img src="~assets/img/logo_office.svg">
    </NuxtLink>
  </div>
</template>

<style scoped>
a img {
  height: 100px;
  background-color:#001942;
  padding: 10px;
  border-bottom: #fff solid 2px;
  border-radius: 0px 0px 5px 5px;
  position:absolute;
  top:0;
}

.container{
  padding:0;
  height:0;
}

@media (max-width:768px){
    a img {
    height: 100px;
    width:100%;
    background-color:#001942;
    padding: 10px;
    border-bottom: #fff solid 2px;
    border-radius: 0px 0px 5px 5px;
    position:absolute;
    top:0;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
