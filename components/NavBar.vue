<script lang="ts">
</script>

<template>
   <nav class="navbar">
        <NuxtLink to="/" class="navbar-icon">LS</NuxtLink>
        <div class="navbar-content">
            <div class="navbar-links">
                <NuxtLink to="/projects" class="navbar-link">projects.</NuxtLink>
                <NuxtLink to="/about" class="navbar-link">about.</NuxtLink>
                <NuxtLink to="/contact" class="navbar-link">contact. </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f5f5f5;
    padding: 10px;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .navbar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 800px;

        .navbar-links {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 400px;

            .navbar-link {
                transition: all 0.4s ease-in-out;

                &:hover {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>