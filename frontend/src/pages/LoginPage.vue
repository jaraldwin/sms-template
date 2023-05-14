<template>
  <q-layout class="bg-grey-2">
    <q-page-container>
      <q-page class="flex flex-center" padding>
        <q-card class="login-card" style="width: 500px">
          <q-card-section class="login-hdr text-white">
            <q-item>
              <q-item-section class="text-black">
                <q-item-label class="text-h5"
                  >School Management System</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-section>
            <q-card-section>
              <q-input class="q-mb-md" v-model="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                label="Password"
                :rules="[(val) => !!val || 'Password is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append v-if="password && password.length > 0">
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-card-section>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-md">
            <q-btn :loading="isLoading" color="primary" @click="login"
              >Login</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, reactive } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const isLoggingIn = ref(false);
    const router = useRouter();
    const $q = useQuasar();
    console.log("$q", $q);
    const state = reactive({
      isLoading: false,
    });
    const login = async () => {
      const token =
        "e20308866d2c4e308d7acc8a852ba7337cbd811571d3e9d239081e8098b6b9078a589abe0fa3c5290c31f78facb37798b62b18e608d63fc527b25397cdbf4d91fe91e157db0d8f01f7858ed888b63c3138eae6efc75cfdd654554889e99ecb36266b71130d08e45ce263fef55a6f9096fef8a20f7a82b97d5940a7a66ad8972b";
      try {
        isLoggingIn.value = true; // Set isLoggingIn to true while logging in

        // Make a POST request to the user login API in Strapi v4
        const response = await axios.post(
          "http://localhost:1337/api/auth/local",
          {
            identifier: email.value,
            password: password.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("response.data", response.data);
        let user = response.data.user;
        user.apiToken = response.data.jwt;
        $q.localStorage.set("user", user);
        $q.localStorage.set("accessToken", user.apiToken);

        console.log("login successful");
        router.push({
          path: "/dashboard",
        });
      } catch (error) {
        // Handle login error
        // Show an error notification
        console.log("login failed", error);
      }
    };

    // Add a computed property to check if user is logged in
    const isLoggedIn = () => {
      const user = $q.localStorage.getItem("user");
      const apiToken = user ? user.apiToken : null;
      return apiToken !== null;
    };

    return {
      email,
      password,
      errorMessage,
      isLoggingIn,
      login,
      ...state, // spread the state object into the return object
      isPwd: ref(true),
      isLoggedIn,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
