<template id="app">
  <div class="ts-taskList">
    <div class="container">
      <div class="ts-addInput">
        <div class="ts-content">+ Add Task</div>
      </div>
      <div v-for="(task, key, index) in tasks" class="ts-card" v-bind:key="index">
        <div class="ts-description row">
          <div class="ts-descriptionTitle w-100" :class="{important: task.isImportant}">
            <b-form-checkbox class="ts-ckbox" v-model="task.isComplete"></b-form-checkbox>
            <b-form-input v-model="task.description"
                          type="text"
                          class="ts-descrption-input"
                          :class="{'ts-task-complete': task.isComplete}"
                          placeholder="Type Something Here…"></b-form-input>
            <div class="ts-icon" style="margin-left:auto;">
              <font-awesome-icon :icon="['fas', 'star']"
                                  class="ts-icon-star"
                                  :class="{active: task.isImportant}"
                                  @click="task.isImportant = !task.isImportant"/>
            </div>
            <div class="ts-icon">
              <font-awesome-icon :icon="['fas', 'pencil-alt']"
                                  class="ts-icon-pencil"
                                  :class="{active: task.isEdit}"
                                  @click="task.isEdit = !task.isEdit"/>
            </div>
          </div>
        </div>
        <div class="ts-edit" v-show="task.isEdit">
          <div class="ts-edit-section">
            <div class="ts-edit-title">
              <font-awesome-icon :icon="['far', 'calendar-alt']" class="ts-edit-icon"/>
              <span class="ts-edit-description">Deadline</span>
            </div>
            <div class="ts-edit-editor row">
              <b-form-input v-model="task.deadline.date"
                        type="text"
                        class="ts-deadline-input"
                        placeholder="yyyy/mm/dd"></b-form-input>
              <b-form-input v-model="task.deadline.time"
                        type="text"
                        class="ts-deadline-input"
                        placeholder="hh:mm"></b-form-input>
            </div>
          </div>
          <div class="ts-edit-section">
            <div class="ts-edit-title">
              <font-awesome-icon :icon="['far', 'file']" class="ts-edit-icon"/>
              <span class="ts-edit-description">File</span>
            </div>
            <div class="ts-edit-editor row d-flex align-items-center">
              <div class="ts-upload-info" v-show="task.file.name != ''">
                <span class="ts-upload-name">{{task.file.name}}</span>
                <span class="ts-upload-time">{{task.file.time}}</span>
              </div>
              <font-awesome-icon :icon="['fas', 'plus-square']" class="ts-upload-icon"/>
            </div>
          </div>
          <div class="ts-edit-section">
            <div class="ts-edit-title">
              <font-awesome-icon :icon="['far', 'comment-dots']" class="ts-edit-icon"/>
              <span class="ts-edit-description">Comment</span>
            </div>
            <div class="ts-edit-editor row">
              <b-form-textarea v-model="task.comment"
                              class="ts-comment-textarea"
                              placeholder="Type your memo here…">
              </b-form-textarea>
            </div>
          </div>
          <div class="ts-action-section row mx-0">
              <div class="ts-action-btn lft">
                <div class="ts-action-content">
                  <font-awesome-icon :icon="['fas', 'times']" class="ts-action-icon"/>
                  <span class="ts-action-word">Cancel</span>
                </div>
              </div>
              <div class="ts-action-btn rgt">
                <div class="ts-action-content">
                  <font-awesome-icon :icon="['fas', 'plus']" class="ts-action-icon"/>
                  <span class="ts-action-word">Save</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  name: 'app',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      tasks: [
        {
          description: 'Cloud project with Dannie',
          isImportant: false,
          isEdit: false,
          deadline: {
            date: '2118/5/14',
            time: '11:00',
          },
          file: {
            name: '20180514.zip',
            time: '2018/06/07 11:21:30',
          },
          comment: 'meet him at Lorence Cafe',
          isComplete: true,
        },
        {
          description: '',
          isImportant: false,
          isEdit: false,
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
      ],
    };
  },
};
</script>
