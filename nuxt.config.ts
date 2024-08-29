// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: {enabled: false},
    ssr: true,
    modules: ["nuxt-swiper", [
        "@pinia/nuxt", {autoImports: ["defineStore", "acceptHMRUpdate"]}
    ], "@pinia/nuxt"],
    app: {
        head: {
            charset: "utf-8",
            meta: [
                {"http-equiv": "x-ua-compatible", content: "IE=edge"},
                {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            ],
        },
    },

    runtimeConfig: {
        public: {
            baseApiCMSUrl: process.env.BASE_CMS_URL,
            hostBaseUrl: process.env.HOST_BASE_URL,
            baseApiPortal: process.env.BASE_PORTAL_URL
        }
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    },

    css: ['~/assets/css/main.css'],


});