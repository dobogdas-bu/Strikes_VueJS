<template>
    <section>
        <article id="about">
            <h2>About</h2>
            <p>This site was made to provide bowling enthusiasts with information on anything and everything related
                to bowling. Eventually the site will be upgraded to include
                functionality for scoring and tracking games as well as sharing and connecting with fellow bowlers.
            </p>
            <p>To get started bowling, you will need to purchase or rent the following items at your local bowling
                alley:</p>
            <ul>
                <li>Bowling Shoes</li>
                <li>Bowling Ball</li>
            </ul>

            <label @click="expand" class="expand">Expand
                <span v-if="expanded" id="icon" class="material-symbols-outlined">expand_less</span>
                <span v-else id="icon" class="material-symbols-outlined">expand_more</span></label>

            <div v-if="expanded">
                <figure class="image-container">
                    <img src="../assets/images/red-bowling-ball-bowling-shoes.jpg" title="Gear"
                        alt="Image of bowling shoes and ball">
                    <br>
                    <figcaption>Image by <a
                            href="https://www.freepik.com/free-photo/red-bowling-ball-bowling-shoes_5974682.htm#query=bowling%20gear&position=7&from_view=search&track=ais">Freepik</a>
                    </figcaption>
                </figure>

            </div>

        </article>
    </section>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'About',
    components: {

    },
    setup() {

        const expanded = ref(false)
        const iconContent = ref('expand_more')



        const expand = () => {            
            iconContent.value=('expand_less')

            expanded.value = !expanded.value
        }
        return { expanded, expand, iconContent }
    }

}


</script>

<style></style>