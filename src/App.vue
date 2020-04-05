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

  #app {
    /*height: 100%;*/
    /*width: 100%;*/
    min-height: 100vh;
    padding: 4rem;
  }
</style>