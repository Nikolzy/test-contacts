<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  *, *::after, *::before {
    margin: 0;
  }
  body {
    margin: 0 0 30px;
    padding: 0;
    background: grey;
    overflow-x: hidden;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  /* === Button style === */
  .button_wrapper {
    width: fit-content;
  }
  .button {
    padding: 7px 15px;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all .2s linear;
  }
  .add {
    background: #6fc957;
  }
  .warning {
    background: #ff8a30;
  }
  .primary {
    background: #2b59ff;
  }
  .add:hover {
    background: #42ed5f;
  }
  .warning:hover {
    background: #ff7912;
  }
  .primary:hover {
    background: #0037ff;
  }
</style>
