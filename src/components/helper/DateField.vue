<template>
  <v-menu
    ref="showCalendar"
    v-model="showCalendar"
    :close-on-content-click="false"
    :return-value.sync="date"
    lazy
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <div class="date-field">
        <v-text-field
          prepend-icon="date_range"
          v-model="date"
          :label="label"
          readonly
          color="disabled"
          v-on="on"
          :placeholder="placeholder"
        ></v-text-field>
      </div>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat @click="showCalendar = false">Cancel</v-btn>
      <v-btn depressed color="primary" @click="$refs.showCalendar.save(date)"
        >Apply</v-btn
      >
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DateField",
  props: {
    label: String,
    placeholder: {
      type: String,
      default: "DD/MM/YYYY"
    }
  },
  data() {
    return {
      showCalendar: false,
      date: null
    };
  }
};
</script>
