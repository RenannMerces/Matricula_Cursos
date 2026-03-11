<template>
  <div class="main-container">
    <TabelaMatriculasVue />
  </div>
</template>

<script>
import TabelaMatriculasVue from '../components/TabelaMatriculas.vue'

  export default{
    name: "InscricaoAlunos",
    components:{
      TabelaMatriculasVue
    }
  }
</script>

