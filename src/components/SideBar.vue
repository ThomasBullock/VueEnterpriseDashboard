<template>
  <SidebarMenu :menu="menu">
    <!-- <div slot="header">header</div> -->
  </SidebarMenu>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import { mapGetters } from "vuex";
export default {
  components: {
    SidebarMenu,
  },
  data() {
    return {
      menu: [
        // {
        //   header: true,
        //   title: "Main Navigation",
        //   hiddenOnCollapse: true,
        // },
        // {
        //   href: "/",
        //   title: "Dashboard",
        //   icon: "fa fa-user",
        // },
        {
          href: "/teams",
          title: "Teams",
          icon: "fa fa-user",
          child: null,
        },
        {
          href: "/players",
          title: "Players",
          icon: "fa fa-user",
        },
        {
          href: "/insights",
          title: "Insights",
          icon: "fa fa-chart-area",
          //   child: [
          //     {
          //       href: "/charts/sublink",
          //       title: "Sub Link",
          //     },
          //   ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters("teams", ["allTeams"]),
    teamLinks() {
      return Object.values(this.allTeams).map((v) => {
        return {
          href: "/teams/" + v._id,
          title: v.name,
        };
      });
    },
  },
  created() {
    console.log(this.allTeams);
  },
  mounted() {
    console.log(this.allTeams);
    setTimeout(() => {
      this.menu[0].child = this.teamLinks;
    }, 1000);
  },
};
</script>
<style lang="scss">
.v-sidebar-menu .vsm--link {
  display: block;
  padding: $base-spacing;
  color: $white !important;

  &:hover {
    background: $gun-metal;
  }
}

.v-sidebar-menu .vsm--link.vsm--link_active {
  background: $primary;
  color: $white;
}
.v-sidebar-menu .vsm--link.vsm--link_exact-active {
}

.v-sidebar-menu .vsm--link_level-2 {
  margin-left: $base-spacing;
}
</style>
<style lang="scss" scoped>
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";

.v-sidebar-menu {
  /* top: 48px; */
  position: relative;
}
</style>
