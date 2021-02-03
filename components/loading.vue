<template>
  <transition name="appear" mode="in-out">
    <div v-if="loading" class="my--loader">
      <img src="~/assets/img/logo.png" alt="" >
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  data: () => ({
    loading: true,
  }),
  mounted() {
    setTimeout(() => {
      this.finish()
    }, 500)
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
