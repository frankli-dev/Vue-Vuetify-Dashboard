<template>
  <v-container fluid>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>Target</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" editable>Zone</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" editable>Offer</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="form1">
            <v-card class="mb-5">
              <v-flex xs12 sm12 md12>
                <v-combobox
                  v-model="targetInterests"
                  :items="ctmMatrix"
                  label="Interest Category"
                  chips
                  clearable
                  solo
                  multiple
                  :rules="itemCount"
                >
                  <template v-slot:selection="data">
                    <v-chip :selected="data.selected" close @input="remove(data.item)">
                      <strong>{{ data.item }}</strong>&nbsp;
                      <span>(interest)</span>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-flex>
              <v-flex xs12 sm12 md12>
                Interest is > than
                <v-slider v-model="interest" thumb-label></v-slider>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-layout style="line-height:65px">
                  Premium
                  <v-switch v-model="premium" hide-details style="max-width:40px"></v-switch>Standard
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Fuel
                  <v-switch v-model="brand" hide-details style="max-width:40px"></v-switch>Brand
                </v-layout>
              </v-flex>
            </v-card>

            <v-btn color="primary" @click="targetNext">Continue</v-btn>

            <v-btn flat to="/deals">Cancel</v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form2">
            <v-expansion-panel v-model="panel">
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div>Post Code</div>
                </template>
                <v-card class="mb-5">
                  <v-combobox
                    v-model="targetPostCode"
                    :items="postCode"
                    label="Post Code(s)"
                    chips
                    clearable
                    solo
                    multiple
                    :rules="itemCount"
                  >
                    <template v-slot:selection="data">
                      <v-chip :selected="data.selected" close @input="remove(data.item)">
                        <strong>{{ data.item }}</strong>&nbsp;
                        <span></span>
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <div>Location and Radius</div>
                </template>
                <v-card class="mb-5">
                  <vuetify-google-autocomplete
                    ref="curLocation"
                    id="map"
                    append-icon="search"
                    placeholder="Input your location"
                    v-on:placechanged="getAddressData"
                  ></vuetify-google-autocomplete>
                  <v-subheader class="pl-0">Radius</v-subheader>
                  <v-slider v-model="radius" thumb-label></v-slider>
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
            <DropzoneComp ref="dropzone" />
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="internalcode"
                    :counter="50"
                    label="Internal Code/Title"
                    required
                    :rules="inputRules"
                    @input="$v.internalcode.$touch()"
                    @blur="$v.internalcode.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="custTitle"
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
                  <v-textarea
                    outline
                    auto-grow
                    v-model="description"
                    label="Description"
                    required
                    height="200"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-flex xs12 sm12>
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
                  <v-flex xs12 sm12>
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

                  <v-flex xs12 sm12>
                    <v-text-field
                      v-model="URL"
                      :counter="300"
                      label="URL"
                      required
                      :rules="inputRules"
                      @input="$v.URL.$touch()"
                      @blur="$v.URL.$touch()"
                    ></v-text-field>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-checkbox
                    v-model="isNotification"
                    label="Send as Push Notification?"
                    required
                    @change="$v.isNotification.$touch()"
                    @blur="$v.isNotification.$touch()"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="cta"
                    :counter="150"
                    label="Call to action"
                    required
                    @input="$v.cta.$touch()"
                    @blur="$v.cta.$touch()"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-flex xs12 sm12>
                <v-textarea
                  v-model="message"
                  auto-grow
                  label="Marketing message for notification"
                  outline
                ></v-textarea>
              </v-flex>

              <v-btn @click="submit" :loading="loading">submit</v-btn>
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
      interest: 10,
      radius: 0,

      panel: [true, true],

      custTitle: "Custome Title",
      ctmMatrix: [
        "car",
        "health",
        "home",
        "foo",
        "bar",
        "fizz",
        "buzz",
        "travel"
      ],
      targetInterests: ["Travel"],

      fuelType: ["Premium", "Regular"],
      targetFuelType: ["Premium", "Regular"],

      fuelBrand: ["BP", "Shell", "Caltex", "Freedom", "Puma"],
      targetFuelBrand: ["BP", "Shell", "Caltex", "Freedom", "Puma"],

      postCode: [4000, 4226, 4220, 2000, 2226, 2220],
      targetPostCode: [4000, 4226],

      miniVariant: true,
      right: true,
      rightDrawer: true,
      internalcode: "Offer test",
      gradient: "to top, #1c3e94, #1c3e94",

      items: [],
      search: null,
      curLocation: null,
      states: ["Brisbane", "Sydney", "Melbourne"],

      dateActivation: "2019-06-30",
      dateExpires: "2019-06-30",
      inputRules: [v => v.length > 0 || "Input value please."],
      itemCount: [v => v.length > 0 || "Select more than 1"],

      description: "This is an offer",
      URL:
        "https://www.experienceoz.com.au/en/brisbane/brisbane-to-movie-world-plus-entry/brisbane-to-warner-bros-movie-world-including-entry",

      menuDateActivation: null,
      menuDateExpires: null,
      isNotification: true,
      cta: "Submit an Offer",
      message: "Message",
      name: "",
      premium: true,
      brand: true
    };
  },
  methods: {
    getAddressData: function(addressData, placeResultData, id) {
      this.curLocation = addressData;
      console.log(addressData, placeResultData, id);
    },
    remove(item) {
      this.targetInterests.splice(this.targetInterests.indexOf(item), 1);
      this.targetInterests = [...this.targetInterests];
    },
    sendData() {
      this.loading = true;

      let files = this.$refs.dropzone.getFiles();
      let file = files[0];

      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("app/upload_image", {
            file
          })
          .then(resp => {
            console.log("Upload Success!");
            let data = {
              offer: {
                type: "Offer",
                imageUrl:
                  "https://ctmdevblobstore.blob.core.windows.net/offers/" +
                  resp,
                title: this.custTitle,
                content: "This is a content",
                openUrl: this.URL,
                active: new Date(this.dateActivation).toISOString(),
                expire: new Date(this.dateExpires).toISOString()
              },
              target: {
                internal: this.internalcode,
                type: "Offer",
                location: "Home",
                interests: this.targetInterests,
                interestMin: this.interest,
                premium: true,
                brand: true,
                postCodes: this.targetPostCode,
                geoTarget: {
                  latitude: 0,
                  longitude: 0,
                  radius: this.radius
                },
                sendNotification: new Date().toISOString(),
                message: this.message
              }
            };

            console.log(data);

            this.$store
              .dispatch("app/sendoffer", {
                data
              })
              .then(() => {
                this.loading = false;
                this.$router.push("/deals");
              })
              .catch(err => {
                this.loading = false;
                console.log(err);
              });
            resolve(resp);
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
            reject(err);
            return;
          });
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
      this.$refs.form2.reset();
      this.$refs.form3.reset();
      this.e1 = 1;
    }
  }
};
</script>

<style lang="stylus"></style>
