<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    font-family: 'Noto Sans', sans-serif;
  }

  body {
    padding: 0;
    margin: 0;
  }

  input:focus, textarea:focus, select:focus, button:focus{
    outline: none;
  }

  #app {
    /*height: 100%;*/
    /*width: 100%;*/
    min-height: 100vh;
    padding: 4rem;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }
</style>