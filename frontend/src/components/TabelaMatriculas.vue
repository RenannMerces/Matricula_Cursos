<template>
  <div class="tabela-container">

      <h2 class="titulo">Alunos Matriculados</h2>

    <div class="tabela-wrapper">
      <table class="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Aluno</th>
            <th>Email</th>
            <th>Curso</th>
            <th class="acoes">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="matricula in matriculas" :key="matricula.id">
            <td>{{ matricula.id }}</td>
            <td>{{ matricula.nome }}</td>
            <td>{{ matricula.email }}</td>
            <td>{{ matricula.curso }}</td>

            <td class="acoes">
                <button class="btn-excluir" @click="excluirMatricula(matricula.id)"> Excluir </button>
            </td>
          </tr>

          <tr v-if="matriculas.length === 0">
            <td colspan="5" class="vazio">
              Nenhuma matrícula encontrada
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <MessageForm v-if="mensagem" :msg="mensagem" class="toast-message"/>

  </div>
</template>

<script>

  import MessageForm from './FormularioMensagem.vue'

  export default {
    name: "TabelaMatriculas",
    components: {
      MessageForm
    },

    data() {
      return {
        matriculas: [],
        mensagem: ""
      }
    },

    methods: {
        async buscarMatriculas() {

          try {
            const response = await fetch("http://localhost:3000/matricula")
            const data = await response.json()
            this.matriculas = data

          } catch (error) {
            console.error("Erro ao buscar matrículas", error)
          }

        },
        async excluirMatricula(id) {
          try {

            await fetch(`http://localhost:3000/matricula/${id}`, {
              method: "DELETE"
            })

            this.mensagem = "Matrícula excluída com sucesso!"

            this.buscarMatriculas()

            setTimeout(() => {
              this.mensagem = ""
            }, 3000)

          } catch (error) {

            this.mensagem = "Erro ao excluir matrícula"

            console.error("Erro ao excluir matrícula", error)

          }
        }
    },
    mounted() {
    this.buscarMatriculas()
  }
  }

</script>

<style scoped>

  .tabela-container {
    position: relative;
  }

  /* ----------------- Toast mensagem ------------------*/

  .toast-message {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 999;
    max-width: 320px;
    animation: aparecer 0.3s ease;
  }

  @media (max-width: 768px) {
    .toast-message {
      right: 15px;
      left: 15px;
      bottom: 20px;
      max-width: none;
    }
  }

  @keyframes aparecer {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ---------------------------------------------------- */

  .tabela-container{
    width:100%;
    padding:40px 30px;
    box-sizing:border-box;
    background:#f7f9fc;
  }

  .titulo{
    font-size:26px;
    font-weight:600;
    color:#1f2937;
    margin-bottom:25px;
  }

  .tabela-wrapper{
    width:100%;
    overflow-x:auto;
  }

  .tabela{
    width:100%;
    border-collapse:separate;
    border-spacing:0;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 8px 25px rgba(0,0,0,0.06);
    min-width:600px;
  }

  /* ------------------------- HEADER ----------------------- */

  .tabela thead{
    background:linear-gradient(135deg,#4f46e5,#6366f1);
    color:white;
  }

  .tabela th{
    padding:16px;
    text-align:left;
    font-weight:600;
    font-size:14px;
    letter-spacing:0.4px;
  }

  /* ----------------------- BODY ----------------------- */

  .tabela td{
    padding:16px;
    font-size:14px;
    color:#374151;
    border-bottom:1px solid #f1f1f1;
  }

  .tabela tbody tr{
    transition:all 0.2s ease;
  }

  .tabela tbody tr:hover{
    background:#f5f7ff;
    transform:scale(1.002);
  }

  .acoes{
    text-align:center;
  }

  .acoes{
    display:flex;
    justify-content:center;
    gap:10px;
    flex-wrap:wrap;
  }

  .btn-excluir{
    background:#ef4444;
    border:none;
    color:white;
    padding:8px 16px;
    border-radius:6px;
    font-size:13px;
    font-weight:500;
    cursor:pointer;
    transition:all 0.2s ease;
  }

  .btn-excluir:hover{
    background:#dc2626;
    transform:translateY(-1px);
    box-shadow:0 4px 10px rgba(220,38,38,0.3);
  }

  .btn-excluir:active{
    transform:scale(0.96);
  }

  .vazio{
    text-align:center;
    padding:25px;
    color:#9ca3af;
    font-style:italic;
  }

  /* ------------------------ RESPONSIVIDADE ---------------------- */

  @media (max-width:900px){
    .tabela-container{
      padding:25px 15px;
    }
    .titulo{
      font-size:22px;
    }
    .tabela th,
    .tabela td{
      padding:14px;
      font-size:13px;
    }
  }

  @media (max-width:600px){
    .tabela{
      min-width:520px;
    }
  }

  @media (max-width:450px){
    .titulo{
      font-size:20px;
    }
  }

</style>