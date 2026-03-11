<template>
  <nav class="navbar">

    <router-link id="logo-url" to="/">
      <img id="logo" :src="logo" :alt="alt">
      <span class="logo-text">Cursos Online</span>
    </router-link>

    <div class="links">
      <router-link to="/">Matrícula</router-link>
      <router-link to="/alunos">Inscrições</router-link>
    </div>

  </nav>
</template>

<script>
export default{
    name: "NavBar",
    props: ["logo", "alt"]
}
</script>

<style scoped>

.navbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 30px;

  background: linear-gradient(135deg,#4da3ff,#6ec1ff);
  box-shadow:0 3px 10px rgba(0,0,0,0.15);
}

/* LOGO */

#logo-url{
  display:flex;
  align-items:center;
  gap:10px;
  text-decoration:none;
}

#logo{
  width:40px;
  height:40px;
}

.logo-text{
  font-weight:bold;
  color:white;
  font-size:18px;
}

/* LINKS */

.links{
  display:flex;
  gap:25px;
}

.links a{
  color:white;
  text-decoration:none;
  font-weight:600;
  position:relative;
  padding:5px;
  transition:0.3s;
}

/* hover animation */

.links a::after{
  content:"";
  position:absolute;
  left:0;
  bottom:-3px;
  width:0%;
  height:2px;
  background:white;
  transition:0.3s;
}

.links a:hover::after{
  width:100%;
}

/* active route */

.links a.router-link-active{
  color:#003f7a;
  font-weight:700;
}

/* RESPONSIVO */

@media (max-width:768px){

  .navbar{
    flex-direction:column;
    gap:15px;
  }

  .links{
    gap:15px;
  }

  .logo-text{
    font-size:16px;
  }

}

</style>