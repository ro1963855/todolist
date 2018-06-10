<template>
  <div class="app">
      <div class="ts-addInput"
            v-if="!isEdit"
            @click="isEdit = !isEdit">
        <div class="ts-content">+ Add Task</div>
      </div>
      <div class="ts-card" v-if="isEdit">
        <div class="ts-card-header" :class="{important: taskTemplate.isImportant}">
          <div class="ts-description row">
            <div class="ts-descriptionTitle w-100">
              <b-form-checkbox class="ts-ckbox"
                                v-model="taskTemplate.isComplete"></b-form-checkbox>
              <b-form-input v-model="taskTemplate.description"
                            type="text"
                            class="ts-descrption-input"
                            :class="{'ts-task-complete': taskTemplate.isComplete}"
                            placeholder="Type Something Here…"></b-form-input>
              <div class="ts-icon" style="margin-left:auto;">
                <font-awesome-icon :icon="['fas', 'star']"
                                    class="ts-icon-star"
                                    :class="{active: taskTemplate.isImportant}"
                                    @click="taskTemplate.isImportant = !taskTemplate.isImportant"/>
              </div>
              <div class="ts-icon">
                <font-awesome-icon :icon="['fas', 'pencil-alt']"
                                    class="ts-icon-pencil"
                                    :class="{active: isEdit}"
                                    @click="cancelTask"/>
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
                  <span class="ts-action-word">Add Task</span>
                </div>
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
  components: {
    FontAwesomeIcon,
    datePicker,
  },
  data() {
    return {
      taskTemplate: {},
      originTask: {
        description: '',
        isImportant: false,
        deadline: {
          date: '',
          time: '',
        },
        file: {
          name: '',
          time: '',
        },
        comment: '',
        isComplete: false,
      },
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
      const dataApi = 'http://localhost:3000/tasks';
      const orderApi = 'http://localhost:3000/order';
      let newId = 0;
      let sort = [];
      vm.$http.post(dataApi, vm.taskTemplate).then((response) => {
        newId = response.data.id;
        return vm.$http.get(orderApi);
      }).then((response) => {
        sort = response.data.sort;
        sort.push(newId);
        vm.$http.post(orderApi, { id: 1, sort });
        vm.$emit('updateData');
        vm.taskTemplate = vm._.cloneDeep(vm.originTask);
        vm.isEdit = !this.isEdit;
      });
    },
    cancelTask() {
      if (this.isEdit) {
        this.taskTemplate = this._.cloneDeep(this.originTask);
      }

      this.isEdit = !this.isEdit;
    },
  },
  created() {
    this.taskTemplate = this._.cloneDeep(this.originTask);
  },
};
</script>
