<template>
  <div class="colours">
    <div :gutter="8">
      <div>
        <button
          v-on:click="selectedColour = changeColour(c);"
          v-for="(colour, c) in colours"
          :key="colour"
        >
          <div
            v-on:click="selectedColour = changeColour(c);"
            v-bind:class="[
              c === selectedColour ? 'selected' : 'unselected',
              colourClasses[c]
            ]"
          >
            {{ colour }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script src="./colours.ts">
</script>
