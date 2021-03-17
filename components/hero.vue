<template>
  <section class="intro" id="intro">
    <Logo />
    <figure>
      <video loop autoplay preload muted src="~assets/nosch.webm" alt=""></video>
      <img src="~assets/slider_1.jpg" alt="" />
    </figure>
    <div class="intro-text">
      <h1>"S námi jste vždy o pár kroků napřed!"<br><span>- SOŠ NET OFFICE</span></h1>
    </div>
    <navigationhero />
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss">
.intro
{
    width:100%;
    display:block;
    position:relative;
    top:0px;
    left:0;
    height:100vh;
}

figure{
  height:100%;
  background-color: rgba(0,25,66,0.5);
}

.intro::after {
  content: "";
  clear: both;
  display: table;
}

figure img{
    width:100%;
    height: 100vh;
    float: right;
    position: absolute;
    top:0;
    left:0;
    z-index: -2;
    object-fit: cover;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

figure video{
    width:100%;
    height: 100vh;
    float: right;
    position: absolute;
    top:0;
    left:0;
    z-index: -1;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    object-fit: cover;
}

.intro-text{
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
}

.intro-text h1{
    color:#fff;
    font-size: 64px;
    font-weight: 800;
}

.intro-text span{
    color:#fff;
    font-size: 48px;
    font-weight: 300;
}

@media screen and (max-width:768px){
    .intro-text{
      margin: 0 2Opx;
    }
}

@media screen and (max-width:420px){
    .intro-text{
      h1{
        margin: 0 2Opx;
        font-size:2rem;
      }
      span{
        font-size:1rem;
      }
    }
}
</style>
