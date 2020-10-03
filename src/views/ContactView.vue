<template>
  <div class="contact_view_wrapper">
    <div style="display: flex; align-items: center; margin-bottom: 20px">
      <h2 class="title">Edit contact</h2>
      <div style="display: flex; align-items: center;">
        <button @click="$router.push('/')" class="button primary">
          <img class="arrow" src="@/static/next.svg" alt="">
          <p>К списку контактов</p>
        </button>
      </div>
    </div>
    <div
        v-for="(field,i) in contactFields"
        :key="i"
        class="contact_view_inner"
    >
      <div class="inputs_wrapper">
        <div class="input_outer">
          <label class="label">Название</label>
          <input v-model="field.key" type="text" class="input">
        </div>
        <div class="input_outer">
          <label class="label">Значение</label>
          <input v-model="field.value" type="text" class="input">
        </div>
      </div>
      <div>
        <Tooltip
            :id="i"
            @action="handleModal"
            :src="require('@/static/delete.svg')"
            tooltipText="Удалить"
            type="delete"
        />
      </div>
    </div>
    <div v-if="validateMessage" class="validate_message">
      {{ validateMessage }}
    </div>
    <div class="button_wrapper">
      <button @click="handleCreate" class="button add">
        + Добавить поле
      </button>
    </div>
    <div class="b_wrap">
      <div>
        <button @click="handleSave" class="button add">
          Сохранить измения
        </button>
      </div>
      <div>
        <button @click="handleCancel" class="button warning">
          Отмена
        </button>
      </div>
    </div>
    <Modal
        v-if="modal"
        :delete="isDelete"
        :text="modalMessage"
        @action="handleDelete"
    />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import Tooltip from "@/components/common/Tooltip";
  import Modal from "@/components/common/Modal";

  export default {
    name: 'ContactView',
    components: {
      Tooltip, Modal
    },
    data: () => ({
      modal: false,
      modalMessage: '',
      contactFields: [],
      prevFieldsState: [],
      contact: null,
      tempDeleteIndex: null,
      isDelete: false,
      validateMessage: ''
    }),
    mounted() {
      const { id } = this.$route.params;
      this.contact = this.getContacts.find(user => user.id === +id);
      this.formatData();
    },
    computed: { ...mapGetters(['getContacts']) },
    watch:{
      computedModel: {
        deep: true,
        handler (val, old) {
          console.log(val, old)
        }
      }
    },
    methods: {
      ...mapMutations(['updateUser']),
      handleCreate () {
        this.contactFields.push({
          key: '',
          value: ''
        })
      },
      handleDelete (status, isDelete) {
        if (status && isDelete) {
          this.contactFields.splice(this.tempDeleteIndex,1)
          this.tempDeleteIndex = null;
        } else if (status && !isDelete) {
          this.formatData();
        }
        this.modal = false;
      },
      handleModal (index) {
        this.tempDeleteIndex = index;
        this.modalMessage = 'Вы подтверждаете действие?';
        this.modal = this.isDelete = true;
      },
      handleSave () {
        if (!this.validateInputs()) {
          this.validateMessage = 'Все поля должны быть заполнены';
          return;
        }
        if (!this.validateSameArgs()) {
          this.validateMessage = 'Поля названий не могут повторяться';
          return;
        }
        const data = {};
        this.contactFields.forEach(el => {
          data[el.key] = el.value;
        })
        data.id = +this.$route.params.id;
        this.updateUser(data);
        this.$router.push('/');
      },
      handleCancel () {
        this.modalMessage = 'Отменить все изменения?';
        this.isDelete = false;
        this.modal = true;
      },
      formatData () {
        const arr = [];
        for (let key in this.contact) {
          if (key === 'id') continue;
          arr.push({ key, value: this.contact[key] });
        }
        this.contactFields = [...arr];
      },
      validateInputs () {
        const filtered = this.contactFields.filter(el => el.key && el.value).length;
        return this.contactFields.length === filtered;
      },
      validateSameArgs () {
        const args = this.contactFields.map(el => el.key);
        return [...new Set(args)].length === args.length;
      }
    }
  }
</script>

<style scoped>
  .contact_view_wrapper {
    margin: 60px 15px 0;
  }
  .contact_view_inner {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    margin-bottom: 10px;
  }
  .title {
    margin-right: 20px;
  }
  .arrow {
    height: 14px;
    margin-right: 5px;
    transform: rotate(180deg);
  }
  .inputs_wrapper {
    display: flex;
    align-items: center;
  }
  .input_outer {
    display: flex;
    flex-direction: column;
  }
  .input_outer {
    margin-right: 10px;
  }
  .input {
    padding: 5px;
    border-radius: 10px;
    outline: none;
    border: none;
  }
  .label {
    font-size: 13px;
  }
  .tooltip_item {
    margin-top: 15px;
  }
  .b_wrap {
    display: flex;
    margin-top: 40px;
  }
  .button_wrapper {
    margin-top: 20px;
  }
  .add {
    margin-right: 10px;
  }
  .primary {
    display: flex;
  }
  .validate_message {
    width: fit-content;
    background: darkorange;
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 20px;
  }
  /* === Media === */
  @media screen and (max-width: 420px) {
    .contact_view_inner {
      margin-top: 20px;
    }
    .inputs_wrapper {
      flex-wrap: wrap;
      max-width: 180px;
    }
  }
</style>