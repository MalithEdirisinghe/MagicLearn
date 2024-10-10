import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For FontAwesome icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // For MaterialIcons
import * as Speech from 'expo-speech'; // For speech functionality
import { Audio } from 'expo-av'; // For recording and playback
import { Base_url1, Base_url2 } from './baseUrl';

const ListenLesson = ({ route, navigation }) => {
    const { lessonTitle } = route.params;

    // Lesson content text
    const lessons = {
        'Getting Dressed': `
            Let’s have fun getting dressed in the morning! First, you get to choose your clothes. You might pick a soft t-shirt that feels smooth and a pair of comfy pants. Imagine how nice it will feel to wear them! Start by putting on your t-shirt; pull it over your head and slide your arms into the sleeves. Next, put on your pants, one leg at a time. How cozy do they feel? Finally, don’t forget your socks to keep your feet warm and shoes to protect your toes. Now you’re all dressed and ready for a great day!
        `,
        'Brushing Your Teeth': `
            It’s time to keep your smile bright and happy! First, pick up your toothbrush. Feel the bristles; they’re soft but strong. Now, squeeze a little bit of toothpaste onto the bristles. Brush your teeth by moving the brush in small circles all over your teeth. Can you feel the bubbles from the toothpaste? Make sure you brush each tooth, even the ones at the back. When you’re done, rinse your mouth with water and spit it out. Doesn’t your mouth feel fresh and clean?
        `,
        'Eating Breakfast': `
            Breakfast is the most important meal of the day! Let’s start by sitting at the table. Feel your plate and utensils in front of you. Maybe you have a spoon and a bowl of cereal. Listen to the sound of the cereal crunching as you eat. If you have toast, you can spread some butter on it. Doesn’t it smell good? After eating, don’t forget to drink some water or milk. Your tummy is now full, and you’re ready to play and learn!
        `,
        'Washing Hands': `
            Washing your hands can be fun! First, turn on the water and feel it with your hands. Is it warm? Now, put some soap on your hands and rub them together. Feel the soap turning into bubbles as you scrub the front and back of your hands, and between your fingers. When you’re done, rinse the soap off with water. Doesn’t that feel nice? Dry your hands with a soft towel, and now they’re squeaky clean!
        `,
        'Going to Bed': `
            Let’s get ready for a good night’s sleep! First, change into your soft pajamas. How comfy do they feel? Next, brush your teeth and wash your face. Maybe you’ll listen to a bedtime story or a calming song. Now, it’s time to get into bed. Pull up the covers so you feel warm and cozy. Close your eyes, and think about all the fun things you did today. Soon you’ll drift off to sleep and have sweet dreams!
        `,
        'Dog': `
            Let’s learn about dogs! Dogs are friendly animals that often live with people as pets. They come in many sizes and colors. Dogs have four legs and a tail. They like to play and bark. When a dog is happy, it wags its tail. Dogs can also fetch toys or go for walks with you. They have a special nose that helps them smell things from far away.
        `,
        'Cat': `
            Now, let’s learn about cats! Cats are small pets with soft fur. They have four legs and a long tail. Cats like to purr when they are happy, and they can also meow to talk. Cats are good at climbing and jumping. They love to chase toys and sometimes they like to nap in sunny spots.
        `,
        'Cow': `
            Let’s talk about cows! Cows are large animals that often live on farms. They have four legs and a big, round body. Cows have a long tail and they make a sound called ‘moo.’ They eat grass and give us milk. Cows usually have big eyes and a gentle nature.
        `,
        'Parrot': `
            Now, let’s learn about parrots! Parrots are colorful birds that can talk and mimic sounds. They have feathers of many bright colors like green, red, and blue. Parrots have two legs and a beak that they use to eat seeds and fruits. They are very smart and love to play with toys.
        `,
        'Chicken': `
            Let’s learn about chickens! Chickens are birds that live on farms and lay eggs. They have two legs and a beak. Chickens make a sound called ‘cluck.’ They like to peck at the ground to find food like seeds and insects. Chickens also have feathers and like to roost on perches.
        `,
        'Washing Hands': `
            Let’s learn about washing our hands! Washing your hands is very important to keep them clean and free from germs. Germs are tiny things that can make us sick, but we can’t see them. We should wash our hands with soap and water before eating, after playing outside, or after using the bathroom. When you wash your hands, you should rub them together with soap, and don’t forget to clean between your fingers and under your nails. Clean hands help us stay healthy!
        `,
        'Brushing Teeth': `
            Let’s talk about brushing our teeth! Brushing your teeth helps keep them clean and strong. We should brush our teeth in the morning after waking up and at night before going to bed. Use a toothbrush and toothpaste to scrub all of your teeth, front and back, and don’t forget your tongue too! Brushing your teeth helps prevent cavities, which can hurt. Clean teeth help us smile brightly!
        `,
        'Taking a Bath': `
            Let’s learn about taking a bath! Taking a bath helps us stay clean and smell good. We should take a bath every day, especially after we’ve played outside or before going to bed. When you take a bath, use soap to wash your body, and shampoo to clean your hair. Don’t forget to scrub your armpits, legs, and feet too! A clean body makes us feel fresh and happy.
        `,
        'Keeping Nails Trimmed': `
            Let’s talk about our nails! Our nails grow on our fingers and toes. It’s important to keep them trimmed so they don’t get too long or dirty. Long nails can collect dirt and germs, and they can even hurt if they get too long. A grown-up can help you trim your nails with a nail clipper. Clean and trimmed nails are healthy nails!
        `,
        'Wearing Clean Clothes': `
            Let’s learn about wearing clean clothes! Wearing clean clothes is important to feel fresh and stay healthy. After we take a bath, we should put on clean clothes that don’t have any dirt or sweat on them. Wearing the same clothes every day can make us smell bad and might even cause our skin to feel itchy. So, it’s good to change into clean clothes every day!
        `,
        'Saying “Please” and “Thank You”': `
            Let’s learn how to be polite! When we ask for something, it’s always nice to say 'please.' For example, if you want a toy, you can say, 'Can I have the toy, please?' When someone gives you something, it’s important to say 'thank you' to show that you appreciate it. Saying 'please' and 'thank you' makes people feel good and shows that you have good manners!
        `,
        'Greeting People': `
            Let’s talk about how to greet people! When we meet someone, it’s polite to say 'hello' or 'hi.' If it’s morning, you can say 'good morning,' and if it’s afternoon, you can say 'good afternoon.' Greeting people with a smile and a kind word shows that you are friendly and happy to see them. Remember, everyone likes to be greeted with a nice word!
        `,
        'Taking Turns': `
            Let’s learn about taking turns! When you play with friends or talk in a group, it’s important to take turns. This means letting others go first sometimes and waiting for your turn patiently. For example, if you’re playing a game, let your friend go first, and then it will be your turn. Taking turns shows that you care about others and are being fair.
        `,
        'Asking for Help': `
            Let’s learn how to ask for help! Sometimes we might need help with something, like tying our shoes or reaching for something high. It’s okay to ask for help when you need it. You can say, 'Can you help me, please?' or 'I need help with this, please.' Asking for help is a good way to learn new things and shows that you are not afraid to ask when you need something.
        `,
        'Saying “Sorry”': `
            Let’s talk about saying 'sorry.' Sometimes we might do something by accident that could hurt someone’s feelings or make them sad, like bumping into them or taking their toy. When this happens, it’s important to say 'sorry' to show that you didn’t mean to hurt them. Saying 'sorry' helps people feel better and shows that you care about their feelings.
        `,
        'The Sound of Rain': `
            Let’s learn about the sound of rain! Rain is what happens when water falls from the sky. When it rains, you can hear a gentle patter on the roof or the ground. It can sound like a soft drumming. Rain helps plants grow and keeps everything fresh. Sometimes, after the rain, you might hear birds singing happily.
        `,
        'The Sound of the Wind': `
            Let’s talk about the sound of the wind! Wind is air that moves around us. Sometimes, the wind is soft, and you might hear a gentle whooshing sound. Other times, the wind can be strong and make a loud, howling noise. Wind can make the leaves on trees rustle and move the branches. It’s like nature’s breath!
        `,
        'The Sound of Birds Chirping': `
            Let’s listen to the sound of birds chirping! Birds make chirping sounds when they are happy, looking for food, or talking to other birds. Each bird has its own special chirp. Some birds sing in the morning to greet the new day, and others chirp in the evening before they go to sleep. Bird sounds can be cheerful and make you smile!
        `,
        'The Sound of Thunder': `
            Let’s learn about the sound of thunder! Thunder is a loud noise that happens during a storm. It comes after lightning, which is a bright flash in the sky. Thunder can sound like a big drum or a loud boom. Sometimes, it can be a little scary, but it’s just a sound that shows there’s a storm in the sky.
        `,
        'The Sound of Ocean Waves': `
            Let’s explore the sound of ocean waves! Ocean waves make a calming sound as they move back and forth. You might hear a gentle whoosh as the waves wash onto the shore. The sound of waves can help you feel relaxed and peaceful. Waves are like the ocean’s way of talking to us.
        `,
        'Describing Fruits by Texture and Taste': `
        Today, we’re going to learn about fruits! Let’s start by describing how some fruits feel and taste. Imagine a fruit that is round, smooth, and often red. It’s crunchy when you bite into it and tastes sweet or sometimes a little sour. What fruit do you think this is? Yes, it’s an apple! Now, think of a fruit that is soft, yellow on the inside, and has a thick, peelable skin. It’s sweet and comes in a bunch. What fruit is that? A banana!
    `,
        'Recognizing Vegetables by Their Shape and Feel': `
        Now, let’s talk about vegetables! Imagine a vegetable that is long, green, and crunchy when raw. It’s often used in salads or sandwiches. What vegetable could this be? That’s right, a cucumber! Next, think of a vegetable that is round, has a thick skin, and comes in many colors like orange, yellow, and green. It’s sweet when cooked and is often eaten as a side dish. Can you guess what it is? It’s a bell pepper!
    `,
        'Identifying Fruits by Their Smell': `
        Fruits often have a special smell! Let’s identify some by their scent. Imagine a fruit that smells sweet, is small, round, and red. It’s juicy and often used in desserts. What fruit is this? A strawberry! Now, think of a fruit with a strong, tangy smell, and is yellow on the outside with a juicy, sour taste. What fruit could that be? It’s a lemon!
    `,
        'Understanding Vegetables by Their Taste': `
        Vegetables have different tastes. Let’s identify some by how they taste. Imagine a vegetable that is green, leafy, and slightly bitter. It’s often used in salads and is very healthy. What vegetable is this? It’s spinach! Now, think of a vegetable that is orange, crunchy when raw, and sweet. It’s often eaten raw or cooked and is good for your eyes. What is it? A carrot!
    `,
        'Matching Fruits and Vegetables to Their Descriptions': `
        Let’s practice matching fruits and vegetables to their descriptions! I’ll describe a fruit or vegetable, and you can guess what it is. This fruit is yellow, soft, and sweet when ripe. It’s often used in smoothies and desserts. What is it? A banana! Now, this vegetable is red, juicy, and often used in salads or sauces. What could it be? A tomato!
    `,
        'Introduction to Simple Patterns': `
    Today, we’re going to learn about patterns! A pattern is something that repeats in a certain order. Let’s start with a simple pattern. Listen carefully: Clap, tap, clap, tap. Did you hear that? The pattern is clap, tap, clap, tap. It repeats the same way every time. Now, let’s try it together. Clap, tap, clap, tap! Great job! Can you guess what comes next if the pattern is clap, tap, clap?
`,
        'Recognizing and Continuing Patterns': `
    Now that you know what a pattern is, let’s practice recognizing and continuing patterns. Listen to this: Bell, whistle, bell, whistle, bell. Can you tell what comes next? That’s right! The whistle comes next because the pattern is bell, whistle, bell, whistle. Patterns can be made with sounds, objects, or even actions. Let’s try another one: Stomp, clap, stomp, clap, stomp. What comes next?
`,
        'Creating Your Own Patterns': `
    Let’s create our own patterns! Imagine you have some blocks: red, blue, red, blue. What color comes next? Red! You just created a pattern! Patterns can be as simple or as tricky as you want. Let’s make another one with different sounds: Ding, ding, dong, ding, ding, dong. Now, can you guess what comes next? Yes, it’s ding, ding, and then dong again! You’re doing great!
`,
        'Understanding Sequences': `
    Now, let’s talk about sequences. A sequence is like a pattern, but it’s about the order in which things happen. For example, think about your day: First, you wake up, then you brush your teeth, and then you eat breakfast. That’s a sequence! Let’s try to sequence some activities together. What do you do first: Put on your shoes or tie them? You put them on first, then you tie them!
`,
        'Practice with Patterns and Sequences': `
    Let’s practice some more with patterns and sequences. Listen to this pattern: Meow, bark, meow, bark. What comes next? That’s right, meow! Now let’s do a sequence: First, you eat lunch, then you play, and then you take a nap. What do you do after playing? You take a nap! Remember, patterns repeat and sequences tell us what happens next.
`,
        'Introduction to the Head and Face': `
    Today, we’re going to learn about the parts of your head and face! On your face, you have two eyes. Your eyes help you see everything around you, like colors, shapes, and people. You also have a nose. Your nose helps you smell things, like flowers, food, and fresh air. Below your nose, there’s your mouth, which helps you talk, eat, and taste. And on the sides of your head, you have ears that help you hear sounds, like music and voices.
`,
        'Understanding the Arms and Hands': `
    Let’s talk about your arms and hands! You have two arms, one on each side of your body. Your arms help you lift, carry, and hold things. At the end of your arms, you have hands. Your hands have fingers that help you touch, feel, and pick things up. Your hands are also great for clapping and waving!
`,
        'Learning About the Legs and Feet': `
    Now, let’s learn about your legs and feet! You have two legs that help you stand, walk, and run. Your legs are strong and can carry you wherever you want to go. At the end of your legs, you have feet. Your feet help you balance and move. Your toes, which are part of your feet, help you stay steady when you stand or walk.
`,
        'Exploring the Heart and Lungs': `
    Let’s talk about some very important parts inside your body: the heart and lungs. Your heart is like a pump that moves blood around your body, giving you energy and helping you stay alive. Your lungs help you breathe in air and give your body the oxygen it needs. Every time you take a breath, your lungs fill with air, and when you breathe out, your lungs empty.
`,
        'Understanding the Stomach and Digestive System': `
    Now, let’s learn about your stomach and how it helps you digest food. Your stomach is where the food you eat goes to be broken down into energy. After you eat, your stomach works hard to turn the food into something your body can use to grow and stay strong. The food moves through a special system in your body called the digestive system, which helps you get all the good things from the food you eat.
`,
        'Understanding Numbers': `
    Today, we’re going to learn about numbers with some yummy fruits! Numbers help us count things, like apples, bananas, and oranges. Let’s start with the number one. Imagine you have one apple in your hand. You can feel it and maybe even smell it. One apple means just one fruit, not two or three, just one. Now, if I give you another apple, you have two apples. Two apples are more than one apple. Now, let’s add one more apple, and now you have three apples! See how the number gets bigger as you get more apples? Numbers help us know how many of something we have. Let’s try counting to five using apples: One, two, three, four, five! Great job!
`,
        'Understanding Numbers (5 to 10)': `
    Now that you know how to count to five, let’s keep going! Imagine you have five bananas in front of you. You can count them: one, two, three, four, five. But what if we add one more banana? Now you have six bananas! Let’s keep adding bananas. If you add one more, you’ll have seven bananas. Adding another makes eight, then nine, and finally ten bananas! So now you have ten bananas in total. Great job! Numbers help us know how many bananas—or anything else—we have!
`,
        'Understanding More and Less': `
    Today, we’re going to learn about more and less by thinking about sharing with friends. Imagine you’re at a party with your friends, and you all have some cookies. You have five cookies, and your friend has two cookies. If you look at your cookies and your friend’s cookies, you have more cookies because five is more than two. Now, imagine your other friend has seven cookies. They have more cookies than you because seven is more than five. But if you have one cookie, and your friend has three, then you have less because one is less than three. So, more means you have a bigger amount, and less means you have a smaller amount.
`,
        'Understanding Morning, Afternoon, Evening, and Night': `
    Let’s talk about the different times of the day! First, there’s morning. Morning is when you wake up, brush your teeth, and eat breakfast. The sun is rising, and it’s a new day! After the morning comes the afternoon. The sun is high in the sky, and it’s time for lunch. You might play or learn new things in the afternoon. Next is the evening. The sun starts to set, and it’s time to have dinner. Finally, we have nighttime. The sky is dark, and it’s time to sleep and rest for the next day.
`,
        'Understanding Days of the Week': `
    Now let’s learn about the days of the week! Every week has seven days. We start with Monday. Monday is the first day when many people go to school or work. After Monday, there’s Tuesday. Tuesday comes after Monday. Then comes Wednesday, which is right in the middle of the week. Next is Thursday, followed by Friday. Friday is exciting because it’s the last day before the weekend! The weekend has two days: Saturday and Sunday. On Saturday, many people play, relax, or have fun. Sunday is often a day to rest before starting a new week.
`,
        'Understanding Daily Activities with Time': `
    Let’s talk about what we do at different times of the day! In the morning, you wake up and get ready for the day. You might eat breakfast and go to school. In the afternoon, you have lunch, and maybe you play outside or learn something new. In the evening, you come home, have dinner with your family, and get ready for bed. At night, you sleep, so you’re ready for another day. Every time of day has something special we do!
`,
        'Understanding Special Days of the Week': `
    Some days of the week are extra special! Let’s think about Friday. On Friday, many people are happy because the weekend is almost here. It’s a day to finish your work or school and get ready for fun. Saturday is often a play day. You might visit friends, go to the park, or play your favorite games. Then comes Sunday. Sunday is a day to relax and get ready for the new week. It’s a day when many people spend time with their family or rest at home.
`,
        'Learning About Sri Lanka': `
    Today, we are learning about Sri Lanka. Sri Lanka is a beautiful island in the Indian Ocean. An island is a piece of land surrounded by water. Sri Lanka is known for its lovely beaches and green forests. The capital city of Sri Lanka is Sri Jayawardenepura Kotte, but Colombo is a major city too. Our national animal is the Giant squirrel, and our national bird is the Jungle Fowl. The most popular sport in Sri Lanka is cricket. We speak Sinhala, Tamil, and English. Sri Lanka is famous for its tea, rice, and curry. The national flag has a golden lion holding a sword, symbolizing bravery.
`,
        'Introduction to Continents': `
    Today, we’re learning about continents. A continent is a very large area of land. There are seven continents in the world: Africa, Antarctica, Asia, Europe, North America, Oceania, and South America. Africa is known for its big deserts and wild animals. Antarctica is very cold and covered in ice. Asia is the biggest continent and has many people and countries. Europe has many old buildings and is rich in history. North America includes countries like the United States and Canada. Oceania is made up of many islands, including Australia. South America is known for its rainforests and beautiful landscapes.
`,
        'Learning About Oceans': `
    Today, we’ll learn about oceans. Oceans are very large bodies of water that cover most of the Earth. There are five main oceans: the Pacific Ocean, the Atlantic Ocean, the Indian Ocean, the Southern Ocean, and the Arctic Ocean. The Pacific Ocean is the biggest and deepest ocean. The Atlantic Ocean is known for its big waves and busy shipping routes. The Indian Ocean is warm and is surrounded by Africa, Asia, and Australia. The Southern Ocean is around Antarctica and is very cold. The Arctic Ocean is the smallest and is covered with ice.
`,
        'Famous Landmarks Around the World': `
    Today, we’ll talk about famous landmarks around the world. Landmarks are special places that are famous and important. The Eiffel Tower in France is a tall metal tower and is known for its beautiful lights. The Great Wall of China is a long wall built to protect people and stretches across China. The Pyramids of Egypt are huge stone structures built as tombs for ancient kings. The Statue of Liberty in the United States is a big statue that represents freedom. The Sydney Opera House in Australia is a famous building with a unique shape like sails.
`

    };

    const quizzes = {
        'Washing Hands': [
            { question: "What should we use to wash our hands?", answer: "Soap." },
            { question: "What are we trying to get rid of when we wash our hands?", answer: "Germs." },
            { question: "When should we wash our hands?", answer: "Before eating." },
            { question: "What helps us stay healthy?", answer: "Clean hands." }
        ],
        'Getting Dressed': [
            { question: "What do you put on after your t-shirt?", answer: "Pants." },
            { question: "What goes on your feet before shoes?", answer: "Socks." },
            { question: "What do you pull over your head?", answer: "T-shirt." },
            { question: "What keeps your toes safe?", answer: "Shoes." }
        ],
        'Brushing Your Teeth': [
            { question: "What do you put on the toothbrush?", answer: "Toothpaste." },
            { question: "How do you move the toothbrush?", answer: "Circles." },
            { question: "What do you feel when you brush?", answer: "Bubbles." },
            { question: "What do you rinse with?", answer: "Water." }
        ],
        'Eating Breakfast': [
            { question: "What do you use to eat cereal?", answer: "Spoon." },
            { question: "What do you spread on toast?", answer: "Butter." },
            { question: "What should you drink after breakfast?", answer: "Water." },
            { question: "What meal is this?", answer: "Breakfast." }
        ],
        'Going to Bed': [
            { question: "What do you wear to bed?", answer: "Pajamas." },
            { question: "What do you wash before bed?", answer: "Face." },
            { question: "What do you listen to before sleeping?", answer: "Story." },
            { question: "What do you do last before sleeping?", answer: "Close eyes." }
        ],

        'Brushing Teeth': [
            { question: "What should we use to clean our teeth?", answer: "Toothbrush." },
            { question: "When should we brush our teeth?", answer: "Morning." },
            { question: "What can brushing our teeth prevent?", answer: "Cavities." },
            { question: "What do clean teeth help us do?", answer: "Smile." }
        ],
        'Taking a Bath': [
            { question: "What should we do to stay clean?", answer: "Take a bath." },
            { question: "What do we use to wash our hair?", answer: "Shampoo." },
            { question: "When should we take a bath?", answer: "Every day." },
            { question: "How does a clean body make us feel?", answer: "Fresh." }
        ],
        'Keeping Nails Trimmed': [
            { question: "What should we do to our nails?", answer: "Trim." },
            { question: "What can long nails collect?", answer: "Dirt." },
            { question: "Who can help you trim your nails?", answer: "Grown-up." },
            { question: "How should our nails be?", answer: "Clean." }
        ],
        'Wearing Clean Clothes': [
            { question: "What should we wear after taking a bath?", answer: "Clean clothes." },
            { question: "Why should we change clothes every day?", answer: "Stay healthy." },
            { question: "What can happen if we wear the same clothes every day?", answer: "Smell bad." },
            { question: "What do clean clothes help us feel?", answer: "Fresh." }
        ],
        'Saying “Please” and “Thank You”': [
            { question: "What word should you say when you ask for something?", answer: "Please." },
            { question: "What word do you say when someone gives you something?", answer: "Thank you." },
            { question: "Why should we say 'please'?", answer: "Be polite." },
            { question: "How do we show appreciation?", answer: "Thank you." }
        ],
        'Cow': [
            { question: "What sound does a cow make?", answer: "Moo." },
            { question: "What do cows give us?", answer: "Milk." },
            { question: "How many legs does a cow have?", answer: "Four." },
            { question: "What do cows eat?", answer: "Grass." }
        ],

        'Parrot': [
            { question: "What do parrots use to eat seeds and fruits?", answer: "Beak." },
            { question: "How many legs does a parrot have?", answer: "Two." },
            { question: "What can parrots do that is special?", answer: "Talk." },
            { question: "What colors can parrots have?", answer: "Green, red, blue." }
        ],

        'Chicken': [
            { question: "What sound does a chicken make?", answer: "Cluck." },
            { question: "What do chickens lay?", answer: "Eggs." },
            { question: "How many legs does a chicken have?", answer: "Two." },
            { question: "What do chickens peck at to find food?", answer: "Ground." }
        ],

        'Greeting People': [
            { question: "What do you say when you meet someone?", answer: "Hello." },
            { question: "What should you say in the morning?", answer: "Good morning." },
            { question: "How do you show that you are friendly?", answer: "Smile." },
            { question: "What is a kind way to greet someone in the afternoon?", answer: "Good afternoon." }
        ],
        'Taking Turns': [
            { question: "What is important to do when playing with friends?", answer: "Take turns." },
            { question: "What should you do while waiting for your turn?", answer: "Be patient." },
            { question: "What does taking turns show?", answer: "Fairness." },
            { question: "Who should go first sometimes?", answer: "Friend." }
        ],
        'Asking for Help': [
            { question: "What should you do if you need help?", answer: "Ask." },
            { question: "What can you say to ask for help?", answer: "Can you help me?" },
            { question: "Why is it good to ask for help?", answer: "Learn." },
            { question: "What word can you use when asking for help?", answer: "Please." }
        ],
        'Saying “Sorry”': [
            { question: "What should you say if you hurt someone’s feelings?", answer: "Sorry." },
            { question: "Why do we say 'sorry'?", answer: "Care." },
            { question: "What does saying 'sorry' help with?", answer: "Feel better." },
            { question: "When should you say 'sorry'?", answer: "Accident." }
        ],
        'Cat': [
            { question: "What sound does a cat make when it is happy?", answer: "Purr." },
            { question: "How many legs does a cat have?", answer: "Four." },
            { question: "What can cats do very well?", answer: "Climb." },
            { question: "What do cats like to do in sunny spots?", answer: "Nap." }
        ],

        'The Sound of Rain': [
            { question: "What falls from the sky when it rains?", answer: "Water." },
            { question: "What sound does rain make?", answer: "Patter." },
            { question: "What does rain help to grow?", answer: "Plants." },
            { question: "What might you hear after it rains?", answer: "Birds." }
        ],
        'The Sound of the Wind': [
            { question: "What is wind?", answer: "Air." },
            { question: "What sound does soft wind make?", answer: "Whooshing." },
            { question: "What sound does strong wind make?", answer: "Howling." },
            { question: "What does the wind move?", answer: "Leaves." }
        ],
        'The Sound of Birds Chirping': [
            { question: "What do birds do when they are happy?", answer: "Chirp." },
            { question: "When do birds sing to greet the day?", answer: "Morning." },
            { question: "What might birds do in the evening?", answer: "Chirp." },
            { question: "How do bird sounds make you feel?", answer: "Cheerful." }
        ],
        'The Sound of Thunder': [
            { question: "What sound do you hear during a storm?", answer: "Thunder." },
            { question: "What comes before thunder?", answer: "Lightning." },
            { question: "What does thunder sound like?", answer: "Boom." },
            { question: "What is thunder a sign of?", answer: "Storm." }
        ],
        'The Sound of Ocean Waves': [
            { question: "What sound do ocean waves make?", answer: "Whoosh." },
            { question: "Where do waves wash onto?", answer: "Shore." },
            { question: "How can the sound of waves make you feel?", answer: "Relaxed." },
            { question: "What is the ocean doing when it makes wave sounds?", answer: "Talking." }
        ],
        'Describing Fruits by Texture and Taste': [
            { question: "Which fruit is round, smooth, often red, and can be crunchy and sweet?", answer: "An apple." },
            { question: "Which fruit is soft, yellow on the inside, has a thick peel, and comes in a bunch?", answer: "A banana." },
            { question: "Which fruit is often red or green, with a smooth skin, and can be sweet or sour?", answer: "An apple." },
            { question: "Which fruit is long, yellow, and can be peeled before eating?", answer: "A banana." }
        ],
        'Recognizing Vegetables by Their Shape and Feel': [
            { question: "Which vegetable is long, green, and crunchy when raw?", answer: "A cucumber." },
            { question: "Which vegetable is round, has thick skin, and can be orange, yellow, or green?", answer: "A bell pepper." },
            { question: "Which vegetable is often sliced and put in sandwiches for a fresh, cool taste?", answer: "A cucumber.." },
            { question: "Which vegetable can be found in multiple colors and has a sweet taste when cooked?", answer: "A bell pepper." },
        ],
        'Identifying Fruits by Their Smell': [
            { question: "Which small, round, red fruit smells sweet and is often used in desserts?", answer: "A strawberry." },
            { question: "Which fruit has a strong, tangy smell and is yellow with a sour taste?", answer: "A lemon." },
            { question: "Which fruit is often used to make lemonade because of its sour taste?", answer: "A lemon." },
            { question: "Which fruit is small, red, and often used to make jam?", answer: "A strawberry." },
        ],
        'Understanding Vegetables by Their Taste': [
            { question: "Which green, leafy vegetable is slightly bitter and often used in salads?", answer: "Spinach." },
            { question: "Which orange vegetable is crunchy when raw and sweet?", answer: "A carrot." },
            { question: "Which vegetable is often added to green smoothies because it’s so healthy?", answer: "Spinach." },
            { question: "Which vegetable is orange and is often said to be good for your eyesight?", answer: "A carrot." },
        ],
        'Matching Fruits and Vegetables to Their Descriptions': [
            { question: "Which fruit is yellow, soft, and sweet when ripe?", answer: "A banana." },
            { question: "Which red, juicy vegetable is often used in salads or sauces?", answer: "A tomato." },
            { question: "Which fruit is often peeled before eating and is a popular snack?", answer: "A banana." },
            { question: "Which vegetable is commonly found in ketchup and is also a fruit?", answer: "A tomato." },
        ],
        'Introduction to Simple Patterns': [
            { question: "If the pattern is clap, tap, clap, what comes next?", answer: "Tap." }
        ],
        'Recognizing and Continuing Patterns': [
            { question: "If the pattern is bell, whistle, bell, whistle, what comes next?", answer: "Whistle." },
            { question: "If the pattern is stomp, clap, stomp, clap, what comes next?", answer: "Stomp." }
        ],
        'Creating Your Own Patterns': [
            { question: "If your pattern is red, blue, red, blue, what comes next?", answer: "Red." },
            { question: "If the pattern is ding, ding, dong, ding, ding, what comes next?", answer: "Dong." }
        ],
        'Understanding Sequences': [
            { question: "What do you do first: Put on your shoes or tie them?", answer: "Put on your shoes." },
            { question: "If you wake up, brush your teeth, and eat breakfast, what comes after brushing your teeth?", answer: "Eat breakfast." }
        ],
        'Practice with Patterns and Sequences': [
            { question: "If the pattern is meow, bark, meow, what comes next?", answer: "Bark." },
            { question: "If you eat lunch, play, and then take a nap, what do you do after playing?", answer: "Take a nap." }
        ],
        'Introduction to the Head and Face': [
            { question: "Which part of your face helps you see colors, shapes, and people?", answer: "Eyes." },
            { question: "Which part of your face helps you smell things like flowers and food?", answer: "Nose." },
            { question: "Which part of your face helps you talk, eat, and taste?", answer: "Mouth." },
            { question: "Which part of your head helps you hear sounds like music and voices?", answer: "Ears." }
        ],
        'Understanding the Arms and Hands': [
            { question: "How many arms do you have, and what do they help you do?", answer: "Two arms, and they help you lift, carry, and hold things." },
            { question: "What is at the end of your arms that helps you touch and pick things up?", answer: "Hands." },
            { question: "How many fingers do you have on each hand?", answer: "Five fingers." },
            { question: "What are your hands great for besides touching and picking things up?", answer: "Clapping and waving." }
        ],
        'Learning About the Legs and Feet': [
            { question: "How many legs do you have, and what do they help you do?", answer: "Two legs, and they help you stand, walk, and run." },
            { question: "What is at the end of your legs that helps you balance and move?", answer: "Feet." },
            { question: "How many toes do you have on each foot?", answer: "Five toes." },
            { question: "What do your toes help you do when you stand or walk?", answer: "Stay steady." }
        ],
        'Exploring the Heart and Lungs': [
            { question: "Which part of your body is like a pump that moves blood around?", answer: "Heart." },
            { question: "Which part of your body helps you breathe in air?", answer: "Lungs." },
            { question: "What does your heart give your body to help you stay alive?", answer: "Energy." },
            { question: "What do your lungs give your body every time you breathe in?", answer: "Oxygen." }
        ],
        'Understanding the Stomach and Digestive System': [
            { question: "Which part of your body helps break down food into energy?", answer: "Stomach." },
            { question: "Where does the food you eat go after you swallow it?", answer: "To your stomach." },
            { question: "What is the special system in your body that helps you get the good things from food?", answer: "Digestive system." },
            { question: "Why is it important for your stomach to break down food?", answer: "To give your body energy and help it stay strong." }
        ],
        'Understanding Numbers': [
            { question: "If you have one apple, how many fruits do you have?", answer: "One." },
            { question: "If you have three apples, how many apples do you have?", answer: "Three." },
            { question: "Can you count to five with me using apples?", answer: "Five." },
            { question: "What do numbers help us do?", answer: "Count." }
        ],
        'Understanding Numbers (5 to 10)': [
            { question: "If you have six bananas, how many bananas do you have?", answer: "Six." },
            { question: "If you add one more to nine bananas, how many do you have?", answer: "Ten." },
            { question: "Can you count from five to ten with me using bananas?", answer: "Five, six, seven, eight, nine, ten." },
            { question: "What do numbers help us do?", answer: "Count." }
        ],
        'Understanding More and Less': [
            { question: "If you have five cookies and your friend has two, who has more?", answer: "You." },
            { question: "If your friend has seven cookies and you have five, who has more?", answer: "Friend." },
            { question: "If you have one cookie and your friend has three, who has less?", answer: "You." },
            { question: "What does it mean if you have less?", answer: "Smaller amount." }
        ],
        'Understanding Morning, Afternoon, Evening, and Night': [
            { question: "What time of day do you eat breakfast?", answer: "Morning." },
            { question: "When is the sun high in the sky?", answer: "Afternoon." },
            { question: "What time of day do you have dinner?", answer: "Evening." },
            { question: "What time of day do you sleep?", answer: "Night." }
        ],
        'Understanding Days of the Week': [
            { question: "What is the first day of the week?", answer: "Monday." },
            { question: "What day comes after Tuesday?", answer: "Wednesday." },
            { question: "What are the days of the weekend?", answer: "Saturday and Sunday." },
            { question: "What day comes before Saturday?", answer: "Friday." }
        ],
        'Understanding Daily Activities with Time': [
            { question: "When do you wake up and get ready for the day?", answer: "Morning." },
            { question: "When do you eat lunch and play outside?", answer: "Afternoon." },
            { question: "When do you eat dinner with your family?", answer: "Evening." },
            { question: "When do you sleep?", answer: "Night." }
        ],
        'Understanding Special Days of the Week': [
            { question: "What day is just before the weekend?", answer: "Friday." },
            { question: "What day do many people play and have fun?", answer: "Saturday." },
            { question: "What day is for resting before the new week?", answer: "Sunday." },
            { question: "What comes after Saturday?", answer: "Sunday." }
        ],
        'Learning About Sri Lanka': [
            { question: "What kind of land is Sri Lanka?", answer: "An island." },
            { question: "What ocean is Sri Lanka in?", answer: "The Indian Ocean." },
            { question: "What is the capital city of Sri Lanka?", answer: "Sri Jayawardenepura Kotte." },
            { question: "What is the national animal of Sri Lanka?", answer: "Giant squirrel." },
            { question: "What is the most popular sport in Sri Lanka?", answer: "Cricket." }
        ],
        'Introduction to Continents': [
            { question: "How many continents are there in the world?", answer: "Seven." },
            { question: "Which continent is known for its big deserts and wild animals?", answer: "Africa." },
            { question: "Which continent is covered in ice and is very cold?", answer: "Antarctica." },
            { question: "Which continent includes countries like the United States and Canada?", answer: "North America." },
            { question: "Which continent is made up of many islands, including Australia?", answer: "Oceania." }
        ],
        'Learning About Oceans': [
            { question: "How many main oceans are there on Earth?", answer: "Five." },
            { question: "Which ocean is the biggest and deepest?", answer: "The Pacific Ocean." },
            { question: "Which ocean is known for its warm water and is surrounded by Africa, Asia, and Australia?", answer: "The Indian Ocean." },
            { question: "Which ocean is around Antarctica and is very cold?", answer: "The Southern Ocean." },
            { question: "Which ocean is the smallest and covered with ice?", answer: "The Arctic Ocean." }
        ],
        'Famous Landmarks Around the World': [
            { question: "Which landmark is a tall metal tower in France known for its lights?", answer: "The Eiffel Tower." },
            { question: "What is the long wall built to protect people in China called?", answer: "The Great Wall of China." },
            { question: "What are the huge stone structures built as tombs in Egypt called?", answer: "The Pyramids of Egypt." },
            { question: "Which statue in the United States represents freedom?", answer: "The Statue of Liberty." },
            { question: "Which building in Australia has a unique shape like sails?", answer: "The Sydney Opera House." }
        ]

    };



    const lessonText = lessons[lessonTitle];
    const quizData = quizzes[lessonTitle];

    const [isPlaying, setIsPlaying] = useState(false);
    const [speechRate, setSpeechRate] = useState(1.0); // Default speech rate
    const [lessonCompleted, setLessonCompleted] = useState(false); // Track lesson completion
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track quiz question
    const [recording, setRecording] = useState(null); // For storing the recording instance
    const [recordedSound, setRecordedSound] = useState(null); // For storing the playback instance
    const [isSoundPlaying, setIsSoundPlaying] = useState(false); // Track if recorded sound is playing
    const [recordedAudioUri, setRecordedAudioUri] = useState(null); // For storing recorded audio URI
    const [userAnswer, setUserAnswer] = useState(''); // Store user's answer from API

    // Play or Pause Lesson Speech
    const handleSpeechPlayPause = () => {
        if (isPlaying) {
            Speech.stop();  // Stop the speech
            setIsPlaying(false);
        } else {
            Speech.speak(lessonText, { rate: speechRate, onDone: handleSpeechEnd });  // Speak the lesson text with the selected rate
            setIsPlaying(true);
        }
    };

    // Handle lesson speech end
    const handleSpeechEnd = () => {
        setIsPlaying(false);
        setLessonCompleted(true);  // Mark lesson as completed when speech finishes
        speakQuizQuestion();  // Automatically speak the first quiz question
    };

    // Change the speech rate
    const changeSpeechRate = (rate) => {
        setSpeechRate(rate); // Update speech rate
        if (isPlaying) {
            Speech.stop();
            Speech.speak(lessonText, { rate, onDone: handleSpeechEnd });
        }
    };

    // Speak current quiz question
    const speakQuizQuestion = () => {
        const currentQuestion = quizData[currentQuestionIndex].question;
        Speech.speak(currentQuestion, { rate: speechRate });
    };

    // Replay current quiz question
    const handleReplayQuestion = () => {
        speakQuizQuestion();
    };

    // Handle next quiz question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            speakQuizQuestion(); // Speak the next question
        } else {
            Speech.stop();
            alert("Quiz Completed!");
            navigation.goBack();  // Go back after quiz is completed (or handle differently)
        }
    };

    // Start recording
    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    // Stop recording and save it
    const stopRecording = async () => {
        console.log('Stopping recording..');
        setRecording(null);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedAudioUri(uri); // Store the recorded audio URI
        console.log('Recording stopped and stored at', uri);

        // Set up for playback
        const { sound } = await recording.createNewLoadedSoundAsync();
        setRecordedSound(sound);
    };

    // Play or pause the recorded sound
    const playPauseRecordedSound = async () => {
        if (recordedSound) {
            if (isSoundPlaying) {
                console.log('Pausing recorded sound..');
                await recordedSound.pauseAsync();
                setIsSoundPlaying(false);
            } else {
                console.log('Playing recorded sound..');
                await recordedSound.playAsync();
                setIsSoundPlaying(true);

                recordedSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.didJustFinish) {
                        setIsSoundPlaying(false); // Reset play/pause button when playback finishes
                    }
                });
            }
        }
    };

    // Submit recorded audio to API
    const submitRecording = async () => {
        if (recordedAudioUri) {
            const formData = new FormData();
            formData.append('audio', {
                uri: recordedAudioUri,
                type: 'audio/m4a', // Update the type based on the recorded file format
                name: 'recorded_audio.m4a'
            });

            try {
                const response = await fetch('http://13.60.250.75/blind/transcribe', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const result = await response.json();
                console.log('API Response:', result);

                if (result && result.text) { // Update the property name here
                    setUserAnswer(result.text); // Store the transcription text
                    checkAnswer(result.text);  // Compare user's answer with correct answer
                } else {
                    Alert.alert('Error', 'No transcription found in the API response');
                }
            } catch (error) {
                console.error('Error submitting the recording:', error);
                Alert.alert('Error', 'Failed to submit recording');
            }
        } else {
            Alert.alert('Error', 'No recording available to submit');
        }
    };



    const checkAnswer = (userAnswer) => {
        if (!userAnswer) {
            Alert.alert('Error', 'No answer provided for comparison');
            return;
        }

        // Get the correct answer and remove any trailing punctuation, such as a dot.
        let correctAnswer = quizData[currentQuestionIndex].answer.toLowerCase();
        correctAnswer = correctAnswer.replace(/\.$/, ''); // Remove a trailing dot if present

        const userAnswerLower = userAnswer.toLowerCase();

        console.log("correct", correctAnswer);
        console.log("user", userAnswer);

        if (userAnswerLower === correctAnswer) {
            // If answer is correct
            Alert.alert('Correct!', 'Your answer is correct');
            Speech.speak('Your answer is correct');
        } else {
            // If answer is wrong
            Alert.alert('Incorrect', 'Your answer is incorrect');
            Speech.speak('Your answer is incorrect');
        }
    };





    // Adjust to center the text based on the screen size
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Audio Player Section */}
            {!lessonCompleted && (
                <View style={styles.audioPlayer}>
                    <Text style={styles.audioTitle}>{lessonTitle}</Text>

                    <View style={styles.audioControls}>
                        <TouchableOpacity onPress={handleSpeechPlayPause}>
                            <MaterialIcon
                                name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}  // Using MaterialIcons
                                size={50}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Speech Speed Controls */}
                    <View style={styles.speedControls}>
                        <TouchableOpacity onPress={() => changeSpeechRate(0.5)}>
                            <Text style={[styles.speedText, speechRate === 0.5 && styles.activeSpeed]}>
                                0.5x
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSpeechRate(0.75)}>
                            <Text style={[styles.speedText, speechRate === 0.75 && styles.activeSpeed]}>
                                0.75x
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSpeechRate(1.0)}>
                            <Text style={[styles.speedText, speechRate === 1.0 && styles.activeSpeed]}>
                                1x
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSpeechRate(1.5)}>
                            <Text style={[styles.speedText, speechRate === 1.5 && styles.activeSpeed]}>
                                1.5x
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeSpeechRate(2.0)}>
                            <Text style={[styles.speedText, speechRate === 2.0 && styles.activeSpeed]}>
                                2x
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Lesson Completed and Quiz */}
            {lessonCompleted && (
                <View>
                    {/* Display the current quiz question */}
                    <Text style={styles.quizQuestionText}>
                        {quizData[currentQuestionIndex].question}
                    </Text>

                    <Text style={styles.quizAnswerText}>
                        Answer: {quizData[currentQuestionIndex].answer}
                    </Text>

                    {/* Speed Controls and Replay Icon for Quiz */}
                    <View style={styles.quizControls}>
                        <TouchableOpacity onPress={handleReplayQuestion}>
                            <MaterialIcon name="replay" size={40} color="#333" />
                        </TouchableOpacity>

                        <View style={styles.speedControls}>
                            <TouchableOpacity onPress={() => changeSpeechRate(0.5)}>
                                <Text style={[styles.speedText, speechRate === 0.5 && styles.activeSpeed]}>
                                    0.5x
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeSpeechRate(0.75)}>
                                <Text style={[styles.speedText, speechRate === 0.75 && styles.activeSpeed]}>
                                    0.75x
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeSpeechRate(1.0)}>
                                <Text style={[styles.speedText, speechRate === 1.0 && styles.activeSpeed]}>
                                    1x
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeSpeechRate(1.5)}>
                                <Text style={[styles.speedText, speechRate === 1.5 && styles.activeSpeed]}>
                                    1.5x
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeSpeechRate(2.0)}>
                                <Text style={[styles.speedText, speechRate === 2.0 && styles.activeSpeed]}>
                                    2x
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Microphone Icon to Start/Stop Recording */}
                    <View style={styles.microphoneContainer}>
                        {!recording ? (
                            <TouchableOpacity style={styles.microphoneButton} onPress={startRecording}>
                                <MaterialIcon name="mic" size={40} color="#FFF" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.microphoneButton} onPress={stopRecording}>
                                <MaterialIcon name="mic-off" size={40} color="#FFF" />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.microphoneText}>{recording ? "Stop recording" : "Start recording the answer"}</Text>
                    </View>

                    {/* Play/Pause recorded sound */}
                    {recordedSound && (
                        <TouchableOpacity style={styles.microphoneButton} onPress={playPauseRecordedSound}>
                            <MaterialIcon
                                name={isSoundPlaying ? "pause" : "play-arrow"}
                                size={40}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    )}

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitButton} onPress={submitRecording}>
                        <Text style={styles.buttonText}>Submit Recording</Text>
                    </TouchableOpacity>

                    {/* Next Question Button */}
                    <TouchableOpacity style={styles.quizNextButton} onPress={handleNextQuestion}>
                        <Text style={styles.buttonText}>
                            {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Lesson Text Section */}
            {!lessonCompleted && (
                <ScrollView contentContainerStyle={{ ...styles.lessonContent, minHeight: screenHeight }}>
                    <Text style={styles.lessonText}>
                        {lessonText}
                    </Text>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A5AE0',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    lessonTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        right: '100%',
    },
    audioPlayer: {
        backgroundColor: '#9A8BF1',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    audioTitle: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    audioControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    speedControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    speedText: {
        fontSize: 18,
        color: '#fff',
        marginHorizontal: 10,
    },
    activeSpeed: {
        fontWeight: 'bold',
        color: '#FFD700',
    },
    lessonContent: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 15,
        alignItems: 'flex-start',  // Ensure the text is aligned to the left
    },
    lessonText: {
        fontSize: 18,
        color: '#333',
        lineHeight: 26,
        textAlign: 'left',  // Left-align text
    },
    quizQuestionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    quizAnswerText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    quizControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        alignItems: 'center',
    },
    quizNextButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    microphoneContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    microphoneButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 50,
        padding: 20,
    },
    microphoneText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#FF5722',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default ListenLesson;
