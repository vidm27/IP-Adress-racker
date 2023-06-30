<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import leaflet from "leaflet";
import { onMounted } from "vue";


function setupMap() {
  // const accessToken = "pk.eyJ1IjoiZGF2aWRtcjI3IiwiYSI6ImNsMnBjMGh4czAxNHczYm81MTF6cHBmdWcifQ.eA7RjzwwQc6eV7Z4WrIgxQ"

  const map = leaflet.map("mapContainer", {zoomControl: false}).setView([37.7749, -122.4194], 14);
  leaflet.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX}`, {
    attribution: 'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: import.meta.env.VITE_MAPBOX,
  }).addTo(map);

}

onMounted(() => {
  setupMap()
})

</script>

<template>
  <div class="flex flex-col">
    <div class="p-3">
      <div class="bg-[url('src/assets/img/pattern-bg-desktop.png')]">
        <h1 class="text-3xl font-medium">IP Address Tracker</h1>
        <div class="flex flex-nowrap w-4/12 relative shadow-sm">
          <input type="text" name="" id="" placeholder="Search for any IP address or domain" class="rounded-md w-full p-1.5 outline-none text-gray-500 font-light placeholder:text-slate-400 placeholder:font-light">
          <div class="bg-black h-full w-11 text-center rounded-r-md flex justify-center items-center absolute bottom-0 right-0">
            <i class="fa-sharp fa-solid fa-angle-right text-white text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="mapContainer" class="h-screen w-screen z-10"></div>
</template>

<style scoped>

</style>
