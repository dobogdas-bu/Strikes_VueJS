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

                <router-link @click="closeMenu" :to="{ name: 'Home' }"><li>Home</li></router-link>


                <router-link @click="closeMenu" :to="{ name: 'Locations' }"><li>Locations</li></router-link>


                <router-link @click="closeMenu" :to="{ name: 'HowToPlay' }"><li>How to Play</li></router-link>


                <router-link @click="closeMenu" :to="{ name: 'RegisterAlley' }"><li>Register Alley</li></router-link>

                <router-link @click="closeMenu" :to="{ name: 'Register' }"><li>Create Account</li></router-link>
                <router-link @click="closeMenu" :to="{ name: 'ViewAllScores'}"><li>View All Scores</li></router-link>


            </ul>

        </nav>
    </header>
</template>

<script setup>
function closeMenu(){
    document.querySelector('#menu-toggle').click()

}


</script>

<style scoped>

</style>