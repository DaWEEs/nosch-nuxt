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
      template: `<div><p>${this.html.slice(0,300)}</p></div></div>`
    });
  }
};
</script>
