<script>
import { defineNuxtComponent } from '#app'; // provides better autocomplete

export default defineNuxtComponent({
  data: () => ({
    projects: []
  }),
  // methods: {
  //   fetchProjects() { //function using browser api to fetch and perfome our request
  //     fetch('https://jsonplaceholder.typicode.com/todos/1').then( // fetches data from the API
  //       response => response.json() // parses JSON response into native JavaScript objects
  //     ).then(json => {
  //       this.projects = json // sets the data to the response
  //     })
  //   }
  // }
  methods: {
    fetchData() {
      loding.value = true;
    }
  }
})

</script>

<template>
  <div>
    <h1>projects</h1>
    <button @click="fetchProjects">Fetch projects</button> 
    <p>
      {{ projects }}
    </p>
    <ul>
      <li v-for="project in projects" :key="`project-id-${project.id}`">
        <input type="checkbox" :checked="project.completed" />
        {{ project.title }}
      </li>
    </ul>
  </div>
</template>

<style>
html {
    font-family: Georgia, Palatino, 'Times New Roman', Times, serif;
    font-size: 16px;
    font-weight: 300;
}

h1, h2, h3, h4 {
    font-family: Georgia, Palatino, 'Times New Roman', Times, serif;
    font-weight: 500;
}
</style>