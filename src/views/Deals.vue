<template>
  <v-container fluid>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>Target</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Zone</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Offer</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5">
            <v-flex xs6 sm6 md6>
              <v-select
                v-model="targetInterests"
                :items="ctmMatrix"
                box
                chips
                label="Interest Category"
                multiple
              ></v-select>
            </v-flex>
            <v-flex xs3 sm3 md3>
              <v-text-field label="Interest is > than" placeholder="20"></v-text-field>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <v-select
                v-model="targetFuelType"
                :items="fuelType"
                box
                chips
                label="Fuel Preference"
                multiple
              ></v-select>
              <v-select
                v-model="targetFuelBrand"
                :items="fuelBrand"
                box
                chips
                label="Fuel Brand"
                multiple
              ></v-select>
            </v-flex>
          </v-card>

          <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Post Code</div>
              </template>
              <v-card>
                <v-select
                  v-model="targetPostCode"
                  :items="postCode"
                  box
                  chips
                  label="Post Code(s)"
                  multiple
                ></v-select>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Location &amp; radius</div>
              </template>
              <v-card>
                <v-autocomplete
                  v-model="select"
                  :loading="loading"
                  :items="items"
                  :search-input.sync="search"
                  cache-items
                  class="mx-3"
                  flat
                  hide-no-data
                  hide-details
                  label="Location"
                  solo-inverted
                ></v-autocomplete>

                <v-subheader class="pl-0">Radius</v-subheader>
                <v-slider v-model="slider" thumb-label></v-slider>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- -->
          <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <DropzoneComp/>
          <form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="50"
                    label="Internal Code/Title"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    v-model="custTitle"
                    :error-messages="custTitleErrors"
                    :counter="150"
                    label="Customer Facing Title"
                    required
                    @input="$v.custTitle.$touch()"
                    @blur="$v.custTitle.$touch()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-menu
                    ref="menuDateActivation"
                    v-model="menuDateActivation"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="dateActivation"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateActivation"
                        label="Activation"
                        prepend-icon="event"
                        v-on="on"
                        suffix="AEST"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateActivation" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menuDateActivation = false">Cancel</v-btn>
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.menuDateActivation.save(dateActivation)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <!-- <v-text-field
                    label="Activation"
                    value="01/07/2019 12:30:00"
                    type="date-with-time"
                    suffix="AEST"
                  ></v-text-field>-->
                </v-flex>
                <v-flex xs12 sm6>
                  <v-menu
                    ref="menuDateExpires"
                    v-model="menuDateExpires"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="dateExpires"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateExpires"
                        label="Expires"
                        prepend-icon="event"
                        v-on="on"
                        suffix="AEST"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateExpires" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menuDateExpires = false">Cancel</v-btn>
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.menuDateExpires.save(dateExpires)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <!-- <v-text-field
                    label="Expires"
                    value="01/07/2019 12:30:00"
                    type="date-with-time"
                    suffix="AEST"
                  ></v-text-field>-->
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-checkbox
                    v-model="checkbox"
                    :error-messages="checkboxErrors"
                    label="Send as Push Notification?"
                    required
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="cta"
                    :error-messages="ctaErrors"
                    :counter="150"
                    label="Call to action"
                    required
                    @input="$v.cta.$touch()"
                    @blur="$v.cta.$touch()"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-select
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Item"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>

              <v-btn @click="submit">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-container>
          </form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import DateField from "@/components/helper/DateField";
import DropzoneComp from "@/components/DropzoneComp";

export default {
  name: "Deals",
  components: {
    DateField, 
    DropzoneComp
  },
  data() {
    return {
      e1: 0,
      clipped: false,
      drawer: true,
      fixed: false,

      ctmMatrix: ["car", "health", "home", "foo", "bar", "fizz", "buzz"],
      targetInterests: ["car", "health", "home", "foo"],

      fuelType: ["Premium", "Regular"],
      targetFuelType: ["Premium", "Regular"],

      fuelBrand: ["BP", "Shell", "Caltex", "Freedom", "Puma"],
      targetFuelBrand: ["BP", "Shell", "Caltex", "Freedom", "Puma"],

      fuelType: ["Work", "Home"],
      targetFuelType: ["Work", "Home"],

      postCode: ["4000", "4226", "4220", "2000", "2226", "2220"],
      targetPostCode: ["4000", "4226"],

      miniVariant: true,
      right: true,
      rightDrawer: true,
      title: "Wireframe",
      gradient: "to top, #1c3e94, #1c3e94",

      loading: false,
      items: [],
      search: null,
      select: null,
      states: ["Brisbane", "Sydney", "Melbourne"],

      slider: 45,

      dateActivation: "2019-06-05",
      dateExpires: "2019-06-07"
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="stylus"></style>
