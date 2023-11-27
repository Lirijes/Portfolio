<script lang="ts">
//sticky navbar when scrolling 100px
export default {
    data() {
        return {
        isNavbarFixed: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
        // Adjust the value (e.g., 100) based on when you want the navbar to become fixed
        if (window.scrollY > 100) {
            this.isNavbarFixed = true;
        } else {
            this.isNavbarFixed = false;
        }
        },
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>

<template>
   <nav class="navbar">
        <div class="container">
            <NuxtLink to="/" class="navbar-name">lirije shabani. 
                <span class="navbar-proffession">/ web developer</span>
            </NuxtLink>
            <div class="navbar-content">
                <div class="navbar-links">
                    <NuxtLink to="/projects" class="navbar-link">projects.</NuxtLink>
                    <NuxtLink to="/about" class="navbar-link">about.</NuxtLink>
                    <NuxtLink to="/contact" class="navbar-link">contact. </NuxtLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
.navbar {
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    padding: 10px;

        .navbar-name {
            display: flex;
            align-items: center;
            font-size: 18px;
            font-weight: bold;

            .navbar-proffession {
                font-size: 14px;
                font-weight: 300;
                font-style: italic;
                margin-left: 15px;
            }
        }

        .navbar-content {
            .navbar-links {
                display: flex;
                justify-content: space-around;
                align-items: center;

                .navbar-link {
                    transition: all 0.4s ease-in-out;

                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>