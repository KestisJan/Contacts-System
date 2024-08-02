<script setup lang="ts">
import logo from '../assets/Logo.png'
import h6 from '../assets/H6.png'
import UserLogo from '../assets/Male User.png'


</script>


<template>
<nav class="bg-[#1F3F77] h-[118.13px] w-full">
  <div class="h-full">
    <div class="flex items-center h-full justify-between px-4" >
            <div class="flex items-center flex-grow space-x-20">
              <div class="relative">
                <img :src="h6" alt="h6" class="absolute left-0 top-1/2 transform -translate-y-1/2 h-3 ml-15"/>
                <img :src="logo" alt="Logo" class="h-16 ml-10"/>
              </div>
              <div class="hidden md:block ml-10">
                <div class="flex items-baseline space-x-20 p-2">
                  <router-link to="#" class="text-white hover:bg-[#17305F] px-2 py-2 rounded-md text-2xl font-bold">Kontaktai</router-link>
                  <router-link to="#" class="text-white hover:bg-[#17305F] px-3 py-2 rounded-md text-2xl font-bold">Įmonės</router-link>
                  <router-link to="#" class="text-white hover:bg-[#17305F] px-8 py-2 rounded-md text-2xl font-bold">Struktūra</router-link>
                  <router-link to="#" class="text-white hover:bg-[#17305F] px-12 py-2 rounded-md text-2xl font-bold">Paskyros</router-link>
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <img :src="UserLogo" alt="userLogo" class="h-12 px-6"/>
            </div>
    </div>
  </div>
</nav>
</template>


