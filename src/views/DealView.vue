<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn to="/deals/add" color="primary">Add a Deal</v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editedItem.title }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-img :src="editedItem.imageUrl"></v-img>
                </v-flex>
                <v-flex xs12 sm12 md12>{{editedItem.content}}</v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.openUrl" readonly label="Open Url"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md5>
                  <v-text-field v-model="editedItem.active" readonly label="Active Date"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md5>
                  <v-text-field v-model="editedItem.expire" readonly label="Expire Date"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md2>
                  <v-text-field v-model="editedItem.type" readonly label="Type"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="offers_data"
        item-key="id"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="totalOffers"
      >
        <template v-slot:items="props">
          <tr>
            <td class="text-xs-center" @click="viewDetail(props.item)">{{ props.item.title }}</td>
            <td class="text-xs-left" @click="viewDetail(props.item)">{{ props.item.content }}</td>
            <td class="text-xs-left" max-width="400">
              <a target="_blank" rel="noopener noreferrer" :href="props.item.imageUrl">
                <v-img :src="props.item.imageUrl"></v-img>
              </a>
            </td>
            <td class="text-xs-left">
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="props.item.openUrl"
              >{{ props.item.openUrl.length > 30 ? props.item.openUrl.slice(0, 30) + "..." : props.item.openUrl}}</a>
            </td>
            <td class="text-xs-center" @click="viewDetail(props.item)">{{ props.item.type }}</td>
            <td class="text-xs-left" @click="viewDetail(props.item)">{{ props.item.active }}</td>
            <td class="text-xs-left" @click="viewDetail(props.item)">{{ props.item.expire }}</td>
            <td class="justify-center layout px-0">
              <v-btn @click="remove(props.item)" flat icon color="black">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { setTimeout } from "timers";

export default {
  data() {
    return {
      dialog: false,
      editedItem: {
        imageUrl:
          "https://www.repco.com.au/medias/logo-repco.png?context=bWFzdGVyfGltYWdlc3wxMzA1MXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDhmL2hlZC84Nzk2MTYyMDY0NDE0L2xvZ28tcmVwY28ucG5nfDcyNGYwN2U0Mzg4M2UzOTk0MTdhOWNhMzE0ZTg5YjBhODlmZDU5ZDdjOGJjMjk4NDA2NDRlNDEzZGViZjMyZjM",
        title: "10% off",
        content: "Autoclub members",
        openUrl: "https://www.repco.com.au/en/sycs",
        type: 0,
        active: "2019-06-17T01:43:48.513",
        expire: "2019-07-30T01:43:48.513"
      },
      totalOffers: 0,
      pagination: {},
      loading: false,
      search: "",
      count: 5,
      page: 1,
      headers: [
        { text: "Title", value: "title", align: "center", width: "150" },
        { text: "Content", value: "content", align: "center", width: "200" },
        { text: "Image", value: "imageUrl", width: "200", align: "center" },
        { text: "OpenUrl", value: "openUrl", align: "center", width: "200" },
        { text: "Type", value: "type", align: "center", width: "50" },
        { text: "Active", value: "active", align: "center" },
        { text: "Expire", value: "expire", align: "center" },
        {
          text: "Actions",
          value: "name",
          sortable: false,
          align: "center",
          width: "50"
        }
      ],
      offers_data: []
    };
  },
  methods: {
    viewDetail(item) {
      this.editedItem = item;

      this.dialog = true;
    },
    remove(item) {
      console.log(item);
    },
    send_request() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        this.page = page;
        this.count = rowsPerPage;
        if (this.count == -1) this.count = this.totalOffers;
        this.$store
          .dispatch("app/getoffer", {
            params: {
              Count: this.count,
              Page: this.page,
              Search: this.search
            }
          })
          .then(resp => {
            //console.log(resp.data.data);
            let items = resp.data.data;
            this.loading = false;
            let total = resp.data.pagination.total;
            resolve({
              items,
              total
            });
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      });
    }
  },
  watch: {
    pagination: {
      handler() {
        this.send_request().then(data => {
          this.offers_data = data.items;
          this.totalOffers = data.total;
        });
      },
      deep: true
    },
    search: {
      handler() {
        this.send_request().then(data => {
          this.offers_data = data.items;
          this.totalOffers = data.total;
        });
      }
    }
  },
  mounted() {
    this.send_request().then(data => {
      this.offers_data = data.items;
      this.totalOffers = data.total;
    });
  }
};
</script>

<style lang="stylus"></style>
