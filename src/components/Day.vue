<template>
  <div class="day_container">
    <draggable v-model="day" group="day" @start="drag = true" @end="drag = false" class="block container">
      <div v-for="(value, key) in day" :key="key" class="box chain__item">
        <div>{{ value.shit }}</div>
      </div>
    </draggable>
    <div class="block new_set_container" v-bind:class="{ 'is-active': this.isAddSet }">
      <p>Input a title and pick the time for a new set</p>
      <div class="new_set">
        <input class="input" type="text" v-model="newSet.title"/>
        <Vue-timepicker
          class="time_picker"
          v-model="timeValue"
          format="HH:mm:ss"
          :blur-delay="500"
          @input="inputHandler"
          debug-mode
        />
        <button class="button is-success" type="text" @click="createSet">add set</button>
        <button role="button" type="button" class="delete" @click="toggleAddSet"></button>
      </div>
    </div>
    <div class="block">
      <button class="add_daily button" @click="toggleAddSet">
        <font-awesome-icon icon="plus" :style="{ color: 'coral', opacity: 0.5 }" />
      </button>
    </div>
    <draggable v-model="exercises" group="exercises" @start="drag = true" @end="drag = false" class="block container">
      <div v-for="(value, key) in exercises" :key="key" class="box chain__item">
        <div>{{ value }}</div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import VueTimepicker from 'vue2-timepicker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add([faPlus]);

export default {
  name: 'Day',
  props: {
    day: Array,
    exercises: Array,
  },
  components: {
    draggable,
    VueTimepicker,
  },
  data: function() {
    return {
      timeValue: {
        HH: '17',
        mm: '00',
        ss: '00',
      },
      isAddSet: false,
      newSet: {
        title: null,
        time: null,
      },
    };
  },
  mounted: function() {
    console.log(this.day);
    console.log(this.exercises);
  },
  methods: {
    inputHandler(data) {
      console.log(data);
    },
    toggleAddSet() {
      this.isAddSet = !this.isAddSet;
    },
    createSet(){
      console.log(this.newSet.title);
      this.day.push({ title: this.newSet.title, time: this.timeValue});
      console.log(this.day);
    },
  },
};
</script>

<style scoped lang="scss">
@import 'src/styles/components/day.scss';
@import '~vue2-timepicker/dist/VueTimepicker.css';
</style>
