<template>
  <div class="contact">
    <h2 class="title">Контакты</h2>
    <div v-if="!contacts.length" class="warning_message">
      <p>Контактов пока нет.</p>
    </div>
    <div v-else class="contact_wrapper">
      <div v-for="(u,i) in contacts" :key="u.id" :class="{contact_info: true, bg_color: i%2}">
        <p>{{u.name || 'Имя не задано'}}</p>
        <div class="actions">
          <Tooltip
              :id="u.id"
              @action="handleEdit"
              :src="require('@/static/pencil.svg')"
              tooltipText="Редактировать"
              type="edit"
          />
          <Tooltip
              :id="u.id"
              @action="handleModal"
              :src="require('@/static/delete.svg')"
              tooltipText="Удалить"
              type="delete"
          />
        </div>
      </div>
    </div>
    <div class="button_wrapper">
      <button @click="handleCreate" class="button add">
        + Добавить контакт
      </button>
    </div>
    <Modal
        v-if="modal"
        :text="modalMessage"
        @action="handleDelete"
    />
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  import Tooltip from "@/components/common/Tooltip";
  import Modal from "@/components/common/Modal";

  export default {
    name: 'Contacts',
    components: { Modal, Tooltip },
    data: () => ({
      isEdit: false,
      isDelete: false,
      modal: false,
      modalMessage: '',
      tempDeleteId: null
    }),
    computed: { ...mapGetters({
        contacts: 'getContacts',
        id: 'getGeneralId'
    }) },
    methods: {
      ...mapMutations(['createContact', 'removeContact', 'setGeneralId']),
      handleCreate () {
        const user = {
          id: this.id,
          name: `Контакт №${this.id}`
        }
        this.createContact(user);
        this.setGeneralId(this.id + 1);
      },
      handleEdit (id) {
        this.$router.push(`/view/${id}`)
      },
      handleDelete (status) {
        if (status) {
          this.removeContact(this.tempDeleteId);
          this.tempDeleteId = null;
        }
        this.modal = false;
      },
      handleModal (id) {
        const user = this.contacts.find(u => u.id === id);
        this.modalMessage = `Вы подтверждаете удаление контакта ${user.name || ''}?`
        this.tempDeleteId = id;
        this.modal = true;
      }
    }
  }
</script>

<style scoped>
  /* === General style === */
  p {
    margin: 0;
  }
  /* === Indo style === */
  .title {
    margin-bottom: 10px;
  }
  .contact {
    margin: 60px 15px 0;
  }
  .contact_wrapper {
    max-width: 500px;
  }
  .contact_info {
    display: flex;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #e6e8eb;
  }
  .bg_color {
    background: #f2f7ff;
  }
  .actions {
    display: flex;
  }
  /* === Warning message === */
  .warning_message {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    height: 25px;
    background: darkorange;
    color: #2c3e50;
    border-radius: 10px;
    padding: 10px 20px;
    margin-bottom: 10px;
  }
  /* === Button === */
  .button_wrapper {
    margin-top: 20px;
  }
</style>