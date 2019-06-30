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
              <v-flex xs12 sm12 md12>
                <v-combobox
                  v-model="targetInterests"
                  :items="ctmMatrix"
                  label="Interest Category"
                  chips
                  clearable
                  solo
                  multiple
                  v-validate="required"
                  :rules="itemCount"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      @input="remove(data.item)"
                    >
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
              <v-switch
                v-model="premium"
                hide-details
                style="max-width:40px"
              ></v-switch>
              Standard
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           
              Fuel  
              <v-switch
                v-model="brand"
                hide-details
                style="max-width:40px"
              ></v-switch>
              Brand
              </v-layout>
              </v-flex>
            </v-card>

            <v-btn color="primary" @click="targetNext">Continue</v-btn>

            <v-btn flat to="/deals">Cancel</v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form2">
            <v-flex xs6 sm12 md6>
                <v-select
                  v-model="targetInterests"
                  :items="ctmMatrix"
                  box
                  chips
                  label="Type"
                  multiple
                  v-validate="required"
                  :rules="itemCount"
                ></v-select>
              </v-flex>
            <v-expansion-panel v-model="panel">
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
                    v-model="curLocation"
                    :items="items"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="white"
                    hide-no-data
                    hide-selected
                    item-text="Description"
                    item-value="API"
                    label="Input your location"
                    placeholder="Location"
                    return-object
                  ></v-autocomplete>

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
            <DropzoneComp ref="dropzone"/>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm4>
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
                <v-flex xs12 sm8>
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
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="description"
                    :counter="50"
                    label="Description"
                    required
                    :rules="inputRules"
                    @input="$v.description.$touch()"
                    @blur="$v.description.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    v-model="URL"
                    :counter="150"
                    label="URL"
                    required
                    :rules="inputRules"
                    @input="$v.URL.$touch()"
                    @blur="$v.URL.$touch()"
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

              <v-flex xs12 sm6>
                  <v-text-field
                    v-model="message"
                    :counter="150"
                    label="Marketing message for notification"
                    @input="$v.message.$touch()"
                    @blur="$v.message.$touch()"
                  ></v-text-field>
              </v-flex>

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
      interest: 20,
      radius: 15,

      panel: [true, true],

      isLoading: false,

      custTitle: "Custome Title",
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
      internalcode: "Wireframe",
      gradient: "to top, #1c3e94, #1c3e94",

      items: [],
      search: null,
      curLocation: null,
      states: ["Brisbane", "Sydney", "Melbourne"],

      dateActivation: "2019-06-05",
      dateExpires: "2019-06-07",
      inputRules: [v => v.length > 0 || "Input value please."],
      itemCount: [v => v.length > 0 || "Select more than 1"],

      description: "This is an offer",
      URL: "http://www.www.www/",

      menuDateActivation: null,
      menuDateExpires: null,
      isNotification: true,
      cta: "Submit an Offer",
      message: "Message",
      name: "",
      premium: true,
      brand: true,
    };
  },
  watch: {
    search (val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=paris&key=AIzaSyCpJOWuQiXHTAnmdxgqjPRCwOKkTllFtsg')
        .then(res => res.json())
        .then(res => {
          console.log(res.predictions)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    remove (item) {
        this.targetInterests.splice(this.targetInterests.indexOf(item), 1)
        this.targetInterests = [...this.targetInterests]
      },
    sendData() {
      this.loading = true;
      let files = this.$refs.dropzone.getFiles();
      let file = files[0];
      
      this.$store
        .dispatch("app/upload_image", {
          file
        })
        .then(() => {
          console.log("Upload Success!");
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          return;
        });
      
      let data = {offer: {
        userId: "andres@ctm.app",
        type: "Offer",
        imageUrl: file.name,
        title: this.internalcode,
        content: "This is a content",
        openUrl: this.URL,
        active: this.dateActivation,
        expire: this.dateExpires
      },
      target: {
        internal: this.internalcode,
        type: "Offer",
        location: this.curLocation,
        interests: this.targetInterests,
        interestMin: this.interest,
        premium: true,
        brand: true,
        postCodes: this.targetPostCode,
        geoTarget: {
          latitude: 13.95,
          longitude: 70.45,
          radius: this.radius
        },
        sendNotification: this.isNotification,
        message: this.message
      }};

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
