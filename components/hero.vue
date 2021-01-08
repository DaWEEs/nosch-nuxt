<template>
  <section class="intro" id="intro">
    <div class="fading" />
    <figure>
      <video loop autoplay preload muted src="/nosch.webm" alt=""></video>
      <img src="/slider_1.jpg" alt="" />
    </figure>
    <div class="container">
      <div class="intro-text" id="intro-cont">
        <h1>S námi jste vždy o pár kroků napřed!</h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.intro
{
  height:600px;
    width:100%;
    display:block;
    top:0;
    left:0;
    
}

.fading{
  background-color: rgba(0,0,0,0.6);
  min-width:100%;
  
  z-index: 2;
}

figure{
  height:40%;
}

figure img{
    width:100%;
    height: 600px;
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
    height: 600px;
    position: absolute;
    top:0;
    left:0;
    z-index: -2;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    z-index: 3;
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
