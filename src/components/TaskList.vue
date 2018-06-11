<template id="app">
  <div class="ts-taskList">
    <div class="container">
      <AddToDo @updateData="getTasksData"></AddToDo>
      <draggable v-model="tasks" @end="updateOrder" :options="{handle: '.handle'}">
        <div v-for="task in tasks" v-bind:key="task.id">
          <ToDoList
            :task="task"
            :stageSelectedTitle="stageSelectedTitle"
            @updateData="getTasksData">
          </ToDoList>
        </div>
      </draggable>
      <div class="taskCount">{{tasks.length}} tasks left</div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import ToDoList from '@/components/ToDoList';
import AddToDo from '@/components/AddToDo';
import draggable from 'vuedraggable';

export default {
  name: 'app',
  components: {
    FontAwesomeIcon,
    ToDoList,
    draggable,
    AddToDo,
  },
  data() {
    return {
      tasks: [],
      sort: [],
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
      const dataApi = '/api/tasks';
      const orderApi = '/api/order';
      let templateTask = {};
      vm.$http.get(dataApi).then((response) => {
        vm.completeTasks = response.data;
      }).then(() => {
        vm.$http.get(orderApi).then((response) => {
          vm.sort = response.data.sort;
          templateTask = vm.OrderTasks(vm.sort, vm.completeTasks);
          vm.tasks = this.filterTasks(templateTask);
        });
      });
    },
    updateStageListener() {
      const vm = this;
      let templateTask = {};
      vm.$eventHub.$on('update-stage', (stageSelectedTitle) => {
        vm.stageSelectedTitle = stageSelectedTitle;
        templateTask = vm.OrderTasks(vm.sort, vm.completeTasks);
        vm.tasks = this.filterTasks(templateTask);
      });
    },
    getStageSelectedTitle() {
      this.$eventHub.$emit('get-stage');
    },
    filterTasks(tasks) {
      let filterTasks;
      if (this.stageSelectedTitle === 'In Progress') {
        filterTasks = this._.filter(tasks, { isComplete: false });
      } else if (this.stageSelectedTitle === 'Completed') {
        filterTasks = this._.filter(tasks, { isComplete: true });
      } else if (this.stageSelectedTitle === 'My Tasks') {
        filterTasks = tasks;
      }

      return filterTasks;
    },
    OrderTasks(order, templateTask) {
      const orderTask = [];
      this._.forEach(order, (id) => {
        orderTask.push(this._.filter(templateTask, { id })[0]);
      });

      return orderTask;
    },
    updateOrder() {
      const sort = this.tasks.map(task => task.id);
      const vm = this;
      const api = '/api/order';
      this.sort = sort;
      vm.$http.post(api, { id: 1, sort });
      this.completeTasks = this.tasks;
    },
  },
};
</script>

<style>
</style>
