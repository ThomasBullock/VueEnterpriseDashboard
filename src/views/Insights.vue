<template>
  <div class="insights">
    <h1>This is an about page</h1>
    <p>
      I'm baby green juice before they sold out enamel pin waistcoat hashtag
      literally glossier. Pabst wayfarers pitchfork squid typewriter irony. Cray
      gastropub poutine locavore vape affogato cardigan air plant organic
      franzen wolf asymmetrical vinyl keytar. Biodiesel shabby chic offal keytar
      pour-over chicharrones green juice. Intelligentsia typewriter austin,
      normcore bicycle rights man braid listicle ennui prism poke hexagon master
      cleanse street art.
    </p>
    <D3BarChart
      title="Bar Chart"
      xKey="name"
      yKey="height"
      :rawData="buildings"
      :margins="{ top: 10, right: 10, bottom: 100, left: 100 }"
      :dimensions="{ width: 800, height: 400 }"
    />
  </div>
</template>

<script>
// import D3LineChart from "@/components/d3/D3LineChart.vue";
import D3BarChart from "@/components/d3/D3BarChart.vue";

export default {
  name: "Insights",
  components: {
    // D3LineChart,
    D3BarChart,
  },
  data() {
    return {
      buildings: [
        {
          name: "Burj Khalifa",
          height: "828",
        },
        {
          name: "Shanghai Tower",
          height: "623",
        },
        {
          name: "Abraj Al-Bait Clock Tower",
          height: "601",
        },
        {
          name: "Ping An Finance Centre",
          height: "599",
        },
        {
          name: "Dawson Road",
          height: "164.5",
        },
        {
          name: "One World Trade Center",
          height: "541.3",
        },
        {
          name: "Uranus Tower",
          height: "941.3",
        },
        {
          name: "Guangzhou CTF Finance Center",
          height: "530",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.insights {
  background: $white;
}
</style>
