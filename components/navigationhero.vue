<template>
  <div id="linknav">
    <ul>
      <li>
        <NuxtLink to="/">
          Úvod
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">
          Uchazeč
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/verejnost">
          Veřejnost
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">
          Student
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">
          O nás
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style>

#linknav {
  width: 100%;
  margin: 0 auto;
  font-size: 18px;
  position: absolute;
  bottom: 0px;
  left:0px;
  /*background-color: #ffffff;*/
  z-index:9999;
  width:100%;
}

@media screen and (max-width: 1183px){
    #linkav ul li{
        flex-direction: column;
        width:100%;
    }
}

#linknav ul{
  display:flex;
  padding-bottom:30px;
  padding-top:20px;
  justify-content: center;
  align-items: center;
  width:100%;
  background-color:#001942;
  border-top: #fff solid 2px;
  border-radius:5px 5px 0px 0px;
}

#linknav ul li{
  list-style: none;
  margin: 0 15px;
  flex-direction: row;
}

#linknav ul li:first-child{
  list-style: none;
  margin: 0 15px 0 0;
  flex-direction: row;
}

#linknav ul li a{
  color:#fff;
  text-decoration: none;
  text-transform: uppercase;
  align-items:center;
}

#linknav ul li a.nuxt-link-exact-active {
  color: #66b3ff;
  padding-bottom:8px;
  border-bottom: 2px solid #66b3ff;
}
</style>

<style scoped>
  
</style>

<script>
export default {
}
</script>
