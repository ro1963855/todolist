<template id="app">
  <div class="ts-taskList">
    <div class="container">
      <div class="ts-addInput">
        <div class="ts-content">+ Add Task</div>
      </div>
      <div v-for="task in tasks" v-bind:key="task.id">
        <ToDoList
          :task="task"
          @updateData="getTasksData"
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
      tasks: [],
    };
  },
  created() {
    this.getTasksData();
  },
  methods: {
    getTasksData() {
      const vm = this;
      const api = 'http://localhost:3000/tasks';
      vm.$http.get(api).then((response) => {
        this.tasks = response.data;
      });
    },
  },
};
</script>
