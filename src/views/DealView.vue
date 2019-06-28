<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Deals
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="offers_data"
        :search="search"
      >
        <template v-slot:items="props">
          <td>{{ props.item.target.internal }}</td>
          <td class="text-xs-right">{{ props.item.offer.active }}</td>
          <td class="text-xs-right">{{ props.item.offer.expire }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <v-btn to="/deals/add">Add a Deal</v-btn>
  </v-container>
</template>

<script>
import Offers from "@/api/offers";
import { setTimeout } from 'timers';

export default {
  name: "DealsView",
  data () {
    return {
      loading: false,
      search: '',
      headers: [
        {
          text: 'Internal Code',
          align: 'left',
          sortable: false,
          value: 'target.internal'
        },
        { text: 'Activation Date', value: 'offer.active' },
        { text: 'Expires Date', value: 'offer.expire' }
      ],
      offers_data: Offers
    }
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
    console.log(this.offers_data);
  }
};
</script>

<style lang="stylus"></style>
