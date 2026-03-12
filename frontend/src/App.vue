<template>
<div>
  <NavBar :logo="logo_src" :alt="app_name"/>
  <router-view/>
</div>

</template>

<script>

import NavBar from "./components/NavBar.vue"
  export default{
    name: "App",
    components: {
      NavBar
    }, data (){
      return{
        logo_src: "/img/icon.png",
        app_name: "Sistema de Matricula de Cursos"

      }
    }
  }
</script>


<style>

*{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}

.main-container{
  margin: 50px;
  min-height: 250px;
}

</style>
