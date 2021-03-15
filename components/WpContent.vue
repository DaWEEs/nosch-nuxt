<script>
export default {
  props: {
    html: {
      type: String,
      default: ""
    }
  },
  render(h) {
    return h({
      template: `<div>${this.html}</div>`
    });
  }
};
</script>

<style scoped>
  body, h1, h2, h3, h4, h5, h6 {
    font-family: Arial, Helvetica, Arial, sans-serif;
  }
</style>
