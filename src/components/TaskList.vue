<template id="app">
  <div class="ts-taskList">
    <div class="container">
      <div class="ts-addInput">
        <div class="ts-content">+ Add Task</div>
      </div>
      <div v-for="task in tasks" v-bind:key="task.id">
        <ToDoList
          :task="task"
        >
        </ToDoList>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import ToDoList from '@/components/ToDoList';

export default {
  name: 'app',
  components: {
    FontAwesomeIcon,
    ToDoList,
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
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
          id: 2,
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
