<template>
  <nav>
    <v-container style="padding-top: 0;padding-bottom:0;">
      <ul class="logo">
        <li>
          <NuxtLink :to="`/`">
              <img src="~assets/img/logo_office.svg" alt="logo" />
          </NuxtLink>
        </li>
      </ul>
      <ul>
        <li class="burger">
          <a href="javascript:void(0);" onclick="myFunction()">
            <v-icon size="35px;" color="#fff">
              mdi-menu
            </v-icon>
          </a>
        </li>
      </ul>
      <ul class="links" id="myLinks">
        <li>
          <NuxtLink :to="`/`">
            Úvod
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/uchazec`">
            Uchazeč
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/verejnost`">
            Veřejnost
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/student`">
            Student
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/o-nas`">
            O nás
          </NuxtLink>
        </li>
      </ul>
    </v-container>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
nav{
  position:fixed;
  top:0;
  left:0;
  border-bottom: 2px #fff solid;
  border-radius:0 0 5px 5px;
  height:100px;
  width:100%;
  background-color:$main-color;
  z-index:9999;
  ul.logo{
    display:flex;
    width:auto;
    float:left;
    height:100px;
    align-items:center;
    list-style-type:none;
    & img{
      height:75px;
    }
  }
  ul.links{
    display:flex;
    float:right;
    list-style-type:none;
    height:100px;
    align-items:center;
    li{
      margin-left:10px;
      text-transform:uppercase;
      a{
        text-decoration:none;
        &:link{
        color:#fff;
        }
        &:visited{
          color:#fff;
        }
        &.nuxt-link-exact-active {
          color: #66b3ff;
          padding-bottom:8px;
          border-bottom: 2px solid #66b3ff;
        }
      }
    }
  }
  .burger{
    display:none;
  }
}

@media screen and (max-width:768px){
  nav{
    height:70px;
      ul.logo{
      display:flex;
      width:auto;
      float:left;
      height:70px;
      align-items:center;
        & img{
          height:55px;
        }
      }
      ul.links{
      display:none;
      list-style-type:none;
      height:100%;
      width:100%;
      align-items:center;
      background-color:$main-color;
      flex-direction:column;
      text-align:center;
      border-radius: 0 0 5px 5px;
      border-bottom: 2px #fff solid;
      & li{
        height:100%;
        width:100%;
        padding:10px;
      }
    }
    .burger{
      display:flex;
      float:right;
      height:70px;
      align-items:center;
      & a{
        &:link{
          text-decoration:none;
        }
      }
    }
  }
}
</style>