// // plugins/authMixin.js
// import { mapActions } from 'vuex';
// export default {
//     data() {
//       return {
//         userName: '',
//         isLoggedIn: false
//       };
//     },
//     mounted() {
//       this.isLoggedIn = this.$auth.isLoggedIn();
//       if (this.isLoggedIn) {
//         const user = this.$auth.getUser();
//         if (user && user.name) {
//           this.userName = user.name;
//         }
//       } else {
//         this.$router.push('/login');
//       }
//     },
//     methods: {
//       ...mapActions(['verifyUser']),
//       logout() {
//         console.log('sssssssssssslogoutoutttttttttttt');
//         this.$auth.logout();
//         this.verifyUser();
//         this.$router.push('/login');
//       }
//     }
//   };
  