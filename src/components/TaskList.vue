<template id="app">
  <div class="ts-taskList">
    <div class="container">
      <div class="ts-addInput">
        <div class="ts-content">+ Add Task</div>
      </div>
      <div v-for="task in tasks" v-bind:key="task.id">
        <ToDoList
          :task="task"
          @updateData="getTasksData">
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
      completeTasks: [],
      stageSelectedTitle: '',
    };
  },
  created() {
    this.getTasksData();
    this.updateStageListener();
    this.getStageSelectedTitle();
  },
  methods: {
    getTasksData() {
      const vm = this;
      const api = 'http://localhost:3000/tasks';
      vm.$http.get(api).then((response) => {
        this.completeTasks = response.data;
        this.filterTasks();
      });
    },
    updateStageListener() {
      this.$eventHub.$on('update-stage', (stageSelectedTitle) => {
        this.stageSelectedTitle = stageSelectedTitle;
        this.filterTasks();
      });
    },
    getStageSelectedTitle() {
      this.$eventHub.$emit('get-stage');
    },
    filterTasks() {
      if (this.stageSelectedTitle === 'In Progress') {
        this.tasks = this._.filter(this.completeTasks, { isComplete: false });
      } else if (this.stageSelectedTitle === 'Completed') {
        this.tasks = this._.filter(this.completeTasks, { isComplete: true });
      } else if (this.stageSelectedTitle === 'My Tasks') {
        this.tasks = this.completeTasks;
      }
    },
  },
};
</script>
