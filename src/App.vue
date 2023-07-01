<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import leaflet from "leaflet";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";


let map: leaflet.Map ;
let marker : leaflet.LayerGroup;

const ipAddress = ref(null)
const ipLocation = reactive(
  { ip: '', location: '', timezone: '', isp: '' }
)

function setupMap() {
  // const accessToken = "pk.eyJ1IjoiZGF2aWRtcjI3IiwiYSI6ImNsMnBjMGh4czAxNHczYm81MTF6cHBmdWcifQ.eA7RjzwwQc6eV7Z4WrIgxQ"

  map = leaflet.map("mapContainer", { zoomControl: false }).setView([37.7749, -122.4194], 14);
  leaflet.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX}`, {
    attribution: 'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: import.meta.env.VITE_MAPBOX,
  }).addTo(map);
  marker = leaflet.layerGroup().addTo(map);

}

async function findIpAddress() {
  try {
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEO}&ipAddress=${ipAddress.value}`);
    const data = response.data
    ipLocation.ip = data.ip
    ipLocation.location = data.location.region
    ipLocation.timezone = data.location.timezone
    ipLocation.isp = data.isp;
    marker.clearLayers()
    const postion = [data.location.lat, data.location.lng] as leaflet.LatLngExpression;
    map.flyTo(postion, 16, {animate:true})
    leaflet.marker(postion).addTo(marker);
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  setupMap()
})

</script>

<template>
  <div class="flex flex-col">
    <div class="h-64">
      <div class="bg-[url('src/assets/img/pattern-bg-desktop.png')] bg-cover h-full flex flex-col items-center relative">
        <h1 class="text-3xl font-medium text-white pt-5 mb-10">IP Address Tracker</h1>
        <div class="flex flex-nowrap w-4/12 relative shadow-sm">
          <input @keypress.enter="findIpAddress" type="text" name="" id=""
            placeholder="Search for any IP address or domain" v-model="ipAddress"
            class="rounded-md w-full p-3 outline-none text-gray-900 font-medium placeholder:text-slate-400 placeholder:font-light">
          <div @click="findIpAddress"
            class="bg-black h-full w-11 text-center rounded-r-md flex justify-center items-center absolute bottom-0 right-0">
            <i class="fa-sharp fa-solid fa-angle-right text-white text-xl"></i>
          </div>
        </div>
        <div
          class="bg-white w-8/12 h-3/6 flex flex-row flex-wrap justify-between px-5 py-6 rounded-md z-20 absolute -bottom-10">
          <div class="grow border-solid border-r-2 px-5">
            <span class="uppercase font-medium text-gray-400 text-xs tracking-wider">ip address</span>
            <h3 class="text-xl font-medium text-gray-900 capitalize">{{ ipLocation.ip === '' ? 'No ip' : ipLocation.ip }}
            </h3>
          </div>
          <div class="grow border-solid border-r-2 px-5">
            <span class="uppercase font-medium text-gray-400 text-xs tracking-wider">location</span>
            <h3 class="text-xl font-medium text-gray-900 capitalize">{{ ipLocation.location === '' ? 'No location' :
              ipLocation.location }}</h3>
          </div>
          <div class="grow border-solid border-r-2 px-5">
            <span class="uppercase font-medium text-gray-400 text-xs tracking-wider">timezone</span>
            <h3 class="text-xl font-medium text-gray-900 capitalize">{{ ipLocation.timezone === '' ? 'No timezone' :
              ipLocation.timezone }}</h3>
          </div>
          <div class="grow px-5">
            <span class="uppercase font-medium text-gray-400 text-xs tracking-wider">isp</span>
            <h3 class="text-xl font-medium text-gray-900 capitalize">{{ ipLocation.isp === '' ? 'No ISP' :
              ipLocation.isp }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="mapContainer" class="h-screen w-full z-10 overflow-y-hidden grow"></div></template>

<style scoped></style>
