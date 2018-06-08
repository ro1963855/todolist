<template id="app">
  <div class="ts-card">
    <div class="ts-description row">
      <div class="ts-descriptionTitle w-100" :class="{important: taskTemplate.isImportant}">
        <b-form-checkbox class="ts-ckbox"
                          v-model="task.isComplete"
                          @input="updateComplete"></b-form-checkbox>
        <b-form-input v-model="taskTemplate.description"
                      type="text"
                      class="ts-descrption-input"
                      :class="{'ts-task-complete': task.isComplete}"
                      placeholder="Type Something Here…"></b-form-input>
        <div class="ts-icon" style="margin-left:auto;">
          <font-awesome-icon :icon="['fas', 'star']"
                              class="ts-icon-star"
                              :class="{active: taskTemplate.isImportant}"
                              @click="updateStar"/>
        </div>
        <div class="ts-icon">
          <font-awesome-icon :icon="['fas', 'pencil-alt']"
                              class="ts-icon-pencil"
                              :class="{active: isEdit}"
                              @click="cancelTask"/>
        </div>
      </div>
    </div>
    <div class="ts-edit" v-show="isEdit">
      <div class="ts-edit-section">
        <div class="ts-edit-title">
          <font-awesome-icon :icon="['far', 'calendar-alt']" class="ts-edit-icon"/>
          <span class="ts-edit-description">Deadline</span>
        </div>
        <div class="ts-edit-editor row">
          <div class="row">
            <div class="col-md-12">
              <date-picker class="ts-deadline-input"
                            v-model="taskTemplate.deadline.date"
                            :config="dataPicker.dateOptions"></date-picker>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <date-picker class="ts-deadline-input"
                            v-model="taskTemplate.deadline.time"
                            :config="dataPicker.timeOptions"></date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="ts-edit-section">
        <div class="ts-edit-title">
          <font-awesome-icon :icon="['far', 'file']" class="ts-edit-icon"/>
          <span class="ts-edit-description">File</span>
        </div>
        <div class="ts-edit-editor row d-flex align-items-center">
          <div class="ts-upload-info" v-show="taskTemplate.file.name != ''">
            <span class="ts-upload-name">{{taskTemplate.file.name}}</span>
            <span class="ts-upload-time">{{taskTemplate.file.time}}</span>
          </div>
          <i class="fas fa-plus-square ts-upload-icon" @click="triggerUploadBtn"></i>
          <input class="d-none" type="file" ref="tsUploadBtn" @change="updateUploadInfomation">
        </div>
      </div>
      <div class="ts-edit-section">
        <div class="ts-edit-title">
          <font-awesome-icon :icon="['far', 'comment-dots']" class="ts-edit-icon"/>
          <span class="ts-edit-description">Comment</span>
        </div>
        <div class="ts-edit-editor row">
          <b-form-textarea v-model="taskTemplate.comment"
                          class="ts-comment-textarea"
                          placeholder="Type your memo here…">
          </b-form-textarea>
        </div>
      </div>
      <div class="ts-action-section row mx-0">
          <div class="ts-action-btn lft" @click="cancelTask">
            <div class="ts-action-content">
              <font-awesome-icon :icon="['fas', 'times']" class="ts-action-icon"/>
              <span class="ts-action-word">Cancel</span>
            </div>
          </div>
          <div class="ts-action-btn rgt" @click="saveEdit">
            <div class="ts-action-content">
              <font-awesome-icon :icon="['fas', 'plus']" class="ts-action-icon"/>
              <span class="ts-action-word">Save</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import datePicker from 'vue-bootstrap-datetimepicker';
import moment from 'moment';

export default {
  name: 'app',
  props: ['task'],
  components: {
    FontAwesomeIcon,
    datePicker,
  },
  data() {
    return {
      taskTemplate: {},
      isEdit: true,
      dataPicker: {
        dateOptions: {
          format: 'YYYY/MM/DD',
          useCurrent: false,
          showClear: true,
        },
        timeOptions: {
          format: 'HH:mm',
          useCurrent: false,
          showClear: true,
        },
      },
    };
  },
  methods: {
    triggerUploadBtn() {
      const elem = this.$refs.tsUploadBtn;
      elem.click();
    },
    updateUploadInfomation() {
      this.taskTemplate.file.name = this.$refs.tsUploadBtn.files[0].name;
      this.taskTemplate.file.time = moment().format('YYYY/MM/DD HH:mm:ss');
    },
    saveEdit() {
      const vm = this;
      this.updateTask(this.taskTemplate).then(() => {
        vm.isEdit = false;
      });
    },
    updateComplete() {
      this.taskTemplate.isComplete = this.task.isComplete;
      this.updateTask(this.task);
    },
    updateStar() {
      this.task.isImportant = !this.task.isImportant;
      this.taskTemplate.isImportant = !this.taskTemplate.isImportant;
      this.updateTask(this.task);
    },
    updateTask(task) {
      const vm = this;
      const api = `http://localhost:3000/tasks/${task.id}`;
      return vm.$http.put(api, task).then(() => {
        vm.$emit('updateData');
      });
    },
    cancelTask() {
      if (this.isEdit) {
        this.taskTemplate = this._.cloneDeep(this.task);
      }

      this.isEdit = !this.isEdit;
    },
  },
  created() {
    this.taskTemplate = this._.cloneDeep(this.task);
  },
};
</script>
