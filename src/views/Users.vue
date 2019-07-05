<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">ID : {{ editedItem.id }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.secondaryId" readonly label="Secondary Id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.createdDate" readonly label="Created Date"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.createdAt" readonly label="Created At"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.modifiedDate" readonly label="Modified Date"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.modifiedAt" readonly label="Modified At"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userName" readonly label="Username"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" readonly label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userId" readonly label="UserId"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.latestCheckin"
                    readonly
                    label="Lastest Check In"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.searchFuelPremium"
                    readonly
                    label="Search Fuel Premium"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.searchFuelNonPremium"
                    label="Search Fuel Non Premium"
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.searchBrandMajor"
                    readonly
                    label="Search Brand Major"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.searchBrandMinor"
                    readonly
                    label="Search Brand Minor"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.searchCount" readonly label="Search Count"></v-text-field>
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
        :items="user_data"
        item-key="id"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="totalUsers"
      >
        <template v-slot:items="props">
          <tr @click="viewDetail(props.item)">
            <td class="text-xs-center">{{ props.item.userName }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.firstName }}</td>
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.createdDate }}</td>
            <td class="text-xs-center">{{ props.item.createdAt }}</td>
            <td class="text-xs-center">{{ props.item.modifiedDate }}</td>
            <td class="text-xs-center">{{ props.item.modifiedAt }}</td>
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
      totalUsers: 0,

      pagination: {},
      loading: false,
      search: "",
      dialog: false,
      editedItem: {
        id: "b316a337-7b30-4ab4-a89f-3abf785ee634",
        secondaryId: 22,
        createdDate: "2019-06-25T04:02:03.547",
        createdAt: 1561435323547,
        modifiedDate: "2019-06-25T04:02:03.547",
        modifiedAt: 1561435323547,
        userName: "andres@ctm.app",
        email: "andres@ctm.app",
        userId: null,
        firstName: "Andres",
        latestCheckin: null,
        searchFuelPremium: 0,
        searchFuelNonPremium: 0,
        searchBrandMajor: 0,
        searchBrandMinor: 0,
        searchCount: 0
      },
      count: 5,
      page: 1,
      headers: [
        { text: "Username", value: "username", align: "center", width: "200" },
        { text: "Email", value: "email", align: "center", width: "200" },
        {
          text: "FirstName",
          value: "firstname",
          width: "50",
          align: "center"
        },
        { text: "Id", value: "id", align: "center", width: "200" },
        { text: "CreatedDate", value: "createdDate", align: "center" },
        { text: "CreatedAt", value: "createdAt", align: "center" },
        { text: "ModifiedDate", value: "modifedDate", align: "center" },
        { text: "ModifiedAt", value: "modifedAt", align: "center" }
      ],
      user_data: []
    };
  },
  methods: {
    viewDetail(item) {
      this.editedItem = item;

      this.dialog = true;
    },
    send_request() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        this.page = page;
        this.count = rowsPerPage;
        if (this.count == -1) this.count = this.totalUsers;
        this.$store
          .dispatch("app/getuser", {
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
          this.user_data = data.items;
          this.totalUsers = data.total;
        });
      },
      deep: true
    },
    search: {
      handler() {
        this.send_request().then(data => {
          this.user_data = data.items;
          this.totalUsers = data.total;
        });
      }
    }
  },
  mounted() {
    this.send_request().then(data => {
      this.user_data = data.items;
      this.totalUsers = data.total;
    });
  }
};
</script>

<style lang="stylus"></style>
