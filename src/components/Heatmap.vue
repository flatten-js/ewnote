<template>
  <div class="cal-heatmap" id="cal-heatmap" />
</template>

<style lang="scss" scoped>
  @import '~cal-heatmap/cal-heatmap.css';
  @import '~vuetify/src/styles/styles.sass';

  .cal-heatmap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
  }

  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    .cal-heatmap {
      align-items: center;
    }
  }
</style>

<script>
import CalHeatMap from 'cal-heatmap'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    lastYear() {
      const now = new Date()
      return new Date(now.getFullYear() - 1, now.getMonth() + 1);
    },
    init() {
      this.heatmap = new CalHeatMap()

      this.heatmap.init({
        start: this.lastYear(),
        domain: 'month',
        cellSize: 13,
        rowLimit: 7,
        label: {
          position: "top"
        },
        legendMargin: [13 /* 0.8125rem */, 0, 0, 0],
        legendHorizontalPosition: "right",
        afterLoadData: this.parser,
        // tooltip: true,
      })
    },
    parser({ data = [] }) {
      return data.reduce((acc, cur) => {
        const date = new Date(cur.date).getTime() / 1000
        const line = (acc[date] || 0) + cur.line
        return { ...acc, [date]: line }
      }, {})
    }
  },

  watch: {
    data() {
      this.heatmap.update({ data: this.data })
    }
  }
}
</script>
