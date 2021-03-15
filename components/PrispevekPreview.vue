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
      template: `<div><p class="">${this.html.slice(0,300)}</p></div></div>`
    });
  }
};
</script>

<style>
.aktualitatext h1, .aktualitatext h2,.aktualitatext h3,.aktualitatext h4,.aktualitatext p,.aktualitatext ul,.aktualitatext li,.aktualitatext ol,.aktualitatext a{
    display: inline;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-size: 16px;
    font-weight: normal;
    color:#fff;
}
.aktualitatext h1::before,.aktualitatext h2::before,.aktualitatext h3::before,.aktualitatext h4::before,.aktualitatext p::before,.aktualitatext ul::before,.aktualitatext li::before,.aktualitatext ol::before,.aktualitatext a::before{
    content: " ";
    display: inline;
    font-size: 16px;
}
</style>
