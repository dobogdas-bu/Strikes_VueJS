<template>
    <div class=time-div>
        <select class="input-form-field-time" id="timeSelect" @change="handleChange" v-model="timeSelect" required>
            <option class="input-form-field" selected disabled value="">Select Time</option>
            <option>12:00</option>
            <option>1:00</option>
            <option>1:00</option>
            <option>1:00</option>
            <option>2:00</option>
            <option>3:00</option>
            <option>4:00</option>
            <option>5:00</option>
            <option>6:00</option>
            <option>7:00</option>
            <option>8:00</option>
            <option>9:00</option>
            <option>10:00</option>
            <option>11:00</option>
        </select>
        <select class="input-form-field-amPm" id="amPm" v-model="amPm" @change="handleChange" required>
            <option class="input-form-field" selected disabled value="">AM/PM</option>
            <option>AM</option>
            <option>PM</option>
        </select>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['updateOpen','updateClose'])
const { open, close} = defineProps(['open', 'close'])
const timeSelect = ref('')
let openClose=null
let amPm = ref('')



function handleChange() {
    if (open){
        openClose= open
        emit('updateOpen', {time: timeSelect.value, openClose: openClose, amPm:amPm.value})

    } 
    if (close){
        openClose=close
        emit('updateClose', {time: timeSelect.value, openClose: openClose, amPm: amPm.value})

    } 
    


}


</script>

<style scoped></style>