<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn to="/deals/add" color="primary">Add a Deal</v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="offers_data"
        :search="search"
        item-key="id"
        :expand="expand"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-left">{{ props.item.target.internal }}</td>
            <td class="text-xs-left">{{ props.item.target.interestMin }}</td>
            <td class="text-xs-left">{{ props.item.target.brand ? "⭐" : " " }}</td>
            <td class="text-xs-left">{{ props.item.target.premium ? "⭐" : " " }}</td>
            <td class="text-xs-left">{{ props.item.offer.active }}</td>
            <td class="text-xs-left">{{ props.item.offer.expire }}</td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card flat color="blue-grey darken-2" class="white--text">
            <v-layout row wrap>
              <v-flex display-2>Offer</v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Image Url" :value="props.item.offer.imageUrl" readonly box></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="title" :value="props.item.offer.title" readonly box></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="content" :value="props.item.offer.content" readonly box></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="openUrl" :value="props.item.offer.openUrl" readonly box></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Active Date" :value="props.item.offer.active" readonly box></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Expire Date" :value="props.item.offer.expire" readonly box></v-text-field>
              </v-flex>
              <v-flex display-2>Target</v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Internal Code"
                  :value="props.item.target.internal"
                  readonly
                  box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Location" :value="props.item.target.location" readonly box></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-combobox
                  box
                  v-model="props.item.target.interests"
                  label="Interest Category"
                  chips
                  readonly
                  multiple
                ></v-combobox>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-combobox
                  box
                  v-model="props.item.target.postCodes"
                  label="postCodes"
                  chips
                  readonly
                  multiple
                ></v-combobox>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  box
                  label="sendNotification"
                  :value="props.item.target.sendNotification"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm1 md2>
                <v-badge right>
                  <template v-slot:badge>
                    <span>{{props.item.target.interestMin}}</span>
                  </template>

                  <v-flex title>Interest</v-flex>
                </v-badge>
              </v-flex>
              <v-flex xs6 sm3 md2 title>Premium {{ props.item.target.premium ? "⭐" : " " }}</v-flex>
              <v-flex xs6 sm2 md2 title>Brand {{ props.item.target.brand ? "⭐" : " " }}</v-flex>
              <br />
              <v-flex xs12 sm12 md12>
                <v-textarea box label="Message" :value="props.item.target.message" readonly></v-textarea>
              </v-flex>
              <v-btn color="red" @click="setExpire(props.item.id)">Cancel</v-btn>
            </v-layout>
          </v-card>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Offers from "@/api/offers";
import { setTimeout } from "timers";

export default {
  name: "DealsView",
  method: {
    setExpire(id) {
      console.log(this.offers_data[id - 1]);
    }
  },
  data() {
    return {
      loading: false,
      search: "",
      expand: false,
      headers: [
        { text: "Internal Code", value: "target.internal" },
        { text: "Interest Min", value: "target.interestMin" },
        { text: "Brand", value: "target.brand" },
        { text: "Premium", value: "target.premium" },
        { text: "Activation Date", value: "offer.active" },
        { text: "Expires Date", value: "offer.expire" }
      ],
      offers_data: Offers
    };
  },
  created() {
    this.loading = true;
    // this.$store.dispatch("app/getoffer", {
    //   params: {
    //     search: "string",
    //     sort: "string",
    //     Count: 10,
    //     SinceId: 0,
    //     MaxId: 100,
    //     Page: 0,
    //     Fields: "*"
    //   }
    // })
    // .then(() => {
    //   this.loading = false;
    //   this.$router.push("/");
    // })
    // .catch(err => {
    //   this.loading = false;
    //   console.log(err);
    // });
    setTimeout(() => {
      this.offers_data = Offers;
      this.loading = false;
    }, 500);
  }
};
</script>

<style lang="stylus"></style>
