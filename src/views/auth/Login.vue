<template>
    <form>
        <h2>Login</h2>
        <div class="div-form-component">
        <label for="email" class="input-form-field"></label><input type="email" id="email" placeholder="Email" v-model="email">
        
        </div>
        <div class="div-form-component">
            <label for="password" class="input-form-field"></label>
        <input type="password" placeholder="Password" id="password" v-model="password">
        </div>
        <button>Log In</button>

    </form>
    
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>