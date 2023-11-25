<template>
<div>
    <header>
        <div class="brand-logo">
            <img src="../assets/trans_logo_vidhyasoft.png" alt="Logo"/>
            <span>{{currentLoggedInUser.institute_name}}</span>
        </div>
        <div class="logged-user">
            <div class="username">
                Hi, {{currentLoggedInUser.name}}!!
            </div>
            <div class="logout" @click="logoutUser()">
                <font-awesome-icon class="icon"  icon="sign-out" />
            </div>
        </div>
    </header>
    <div class="container">
        <div class="left-pane">
            <div class="menu-item" @click="loadComponent('ExamsComponent')"
            :class="{ selected: selectedComponent === 'ExamsComponent' }">
                <font-awesome-icon class="icon"  icon="file-lines" /> <div>Exams</div>
            </div>

            <div class="menu-item" @click="loadComponent('ExamFormatsComponent')"
            :class="{ selected: selectedComponent === 'ExamFormatsComponent' }">
                <font-awesome-icon class="icon"  icon="users" /> <div>Exam Formats</div>
            </div>

            <div class="menu-item" @click="loadComponent('TopicsComponent')"
            :class="{ selected: selectedComponent === 'TopicsComponent' }">
                <font-awesome-icon class="icon" icon="clipboard-question" /> <div>Topics</div>
            </div>

            <div class="menu-item" @click="loadComponent('InviteesComponent')"
            :class="{ selected: selectedComponent === 'InviteesComponent' }">
                <font-awesome-icon class="icon"  icon="user-plus" /> <div>Candidates</div>
            </div>

            <div class="menu-item" @click="loadComponent('AnalyticsComponent')"
            :class="{ selected: selectedComponent === 'AnalyticsComponent' }">
                <font-awesome-icon class="icon"  icon="chart-simple" /> <div>Analytics</div>
            </div>

            <div class="menu-item" @click="loadComponent('UsersComponent')"
            :class="{ selected: selectedComponent === 'UsersComponent' }">
                <font-awesome-icon class="icon"  icon="users" /> <div>Users</div>
            </div>

            <div class="menu-item" @click="loadComponent('SettingsComponent')"
            :class="{ selected: selectedComponent === 'SettingsComponent' }">
                <font-awesome-icon class="icon"  icon="cog" /> <div>Settings</div>
            </div>
        </div>

        <!-- <main>
            <component :is="currentComponent"></component>
        </main> -->
        <router-view />
    </div>
</div>
</template>

<script>
// import ExamFormatsComponent from '../components/ExamFormats.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },

  data () {
    return {
      currentComponent: '',
      selectedComponent: 'ExamsComponent'// Initially, set it to the default component to be displayed.
    }
  },
  methods: {
    ...mapActions('landing', [
      'logout'
    ]),
    loadComponent (componentName) {
    //   this.currentComponent = componentName
      this.selectedComponent = componentName
      this.$router.push({ name: componentName })
    },
    logoutUser () {
      this.logout().then(res => {
        console.log('logout res', res)
        this.$router.push({
          name: 'Landing',
          params: {
            action: 'login'
          }
        })
      })
    }
  },

  created () {
    // this.currentComponent = ExamsComponent
    console.log(this.currentLoggedInUser)
  }
}

</script>

<style lang = "scss" scoped>

 @import '../styles/landing-page.scss';
 .logged-user {
    display: flex;
    .logout {
        cursor: pointer;
        margin-left: 20px;
    }
 }

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
}

.container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 30px;
    padding: 40px;
    background-color: #fff;
    /* max-width: 1300px; */
    height: 80vh;
    overflow-y: scroll;
    /* margin: 40px auto; */
    box-shadow: 0 3px 15px rgba(0,0,0,0.1);
}

header {
    grid-column: 1 / span 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #e6e6e6;
    padding: 10px 40px;
}

header img {
    width: 60px;
    cursor: pointer;
}

.account-details {
    text-align: right;
}

.account-details h1 {
    margin: 0;
    font-size: 28px;
    color: #333;
    margin-bottom: 10px;
}

.account-details p {
    margin: 0;
    color: #666;
}

.username{
    text-align: left;
}

.header-nav {
    display: flex;
    gap: 30px;
    /* You can add icon styling here */
}

.nav-item {
    padding: 15px 0;
    color: #666;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 600;
    cursor: pointer;
}

.nav-item:hover {
    color: #ff6000;
}

/* main {
    border: 1px solid #e6e6e6;
    padding: 30px;
    border-radius: 8px;
    background-color: #f7f7f7;
} */

main h2 {
    margin-top: 0;
    color: #333;
    font-size: 24px;
    margin-bottom: 30px;
    border-bottom: 2px solid #e6e6e6;
    padding-bottom: 20px;
}

.address-block {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    margin-bottom: 20px;
    border: 1px solid #e6e6e6;
}

/* ... previous CSS ... */

.brand-logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.brand-logo img {
    width: 60px; /* Adjust based on actual image size */
}

.brand-logo span {
    font-size: 24px;
    color: #000000;
    font-weight: bold;
}

.header-nav {
    display: flex;
    gap: 20px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
}

.nav-item i {
    font-size: 20px; /* Adjust size of icons */
    /* Add color styling for icons if necessary */
}

.new-label {
    background-color: #ff6000;
    color: #fff;
    padding: 2px 5px
}

.left-pane {
    width: 250px;
    background-color: #F7F7F7;
    /* padding: 20px 0; */
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 20px;
    color: #7F7F7F;
    cursor: pointer;
    transition: background-color 0.2s;

    .icon {
        /* margin-right: 10px; */
        flex-basis: 20%;
    }
}

.menu-item:hover {
    background-color: #EFEFEF;
}

.menu-item i {
    margin-right: 15px;
    font-size: 24px;
    width: 30px; /* Adjust this for alignment of text */
}

.menu-item.selected {
    background-color: #E1E1E1;
    color: #000;
    font-weight: 600;
}

.menu-item.selected i {
    color: #000; /* Adjust the color of the icon for the selected item if needed */
}
</style>
