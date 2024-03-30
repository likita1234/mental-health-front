<script>
import EventBus from '@/utils/event-bus';
import AppTopbar from "@/components/core/AppTopbar.vue";
import AppMenu from "@/components/core/AppMenu.vue";
import AppFooter from "@/components/core/AppFooter.vue";
import AppBreadcrumb from "@/components/core/AppBreadcrumb.vue";

export default {
  data() {
    return {
      theme: 'denim',
      topbarTheme: "light",
      menuTheme: "dim",
      layoutMode: "light",
      menuMode: "static",
      activeTopbarItem: null,
      menuActive: false,
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      menuClick: false,
      searchActive: false,
      searchClick: false,
      userMenuClick: false,
      topbarMenuActive: false,
    };
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.menuMode === "overlay",
          "layout-static": this.menuMode === "static",
          'layout-horizontal': this.menuMode === 'horizontal',
          "layout-overlay-active": this.overlayMenuActive,
          "layout-mobile-active": this.staticMenuMobileActive,
          "layout-static-active": !this.staticMenuDesktopInactive && this.menuMode === "static",
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": !this.$primevue.config.ripple,
        },
        'layout-menu-' + this.menuTheme + ' layout-topbar-' + this.topbarTheme
      ];
    },
  },
  watch: {
    $route() {
      this.menuActive = false;
    },
  },
  methods: {
    onDocumentClick() {
      if (!this.topbarItemClick) {
        this.activeTopbarItem = null;
        this.topbarMenuActive = false;
      }

      if (!this.userMenuClick) {
        this.topbarMenuActive = false;
      }

      if (!this.menuClick) {
        if (this.isHorizontal()) {
          EventBus.emit('reset-active-index');
          this.menuActive = false;
        }

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
          this.hideOverlayMenu();
        }

        this.unblockBodyScroll();
      }
      this.topbarItemClick = false;
      this.menuClick = false;
    },
    onMenuClick() {
      this.menuClick = true;
    },
    onMenuButtonClick(event) {
      this.rotateMenuButton = !this.rotateMenuButton;
      this.topbarMenuActive = false;
      this.menuClick = true;

      if (this.isOverlay() && !this.isMobile()) {
        this.overlayMenuActive = !this.overlayMenuActive;
      }

      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
        if (this.staticMenuMobileActive) {
          this.blockBodyScroll();
        } else {
          this.unblockBodyScroll();
        }
      }

      event.preventDefault();
    },
    onMenuItemClick(event) {
      if (!event.item.items) {
        EventBus.emit('reset-active-index');
        this.hideOverlayMenu();
      }
      if (!event.item.items && this.isHorizontal()) {
        this.menuActive = false;
      }
    },
    onRootMenuItemClick() {
      this.menuActive = !this.menuActive;
    },
    onTopbarItemClick(event) {
      this.topbarItemClick = true;

      if (this.activeTopbarItem === event.item) {
        this.activeTopbarItem = null;
      }
      else {
        this.activeTopbarItem = event.item;
      }
      event.originalEvent.preventDefault();
    },
    hideOverlayMenu() {
      this.overlayMenuActive = false;
      this.staticMenuMobileActive = false;
      this.unblockBodyScroll();
    },
    blockBodyScroll() {
      if (document.body.classList) {
        document.body.classList.add('blocked-scroll');
      } else {
        document.body.className += ' blocked-scroll';
      }
    },
    unblockBodyScroll() {
      if (document.body.classList) {
        document.body.classList.remove('blocked-scroll');
      } else {
        document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
          'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    },
    isTablet() {
      const width = window.innerWidth;
      return width <= 1024 && width > 640;
    },
    isDesktop() {
      return window.innerWidth > 992;
    },
    isMobile() {
      return window.innerWidth <= 640;
    },
    isOverlay() {
      return this.menuMode === 'overlay';
    },
    isStatic() {
      return this.menuMode === 'static';
    },
    isHorizontal() {
      return this.menuMode === 'horizontal';
    }
  },
  components: {
    AppTopbar,
    AppMenu,
    AppFooter,
    AppBreadcrumb,
  }
};
</script>

<template>
  <header>
    <div :class="containerClass" @click="onDocumentClick($event)">
      <!-- Put Confirm Dialogs on AppWrapper -->
      <AppTopbar :topbarTheme="topbarTheme" :activeTopbarItem="activeTopbarItem"
        @menu-button-click="onMenuButtonClick($event)" @topbar-item-click="onTopbarItemClick" />

      <div class="menu-wrapper" @click="onMenuClick($event)">
        <AppMenu :active="menuActive" :mobileMenuActive="staticMenuMobileActive" :menuMode="menuMode"
          @menuitem-click="onMenuItemClick" @root-menuitem-click="onRootMenuItemClick">
        </AppMenu>
      </div>

      <div class="layout-main">
        <AppBreadcrumb />

        <div class="layout-content">
          <router-view />
        </div>

        <AppFooter />
      </div>

      <div v-if="staticMenuMobileActive" class="layout-mask modal-in"></div>
    </div>
  </header>
</template>

<style scoped>
@import "App.scss";
</style>
