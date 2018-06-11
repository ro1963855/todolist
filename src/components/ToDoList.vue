<template id="app">
  <div class="ts-card">
    <div class="ts-card-header" :class="{important: taskTemplate.isImportant}">
      <div class="ts-description row">
        <div class="handle" v-if="stageSelectedTitle == 'My Tasks'">
          <font-awesome-icon :icon="['fas', 'ellipsis-v']"/>
        </div>
        <div class="ts-descriptionTitle w-100">
          <b-form-checkbox class="ts-ckbox"
                            v-model="task.isComplete"
                            @input="updateComplete"></b-form-checkbox>
          <b-form-input v-model="task.description"
                        type="text"
                        class="ts-descrption-input"
                        :class="{'ts-task-complete': task.isComplete}"
                        @change="saveTitle"
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
        <div class="ts-simpleContent w-100 row"
              :class="{important: taskTemplate.isImportant}"
              v-if="isShowSimpleContent">
          <div class="ts-simpleContent-body"
                v-if="task.deadline.date != '' && task.deadline.date != null">
            <font-awesome-icon :icon="['far', 'calendar-alt']"
                                class="ts-simpleContent-icon ts-simpleContent-calendar"/>
            <span class="ts-simpleContent-deadlineDate">
              {{getReminderDate(task.deadline.date)}}
            </span>
          </div>
          <div class="ts-simpleContent-body" v-if="task.file.name != ''">
            <font-awesome-icon :icon="['far', 'file']" class="ts-simpleContent-icon"/>
          </div>
          <div class="ts-simpleContent-body" v-if="task.comment != ''">
            <font-awesome-icon :icon="['far', 'comment-dots']" class="ts-simpleContent-icon"/>
          </div>
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
                            placeholder="yyyy/mm/dd"
                            :config="dataPicker.dateOptions"></date-picker>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <date-picker class="ts-deadline-input"
                            v-model="taskTemplate.deadline.time"
                            placeholder="hh:mm"
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
  props: ['task', 'stageSelectedTitle'],
  components: {
    FontAwesomeIcon,
    datePicker,
  },
  data() {
    return {
      taskTemplate: {},
      isEdit: false,
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
    saveTitle() {
      this.taskTemplate.description = this.task.description;
      this.updateTask(this.task);
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
      const api = `/api/tasks/${task.id}`;
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
    getReminderDate(date) {
      let result;
      const deadlineDate = new Date(date);
      const deadlineYear = moment(deadlineDate.toISOString(), 'YYYY/MM/DD').year();
      const todayYear = moment().year();
      if (deadlineYear !== todayYear) {
        result = moment(date).format('YYYY/MM/DD');
      } else {
        result = moment(date).format('MM/DD');
      }
      return result;
    },
  },
  computed: {
    isShowSimpleContent() {
      return (this.task.deadline.date !== '') ||
              (this.task.file.name !== '') ||
              (this.task.comment !== '');
    },
  },
  created() {
    this.taskTemplate = this._.cloneDeep(this.task);
  },
};
</script>
