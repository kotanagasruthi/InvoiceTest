<template>
  <nav aria-label="breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <router-link v-if="!breadcrumb.active" :to="breadcrumb.to">{{ breadcrumb.text }}</router-link>
        <span v-else class="active">{{ breadcrumb.text }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">></span>
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
        if (routeRecord.meta && routeRecord.meta.breadcrumb && routeRecord.name !== 'Dashboard') {
          let breadcrumbText = routeRecord.meta.breadcrumb
          if (this.$route.params?.topic) {
            breadcrumbText = breadcrumbText.replace('{topic}', this.$route.params.topic)
          }
          if (this.$route.params?.subTopic) {
            breadcrumbText = breadcrumbText.replace('{subTopic}', this.$route.params.subTopic)
          }

          const isActive = index === this.$route.matched.length - 1
          breadcrumbs.push({
            text: breadcrumbText,
            to: this.resolveBreadcrumbPath(routeRecord),
            active: isActive
          })
        }
      })
      return breadcrumbs
    }
  },
  methods: {
    resolveBreadcrumbPath (routeRecord) {
      if (routeRecord.redirect) {
        return { name: routeRecord.redirect.name }
      }
      return {
        name: routeRecord.name,
        params: this.$route.params,
        query: routeRecord.query
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
}

.breadcrumb {
  list-style: none;
  display: flex;
  margin-bottom: 0;
  margin-top: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.breadcrumb-item + .breadcrumb-item::before {
  display: none;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #6c757d;
}

.router-link-active {
  font-weight: bold;
  text-decoration: none;
  color: black
}

.active {
  font-weight: bold;
}
</style>
