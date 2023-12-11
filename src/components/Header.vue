<template>
   <header>
    <router-link :to="{ name: 'Home' }" id="home-link">
            <img id="logo-image" src="../assets/images/logo.png" title="logo" alt="logo">Strikes Bowling
        </router-link>
        <nav class="main-navlist">
            <input id="menu-toggle" type="checkbox">
            <label class="menu-button-container" for="menu-toggle">
                <div class="menu-button"></div>
            </label>
            <ul class="nav-ul">

                <li><router-link :to="{ name: 'Home' }">Home</router-link></li>


                <li><router-link :to="{ name: 'Locations' }">Locations</router-link></li>


                <li><router-link :to="{ name: 'HowToPlay' }">How to Play</router-link></li>


                <li><router-link :to="{ name: 'RegisterAlley' }">Register Alley</router-link></li>

                <li><router-link :to="{ name: 'Register' }">Create Account</router-link></li>
                <li><router-link :to="{ name: 'ViewAllScores'}">View All Scores</router-link></li>


            </ul>

        </nav>
    </header>
</template>

<script>

</script>

<style scoped>

</style>