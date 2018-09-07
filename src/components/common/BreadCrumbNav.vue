<template>
  <nav aria-label="breadcrumb">
    <b-breadcrumb :items="crumbs"/>
  </nav>
</template>
<script>
  export default {
    computed: {
      crumbs: function () {
        let pathArray = this.$route.path.split('/')
        pathArray.shift()
        pathArray = pathArray.slice(0, 2)
        let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
          breadcrumbArray.push({
            path: path,
            to: breadcrumbArray[idx - 1]
              ? '/' + breadcrumbArray[idx - 1].path + '/' + path
              : '/' + path,
            text: this.$route.matched[idx].meta.breadCrumb || path
          })
          return breadcrumbArray
        }, [])
        return breadcrumbs
      }
    }
  }
</script>
<style scoped>
  .container{
    margin: auto;
    width: 50%
  }
  .breadcrumb {
    background-color: transparent;
    // padding-bottom: 0px;
  }
  .breadcrumb-item.active {
  color: black;
  }
</style>
