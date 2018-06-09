<template id="app">
    <header class="ts-navbar">
        <div class="container h-100">
            <div class="row h-100">
                <div  v-for="(stage, key, index)  in stages"
                      class="col ts-navbar-item h-100"
                      v-bind:key="index"
                      :class="{active: stageSelected === key}"
                      @click="updateStage(key)">
                    <div class="title">{{stage.title}}</div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      stageSelected: 0,
      stages: [
        {
          title: 'My Tasks',
        },
        {
          title: 'In Progress',
        },
        {
          title: 'Completed',
        },
      ],
    };
  },
  methods: {
    updateStage(index) {
      this.stageSelected = index;
      this.$eventHub.$emit('update-stage', this.stages[this.stageSelected].title);
    },
    getStageTitleListener() {
      this.$eventHub.$on('get-stage', () => {
        this.$eventHub.$emit('update-stage', this.stages[this.stageSelected].title);
      });
    },
  },
  created() {
    this.getStageTitleListener();
  },
};
</script>
