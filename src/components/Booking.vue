<template>
  <div v-if="!!currentUser" class="container">
    <header class="jumbotron">
      <h3>My Booking</h3>
    </header>

    <div class="form-control">
      <div class="flex space-x-2">
        <input
          v-model="search.from"
          type="text"
          placeholder="From"
          class="w-full input input-primary input-bordered"
        />

        <input
          v-model="search.to"
          type="text"
          placeholder="To"
          class="w-full input input-primary input-bordered"
        />
        <button class="btn btn-primary" @click="searchBooking">go</button>
      </div>
    </div>
    <!-- 
    <ul id="v-for-object">
      <li v-for="booking in bookings" v-bind:key="booking">
        {{ booking }}
      </li>
    </ul> -->

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th>Time</th>
            <th>Customer</th>
            <th>Service</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="booking in bookings" v-bind:key="booking">
            <td>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </td>
            <td>{{ booking.start_at }}</td>

            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="w-12 h-12 mask mask-squircle">
                    <img
                      :src="`https://i.pravatar.cc/60?u=${this.hash(
                        booking.customer.name
                      )}`"
                    />
                  </div>
                </div>
                <div class="font-bold">{{ booking.customer.name }}</div>
              </div>
            </td>
            <td>{{ getServiceById(booking.service_id).name }}</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import crypto from "crypto-js";

export default {
  name: "Booking",
  data: () => ({
    search: {
      from: "2021-01-01",
      to: "2021-10-10",
    },
    bookings: null,
    error: null,
  }),
  computed: {
    ...mapGetters({
      currentUser: "auth/stateUser",
      stateToken: "auth/stateToken",
      getServiceById: "app/getServiceById",
    }),
  },
  mounted() {
    if (!this.services) {
      this.$store.dispatch("app/loadServices");
    }

    this.searchBooking();
  },
  methods: {
    searchBooking: function () {
      console.log(this.getServiceById(1));

      const body = {
        query: `
        query start_at($from: Date!, $to: Date!){ 
        bookings(start_at:{from:$from,to:$to}){customer{name},start_at,service_id}
      }`,
        variables: {
          from: this.search.from,
          to: this.search.to,
        },
      };
      axios.post("", body).then((response) => {
        this.bookings = response.data.data.bookings ?? response.data.bookings;
      });
    },
    hash: function (str) {
      return crypto.MD5(str);
    },
  },
};
</script>