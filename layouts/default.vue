<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$vs.setTheme('dark')
  },
}
</script>
