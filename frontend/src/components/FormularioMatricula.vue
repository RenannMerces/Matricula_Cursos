<template>
  <section class="page">
      <div class="form-container">

      <h1>Matrícula em Curso</h1>
      <p class="subtitle">Preencha seus dados para se inscrever</p>

      <form @submit.prevent="enviarFormulario" class="form">

        <div class="form-group">
          <label for="nome">Nome completo</label>
          <input id="nome"  type="text" v-model="nome" placeholder="Digite seu nome completo" required/>
        </div>

        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="email" placeholder="exemplo@email.com" required/>
        </div>

        <div class="form-group">
          <label for="curso">Curso</label>
          <select id="curso" v-model="curso" required>
            <option disabled value="">Selecione um curso</option>
            <option v-for="curso in cursos" :key="curso.id" :value="curso.nome"> {{curso.nome}} </option>
          </select>
        </div>

        <button type="submit" class="btn-submit">
          Realizar Matrícula
        </button>

        <MessageForm v-if="mensagem" :msg="mensagem" />
      </form>
    </div>
  </section>
</template>

<script>

import MessageForm from './FormularioMensagem.vue'

export default {
  name: "FormularioMatricula",
  components:{
    MessageForm
  },

  data() {
    return {
      nome: "",
      email: "",
      curso: "",
      cursos: [],
      mensagem: ""
    }
  },
  mounted() {
    this.buscarCursos()

    setInterval(() => {
      this.buscarCursos()
    }, 1000)
  },

 methods: {

    async buscarCursos() {
      try {

        const response = await fetch("http://localhost:3000/cursos")

        const data = await response.json()

        this.cursos = data

      } catch (error) {
        console.error("Erro ao buscar cursos", error)
      }
    },

    // -----------------------------------------------------------------

    async enviarFormulario() {

      if (!this.nome || !this.email || !this.curso) {
        this.mensagem = "Preencha todos os campos."
        return
      }

      const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/

      if (!nomeRegex.test(this.nome)) {
        this.mensagem = "O nome deve conter apenas letras."
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(this.email)) {
        this.mensagem = "Digite um email válido."
        return
      }

      try {

        const response = await fetch("http://localhost:3000/matricula", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome: this.nome,
            email: this.email,
            curso: this.curso
          })
        })

        const data = await response.json()

        if (!response.ok) {
          this.mensagem = data.mensagem
          return
        }

        this.mensagem = "Matrícula realizada com sucesso!"

        this.nome = ""
        this.email = ""
        this.curso = ""

      } catch (error) {

        this.mensagem = "Erro ao conectar com o servidor"

      }

      setTimeout(() => {
        this.mensagem = ""
      }, 4000)

    }

  }
}
</script>

<style scoped>

.page{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container{
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background:white;
  border-radius: 10px;
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

h1{
  text-align:center;
  margin-bottom:5px;
  color:#1d4ed8;
}

.subtitle{
  text-align:center;
  margin-bottom:25px;
  color:#666;
}

.form{
  display:flex;
  flex-direction:column;
  gap:18px;
}

.form-group{
  display:flex;
  flex-direction:column;
}

label{
  margin-bottom:5px;
  font-weight:600;
}

input, select{
  padding:10px;
  border-radius:6px;
  border:1px solid #ccc;
  font-size:14px;
  transition:0.2s;
}

input:focus, select:focus{
  outline:none;
  border-color:#4da3ff;
  box-shadow:0 0 5px rgba(77,163,255,0.4);
}

.btn-submit{
  margin-top:10px;
  padding:12px;
  border:none;
  border-radius:6px;
  background:#4da3ff;
  color:white;
  font-weight:bold;
  font-size:15px;
  cursor:pointer;
  transition:0.3s;
}

.btn-submit:hover{
  background:#1d4ed8;
}

.mensagem{
  margin-top:15px;
  text-align:center;
  font-weight:600;
  color:green;
}

/* Responsivo */

@media (max-width:600px){

  .form-container{
    margin:30px 15px;
    padding:20px;
  }

}

</style>