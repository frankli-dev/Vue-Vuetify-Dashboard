<template>
  <v-container fluid>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable=""
          >Target</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" editable=""
          >Zone</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" editable=""
          >Offer</v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="form1">
            <v-card class="mb-5">
              <v-flex xs6 sm6 md6>
                <v-select
                  v-model="targetInterests"
                  :items="ctmMatrix"
                  box
                  chips
                  label="Interest Category"
                  multiple
                  v-validate="required"
                  :rules="itemCount"
                ></v-select>
              </v-flex>
              <v-flex xs3 sm3 md3>
                <v-text-field
                  label="Interest is > than"
                  :counter="10"
                  v-model="interest"
                  v-validate="required"
                  :rules="inputRules"
                  @input="$v.interest.$touch()"
                  @blur="$v.interest.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 sm6 md6>
                <v-select
                  v-model="targetFuelType"
                  :items="fuelType"
                  box
                  chips
                  label="Fuel Preference"
                  multiple
                  v-validate="required"
                  :rules="itemCount"
                ></v-select>
                <v-select
                  v-model="targetFuelBrand"
                  :items="fuelBrand"
                  box
                  chips
                  label="Fuel Brand"
                  multiple
                  v-validate="required"
                  :rules="itemCount"
                ></v-select>
              </v-flex>
            </v-card>

            <v-btn color="primary" @click="targetNext">Continue</v-btn>

            <v-btn flat to="/deals">Cancel</v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form2">
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
                    v-validate="required"
                    :rules="itemCount"
                  ></v-select>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div>Location &amp; radius</div>
                </template>
                <v-card>
                  <v-autocomplete
                    ref="location"
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    cache-items
                    class="mx-3"
                    flat
                    hide-details
                    label="Location"
                    v-validate="required"
                    error-message="Select Location"
                  ></v-autocomplete>

                  <v-subheader class="pl-0">Radius</v-subheader>
                  <v-slider v-model="slider" thumb-label></v-slider>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- -->
            <v-btn color="primary" @click="zoneNext">Continue</v-btn>

            <v-btn flat to="/deals">Cancel</v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form ref="form3">
            <DropzoneComp ref="dropzone" v-model="imageUrl"/>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="50"
                    label="Internal Code/Title"
                    required
                    :rules="inputRules"
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
                    :rules="inputRules"
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
                      <v-btn
                        flat
                        color="primary"
                        @click="menuDateActivation = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.menuDateActivation.save(dateActivation)"
                        >OK</v-btn
                      >
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
                      <v-btn
                        flat
                        color="primary"
                        @click="menuDateExpires = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.menuDateExpires.save(dateExpires)"
                        >OK</v-btn
                      >
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
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
// import DateField from "@/components/helper/DateField";
import DropzoneComp from "@/components/DropzoneComp";

export default {
  name: "Deals",
  components: {
    //DateField,
    DropzoneComp
  },
  data() {
    return {
      loading: false,
      e1: 0,
      clipped: false,
      drawer: true,
      fixed: false,
      interest: "",

      selectErrors: ["Select more than one."],
      ctaErrors: ["Call to action please."],

      ctmMatrix: ["car", "health", "home", "foo", "bar", "fizz", "buzz"],
      targetInterests: ["car", "health", "home", "foo"],

      fuelType: ["Premium", "Regular"],
      targetFuelType: ["Premium", "Regular"],

      fuelBrand: ["BP", "Shell", "Caltex", "Freedom", "Puma"],
      targetFuelBrand: ["BP", "Shell", "Caltex", "Freedom", "Puma"],

      postCode: ["4000", "4226", "4220", "2000", "2226", "2220"],
      targetPostCode: ["4000", "4226"],

      miniVariant: true,
      right: true,
      rightDrawer: true,
      title: "Wireframe",
      gradient: "to top, #1c3e94, #1c3e94",

      items: [],
      search: null,
      select: null,
      states: ["Brisbane", "Sydney", "Melbourne"],

      slider: 45,

      dateActivation: "2019-06-05",
      dateExpires: "2019-06-07",
      inputRules: [v => v.length > 0 || "Input value please."],
      itemCount: [v => v.length > 0 || "Select more than 1"],
      imageUrl: null
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    sendData() {
      this.loading = true;
      console.log(this.$store);
      let data = {offer: {
            userId: "andres@ctm.app",
            type: "Offer",
            imageUrl: this.$refs.dropzone.getFiles(),
            title: this.name,
            content: "string",
            openUrl: "string",
            active: this.dateActivation,
            expire: this.dateExpires
          },
          target: {
            internal: this.name,
            type: "Offer",
            location: this.select,
            interests: this.targetInterests,
            interestMin: this.interest,
            premium: true,
            brand: true,
            postCodes: this.targetPostCode,
            geoTarget: {
              latitude: 0,
              longitude: 0,
              radius: this.slider
            },
            sendNotification: new Date(),
            message: "string"
          }};
      this.$store
        .dispatch("app/sendoffer", {
          data
        })
        .then(() => {
          this.loading = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    submit() {
      this.selectErrors = [];
      if (!this.$refs.form1.validate()) {
        this.e1 = 1;
      } else if (!this.$refs.form2.validate()) {
        if (this.select == null) {
          this.selectErrors.push("Input your location");
        } else {
          this.e1 = 2;
        }
      } else if (this.$refs.form3.validate()) {
        //upload
        this.sendData();
      }
    },
    targetNext() {
      if (this.$refs.form1.validate()) {
        this.e1 = 2;
      }
    },
    zoneNext() {
      if (this.$refs.form2.validate()) {
        //if (this.select != null) {
        this.e1 = 3;
        //}
      }
    },
    clear() {
      this.interest = "";
      this.$refs.form2.reset();
      this.$refs.form3.reset();
      this.e1 = 1;
    }
  }
};
</script>

<style lang="stylus"></style>
