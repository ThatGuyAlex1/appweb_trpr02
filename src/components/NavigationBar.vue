<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink class="nav-link text-white" id="home" to="/">Accueil</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link text-white" id="score" :to="{ name: 'Score' }">Classement</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>