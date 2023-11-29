<template>
    <div>
      <h2>Available Drivers</h2>
      <ul>
        <li v-for="driver in drivers" :key="driver.id">
          {{ driver.name }} - {{ driver.car }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drivers: [], 
      };
    },
    mounted() {
      this.fetchDrivers();
    },
    methods: {
      async fetchDrivers() {
        this.drivers = [
          { id: 1, name: 'John Doe', car: 'Toyota Camry' },
          { id: 2, name: 'Jane Doe', car: 'Honda Accord' },
        ];
      },
    },
  };
  </script>
  
  <style scoped>

  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 0.5em 0;
    padding: 0.5em;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
  }
  </style>
  