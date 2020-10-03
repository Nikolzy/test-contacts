<template>
  <div class="modal">
    <div class="modal_inner">
      <div class="modal_title">{{ text }}</div>
      <div class="modal_actions">
        <button class="action_text success" @click="handleSuccess">Да</button>
        <button class="action_text reject" @click="handleReject">Нет</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      text: String,
      delete: Boolean
    },
    methods: {
      handleSuccess () { this.$emit('action', true, this.delete) },
      handleReject () { this.$emit('action', false, this.delete) }
    }
  }
</script>

<style scoped>
 .modal {
   width: 100vw;
   height: 100vh;
   position: absolute;
   display: flex;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(157, 148, 148, 0.6);
 }
 .modal_inner {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   max-width: 400px;
   min-width: 320px;
   height: 100px;
   box-shadow: 0px 0px 24px 2px rgba(0,0,0,0.55);
   border-radius: 10px;
   background: #e3e3e3;
   padding: 15px;
   margin: auto;
 }
 .modal_title {
   font-weight: bold;
 }
 .modal_actions {
   display: flex;
   justify-content: flex-end;
 }
 .action_text {
   cursor: pointer;
   outline: none;
   border: none;
   padding: 7px 15px;
   border-radius: 10px;
   background: transparent;
   transition: all .1s linear;
 }
 .action_text:first-of-type {
   margin-right: 10px;
 }
 .action_text:hover {
   background: rgba(168, 168, 168, 0.4);
 }
 .success {
   color: green;
 }
 .reject {
   color: orangered;
 }
 /* === Media === */
 @media screen and (max-width: 420px) {
   .modal_inner {
     min-width: 235px;
   }
 }
</style>