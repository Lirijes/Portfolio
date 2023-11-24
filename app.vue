<script setup>
// import { computed, ref } from 'vue'; 

//   let projects = ref([]); // creates a reactive variable

//   const numberOfProjects = computed(() => {
//       return projects.value.length; // i want the length of the projects value
//   })

//   function fetchProjects() {
//       fetch('https://localhost:44307/api/Profile/Projects')  // fetches data from the API
//       .then(response => response.json()) // parses JSON response into native JavaScript objects
//       .then(json => {
//         console.log("Projects:", json)
//           projects.value = json // sets the data to the response
//       })
// }
</script>

<template>
  <!-- <div>
    <h1>projects</h1>
    <button @click="fetchProjects">Fetch projects</button> 
    <p>
      {{ numberOfProjects.length }} 
    </p>
    <ul class="project-list">
      <li v-for="project in projects" :key="`project-id-${project.id}`">
        <input type="checkbox" :checked="project.completed" />
        {{ project.projectTitle }}
      </li>
    </ul>
  </div> -->
</template>

<style lang="scss" >
@import './assets/scss/main.scss';

:root {
  --text-color: #{$textColor}; // special syntaxt for it to understand its not just a simple string
}

</style>