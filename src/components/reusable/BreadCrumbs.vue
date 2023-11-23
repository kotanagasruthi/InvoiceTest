<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <router-link :to="breadcrumb.to" v-if="!breadcrumb.active">{{ breadcrumb.text }}</router-link>
        <span v-else>{{ breadcrumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    breadcrumbs () {
      const breadcrumbs = []
      this.$route.matched.forEach((routeRecord, index) => {
        if (routeRecord.meta && routeRecord.meta.breadcrumb) {
          const isActive = index === this.$route.matched.length - 1
          breadcrumbs.push({
            text: routeRecord.meta.breadcrumb,
            to: routeRecord.path,
            active: isActive
          })
        }
      })

      return breadcrumbs
    }
  }
}
</script>
