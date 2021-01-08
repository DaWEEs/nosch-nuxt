<template>
  <div id="linknav">
    <NuxtLink to="/">
      <img src="@/assets/logo.png">
    </NuxtLink>
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
        <NuxtLink to="/about">
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
  padding: 10px 10px;
  width: 75%;
  margin: 0 auto;
  font-size: 18px;
  position: sticky;
  top: 0px;
  background-color: #ffffff;
  z-index:9999;
}

@media screen and (max-width: 1183px){
    #linkav ul li{
        flex-direction: column;
        width:100%;
    }
}

#linknav ul{
  display:flex;
  float:right;
  padding: 0;
  padding-top:18px;
}

#linknav ul li{
  list-style: none;
  margin: 0 15px;
  flex-direction: row;
}

#linknav ul li a{
  color:#707070;
  text-decoration: none;
  text-transform: uppercase;
}

#linknav ul li a.nuxt-link-exact-active {
  color: #EC9F35;
  padding-bottom:8px;
  border-bottom: 2px solid #EC9F35;
}
</style>

<script>
export default {
}
</script>
