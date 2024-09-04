
<template>
  <div id="app">
    <section class="row">
        <div class="col">
            <h1 class="text-center">SEN</h1>
            <div class="healthbar">
                <div :style="player_progress" class="healthbar text-center " style="background-color: green; margin: 0; color: white;">
                    {{player_heal}}%
                </div>
            </div>
        </div>
        <div class="col">
            <h1 class="text-center">CANAVAR</h1>
            <div class="healthbar">
                <div :style="monster_progress" class="healthbar text-center " style="background-color: green; margin: 0; color: white;">
                    {{monster_heal}}%
                </div>
            </div>
        </div>
    </section>
    <section class="row controls" v-if="!game_is_on">
        <div class="small-12 columns">
            <button id="start-game" @click ="start_game">YENİ OYUN</button>
        </div>
    </section>

    <section class="row controls" v-if="game_is_on">
        <div class="small-12 columns">
            <button id="attack" @click="attack">SALDIRI</button>
            <button id="special-attack" @click="special_attack">ÖZEL SALDIRI</button>
            <button id="heal" @click="heal_up">İLK YARDIM</button>
            <button id="give-up" @click="give_up">PES ET!</button>
        </div>
    </section>

    <section class="row log" v-if="logs.length > 0">
        <div class="small-12 columns">
            <ul>
                <li 
                    :class="{'player-turn' : log.turn == 'p' , 'monster-turn' : log.turn == 'm' }"
                    v-for="(log, index) in logs" 
                    :key="index" >
                    {{log.text}}
                </li>
            </ul>
        </div>
    </section>
</div>
</template>

<script>
export default {
  name: 'canavarOyunu',
  data() {
    return {
      player_heal: 100,
      monster_heal: 100,
      game_is_on: false,
      attack_multiple : 10,
      special_attack_multiple : 25,
      monster_attack_multiple : 15,
      heal_up_multiple : 20,
      log_text : {
        attack : "OYUNCU ATAĞI : ",
        special_attack : "ÖZEL OYUNCU ATAĞI :",
        monster_attack : "CANAVAR ATAĞI :",
        heal_up : "İLK YARDIM :",
        give_up : "OYUNCU PES ETTİ :"

      },
      logs: []
    }
  },
  methods: {
    start_game() {
      this.game_is_on = true;
    },
    attack() {
      var point = Math.ceil(Math.random() * this.attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({ turn: "p", text: this.log_text.attack  + point })
      this.monster_attack();
    },
    special_attack() {
      var point = Math.ceil(Math.random() * this.special_attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({ turn: "p", text: this.log_text.special_attack + point})
      this.monster_attack();
    },
    heal_up() {
      var point = Math.ceil(Math.random() * this.heal_up_multiple);
      this.player_heal += point;
      this.add_to_log({ turn: "p", text: this.log_text.heal_up + point })
      this.monster_attack();
    },
    give_up() {
      this.player_heal = 0;
      this.add_to_log({ turn: "p", text: this.log_text.give_up})
    },
    monster_attack() {
      var point = Math.ceil(Math.random() * this.monster_attack_multiple);
      this.player_heal -= point;
      this.add_to_log({ turn: "m", text: this.log_text.monster_attack + point })
    },
    add_to_log(log) {
      this.logs.push(log);
    }
  },
  watch: {
    player_heal(value) {
      if (value <= 0) {
        this.player_heal = 0;
        if (confirm("Oyunu Kaybettin.Tekrar denemek ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.player_heal = 100;
      }
    },
    monster_heal(value) {
      if (value <= 0) {
        this.monster_heal = 0;
        if (confirm("Oyunu Kazandın.Tekrar denemek ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      }
    }
  },
  computed : {
    player_progress : function(){
      return {
        width : this.player_heal + "%"
      }
    },
    monster_progress : function(){
      return {
        width : this.monster_heal + "%"
      }
    }
  }
}
</script>

