<template>
  <div class="tooltip_item"
       @click="handleAction(id)"
       @mouseover="mouseHandle()"
       @mouseleave="mouseHandle()">
    <img :src="src" :alt="type" class="icon">
    <div v-show="show" :key="show" :class="{ ...className }">{{ tooltipText }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Tooltip',
    props: {
      src: String,
      tooltipText: String,
      type: String,
      id: Number
    },
    data: () => ({
      show: false
    }),
    computed: {
      className () {
        return this.type === 'edit'
            ? {tooltip: true, edit: true}
            : {tooltip: true, delete: true};
      }
    },
    methods: {
      handleAction (id) {
        this.$emit('action', id);
      },
      mouseHandle () {
        this.show = !this.show;
      }
    }
  }
</script>

<style scoped>
  .icon {
    width: 15px;
    padding: 3px;
    cursor: pointer;
  }
  .tooltip_item {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 7px;
  }
  .tooltip {
    position: absolute;
    font-size: 12px;
    background: #4a4a4a;
    color: #e3e3e3;
    padding: 3px 5px;
    z-index: 10;
  }
  .edit {
    top: -26px;
    right: -30px;
  }
  .delete {
    top: -26px;
    right: -16px;
  }
  .tooltip:after {
    position: absolute;
    display: block;
    content: '';
    width: 10px;
    height: 10px;
    background: #4a4a4a;
    transform: rotate(45deg);
    z-index: -1;
  }
  .edit:after {
    top: 15px;
    left: 48px;
  }
  .delete:after {
    top: 15px;
    left: 25px;
  }
</style>