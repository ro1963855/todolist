<template>
  <div id="mainly">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'mainly',
  components: {
    Navbar,
  },
};
</script>

<style>
  html,
  body,
  #mainly {
    min-height: 100vh;
  }

</style>

