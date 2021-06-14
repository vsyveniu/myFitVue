<template>
  <div class="day_container">
    <draggable
      v-model="day.workouts"
      group="day"
      @change="reorderSets"
      @start="drag = true"
      @end="drag = false"
      class="block container drug_dealer"
    >
      <div v-for="(value, key) in day.workouts" :key="key" class="box chain__item">
        <div>{{ value.title }}</div>
        <div>{{ value.time }}</div>
        <draggable v-model="day.workouts.value" @change="tradeExercises" group="value.title" class="drug_box">
          <div class="box" v-for="(val, key) in value.set" :key="key">
            <div>{{ val.meta.title }}</div>
            <div>{{ val.time }}</div>
            <Exercise />
          </div>
        </draggable>
        <div class="add_exercise box">
          <form @submit.prevent="createExercise($event, value.set)">
            <label>Title</label>
            <input class="input" type="text" id="title" name="title" />
            <label>Description</label>
            <input class="input" type="text" name="description" />
            <div class="field">
              <select class="select">
                <option v-for="i in 42" :key="i"> {{ i }}</option>
              </select>
            </div>
            <label>Rest after rep</label>
            <input class="input" type="text" name="description" />
            <label>type</label>
            <select>
              <option value="power">power</option>
              <option value="aero">aero</option>
              <option value="static">static</option>
            </select>

            <div class="block">
              <button type="submit" class="button is-success">
                add exercise
              </button>
            </div>
          </form>
        </div>
        <button class="add_daily button" @click="toggleAddExercise($event)">
          <font-awesome-icon icon="plus" :style="{ color: 'coral', opacity: 0.5 }" />
        </button>
      </div>
    </draggable>
    <div class="block new_set_container" v-bind:class="{ 'is-active': this.isAddSet }">
      <p>Input a title and pick the time for a new set</p>
      <div class="new_set">
        <input class="input" type="text" v-model="newSet.title" />
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
    day: Object,
    exercises: Array,
  },
  components: {
    draggable,
    VueTimepicker,
    Exercise: () => import('@/components/Exercise'),
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
      newEx: [
        {
          reps: 0,
          rest: false,
          meta: {
            description: false,
            title: false,
          },
        },
      ],
      newIndex: 0,
    };
  },
  mounted: function() {

  },
  methods: {
    inputHandler(data) {
      console.log(data);
    },
    toggleAddSet() {
      this.isAddSet = !this.isAddSet;
    },
    toggleAddExercise(event) {
      event.target.closest('button').previousSibling.classList.toggle('is-active');
    },
    createSet() {
      this.day.workouts.push({ title: this.newSet.title, time: this.timeValue, set: [{}] });
    },
    reorderSets() {
      console.log(this.day);
    },
    createExercise(event, workout) {

      workout.push({
        meta: { title: event.target.elements.title.value, description: event.target.elements.description.value },
      });
      this.newIndex += 1;
    },
    tradeExercises() {},
  },
};
</script>

<style scoped lang="scss">
@import 'src/styles/components/day.scss';
@import '~vue2-timepicker/dist/VueTimepicker.css';
</style>
