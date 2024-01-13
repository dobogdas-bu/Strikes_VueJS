<template>

    <section>
        <article>
        <h2>Create an Account</h2>
        <p>First, click <RouterLink :to="{ name: 'Register' }">here</RouterLink> to create a new account</p>
        <p>After your acount has been created you can start logging your games.</p>
        <p>Keep reading below for information about the rule and history of bowling!</p>
    </article>
    </section>
        <section id="history">
            <article>
                <h2>History of bowling</h2>
                <p>According to <a href="https://bowl.com/about-us/history-of-bowling">Bowl.com</a>, the origins of
                    bolwing can be traced back to ancient
                    Egypt (5200 BC). Another ancient relative of modern bowling has been discovered to be the Polynesian
                    game of ula maika, which also features
                    targets placed 60 feet away (which is how 10 pin is played today). Bowling at actual pins is
                    believed to have originated in Germany, and by the mid 19th
                    century in-door bowling lanes were being built across the United States in areas with large German
                    populations.
                </p>
                <p>Today, more than 67 million people bowl each year in the United States and organizational bodies such
                    as the
                    NBA (National Bowling Association) and the USBC (United States Bowling Congress), formerly the ABC
                    (American Bowling Congress),
                    have codified the rules we play by today. These groups work with the IBF (International Bowling
                    Federation) to build worldwide interest
                    in the game and organize tournaments and competitions. There are also several variations of the game
                    that are played with different sized pins
                    and balls and feature different rules, such as Duckpin, 9 pin, and Candlepin bowling.
                </p>
                <p>
                <figure>
                    <img src="images/FirstABCTournament.png" title="First ABC Bowling Tourament"
                        alt="Image of flyer from first ABC bowling tournament in 1901 in Chicago" />
                    <br>
                    <figcaption>Image of flyer from first ABC bowling tournament in 1901 in Chicago <br>
                        From <em>Bowlingmuseum.com</em></figcaption>
                </figure>
                </p>
            </article>
        </section>
        <section id="rules">
            <h2>Bowling Rules - Video</h2>
            <aside id="quote">
                <p><em>“This is not ‘Nam. This is bowling. There are rules.”</em> John Goodman, in “The Big Lebowski”
                </p>
            </aside>
            <iframe width="450" height="315" src="https://www.youtube.com/embed/QAP0FEqFEQA?si=2L2JkZae_SeX6VHp"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            <h2>Scoring Rules</h2>
            <p>
            <h3>Strike</h3>
            If you knock down all 10 pins in the first shot of a frame, you get a strike.
            How to score: A strike earns 10 points plus the sum of your next two shots.

            <h3>Spare</h3>

            If you knock down all 10 pins using both shots of a frame, you get a spare.
            How to score: A spare earns 10 points plus the sum of your next one shot.

            <h3>Open Frame</h3>

            If you do not knock down all 10 pins using both shots of your frame (9 or fewer pins knocked down), you have
            an open frame.
            How to score: An open frame only earns the number of pins knocked down.

            <h3>The 10th Frame</h3>

            The 10th frame is a bit different:
            If you roll a strike in the first shot of the 10th frame, you get 2 more shots.
            If you roll a spare in the first two shots of the 10th frame, you get 1 more shot.
            If you leave the 10th frame open after two shots, the game is over and you do not get an additional shot.
            How to Score: The score for the 10th frame is the total number of pins knocked down in the 10th frame.</p>

        </section>
        
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>