<!--View-->
<template>
    <h1 align="center">Hello World</h1>
    <p v-once>My name is {{myName}} and I run {{channel}}</p>
    <p>{{myName}}</p>
    <p>{{rawHTML}}</p>
    <p v-html="rawHTML"></p>
    <p>{{randNumber}}</p>
    <button @click="aMethod()">Click</button>
    <button v-on:click="aMethod()">Click</button>
    <button @click="changeNum">Click me</button>
    <ul>
        <li v-bind:key="lang" v-for="lang in programmingLanguages">{{lang}}</li>
    </ul>
    <ul>
        <li v-bind:key="lang.name" v-for="(lang,index) in programmingLanguages2">{{index+1}} - {{lang}}</li>
    </ul>
    <ul>
        <li v-bind:key="lang" v-for="lang in programmingLanguages3">{{lang}}</li>
    </ul>
    <input v-bind:value="randNumber">
    <input :value="randNumber">
    <input :value="randNumber" @change="func($event)">
    <input v-model="randNumber">
    <p>{{keywords.join(" | ")}}</p>
    <input :value="inputValue" @keyup.space="processInput" />
</template>
<!--Logic section-->
<script>
//v-once prvek se nebude aktualizovat
//v-html vepise raw html, html tag musí být prázdný
export default {
    data(){
        return{
            randNumber: Math.random(),
            rawHTML: "<b>HTML</b>",
            myName: "David Třetina",
            channel: "Codedamn",
            programmingLanguages:[
                "Javascript",
                "C",
                "C++",
                "Java"
            ],
            programmingLanguages2:[
                {name:"Javascript"},
                {name:"C"},
                {name:"C++"},
                {name:"Java"}
            ],
            programmingLanguages3:{
                language: "Javascript",
                creator: "I dont know"
            },
            inputValue: "",
            index: 0,
            keywords: [

            ],
            keywords2: [
                 
            ]
        };
    },
    beforeCreate(){

    },
    //Před injekcí templatu
    create(){

    },
    beforeMount(){

    },
    mounted(){ 
        this.helloWorld();
        this.myName="Bez v-once";
    },
    beforeUnmount(){

    },
    unmounted(){

    },
    methods:{
        helloWorld(){
            alert("I am available!")
        },
        aMethod(){
            this.randNumber = Math.random();
        },
        changeNum(){
            this.randNumber = 100;
        },
        func(e){
            this.randNumber = e.target.value;
        },
        processInput(event){
            const value = event.target.value;
            this.keywords[this.index] = value;
            this.inputValue = "";
            this.index++;
        }
    }
};
</script>
<!--style-->
<style scoped>

</style>