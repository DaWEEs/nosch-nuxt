<template>
  <section class="intro" id="intro">
    <figure>
      <video loop autoplay preload muted src="/nosch.webm" alt=""></video>
      <img src="/slider_1.jpg" alt="" />
    </figure>
  </section>
</template>

<script>
export default {}
</script>

<style>
.intro
{
    width:100%;
    display:block;
    position:relative;
    top:0px;
    left:0;
    height:73vh;
}

figure{
  height:100%;
  background-color: rgba(0,0,0,0.3);
}

.intro::after {
  content: "";
  clear: both;
  display: table;
}

figure img{
    width:100%;
    height: 73vh;
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
    height: 73vh;
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
    margin:0 auto;
    z-index: 3;
    text-align: center;
    color:#fff;
}

.intro-text h1{
    color:#fff;
    font-size: 32px;
    font-weight: 800;
}

.intro-text p{
    color:#fff;
    font-size: 26px;
    font-weight: 300;
}

@media screen and (max-width:768px){
    figure video{
        display:none;
    }
    figure img{
        display:block;
    }
}
</style>
