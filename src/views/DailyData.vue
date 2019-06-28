<template>
  <v-container fluid>
    <v-stepper v-model="e6" vertical class="daily-data">
      <v-stepper-step :complete="e6 > 1" step="1"
        >Make your selection and enter your data below:</v-stepper-step
      >
      <v-stepper-content step="1">
        <v-layout align-center>
          <v-flex xs12 sm6 md4 lg3>Your gender:</v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <v-select :items="genders" value="Select"></v-select>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2"
        >Track in kilograms (kg) of pounts</v-stepper-step
      >
      <v-stepper-content step="2">
        <v-layout wrap align-center>
          <v-flex xs12 sm6 md4 lg3 v-if="$vuetify.breakpoint.smAndUp"
            >Track in kilograms (kg) of pounts:</v-flex
          >
          <v-flex xs12 sm6 md4 lg3>
            <v-select :items="track" value="Select"></v-select>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn flat @click="e6 = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3"
        >Select last measurement / weigth date</v-stepper-step
      >
      <v-stepper-content step="3">
        <v-layout wrap align-center>
          <v-flex xs12 sm6 md5 lg4 v-if="$vuetify.breakpoint.smAndUp"
            >Select last measurement / weigth date</v-flex
          >
          <v-flex xs12 sm6 md7 lg8>
            <div v-if="$vuetify.breakpoint.xsOnly">
              <date-field />
            </div>
            <div v-else>
              <v-select
                :items="day"
                value="Day"
                class="daily-data__short-selector"
              ></v-select>
              <v-select
                :items="month"
                value="Month"
                class="daily-data__short-selector"
              ></v-select>
              <v-select
                :items="year"
                value="Year"
                class="daily-data__short-selector"
              ></v-select>
            </div>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
        <v-btn flat @click="e6 = 2">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 4" step="4"
        >Select last measurement / weigth date</v-stepper-step
      >
      <v-stepper-content step="4">
        <table class="daily-data__table">
          <tr>
            <th>Date</th>
            <th>Weight</th>
            <th>Unit of Measurement</th>
          </tr>
          <tr>
            <td>
              <date-field />
            </td>
            <td>
              <v-text-field label="Enter number" type="number"></v-text-field>
            </td>
            <td>Pounds</td>
          </tr>
        </table>

        <v-btn color="primary" @click="e6 = 5">Continue</v-btn>
        <v-btn flat @click="e6 = 3">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step step="5">Submit</v-stepper-step>
      <v-stepper-content step="5">
        <v-btn color="primary" @click="e6 = 1">Submit</v-btn>
        <v-btn flat @click="e6 = 4">Back</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import DateField from "@/components/helper/DateField";

export default {
  name: "DailyData",
  components: {
    DateField
  },
  data() {
    return {
      e6: 1,
      genders: ["Select", "Male", "Female"],
      track: ["Select", "40 kg or 88 lbs", "80 kg or 176 lbs"],
      day: ["Day", "1", "2", "3"],
      month: ["Month", "January", "Ferbuary", "March", "April", "May"],
      year: ["Year", "2016", "2019", "2018", "2017", "2017"]
    };
  }
};
</script>

<style lang="stylus">
.daily-data {
  &__short-selector {
    width: 100px;
    margin-right: 15px;
    float: left;
  }

  &__table {
    td, th {
      padding: 10px;
      text-align: center;

      @media (max-width: 500px) {
        padding: 3px;

        &, * {
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>
