<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo-mateus.svg')"
          class="my-3"
          contain
          height="150"
        ></v-img>
      </v-flex>

      <v-flex my-5>
        <h1 class="display-2 font-weight-bold mb-3">
          Bem-vindo ao módulo eSocial do ItPeople
        </h1>
        <p class="subheading font-weight-regular">
          Qualquer dúvida de acesso consultar o suporte da ItHappens
        </p>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">O que é ESocial?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Links Importantes Desenvolvedor</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Stack do Projeto</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: 'VueJS',
        href: 'https://vuejs.org/'
      },
      {
        text: 'Spring Framework',
        href: 'https://spring.io/'
      },
      {
        text: 'Vuetify',
        href: 'https://vuetifyjs.com/'
      }
    ],
    importantLinks: [
      {
        text: 'Manual de Orientação v1.7',
        href: 'https://portal.esocial.gov.br/manuais/manualorientacaodesenvolvedoresocialv1-7.pdf'
      },
      {
        text: 'Leiautes do ESocial v2.5',
        href: 'https://portal.esocial.gov.br/manuais/leiautes-do-esocial-v2-5.zip'
      },
      {
        text: 'Pacote de Comunicação ESocial v1.5',
        href: 'https://portal.esocial.gov.br/manuais/pacote-de-comunicacao-esocial-v1-5.zip'
      }
    ],
    whatsNext: [
      {
        text: 'Portal eSocial',
        href: 'http://portal.esocial.gov.br/'
      },
      {
        text: 'Conheça o eSocial',
        href: 'http://portal.esocial.gov.br/institucional/conheca-o'
      },
      {
        text: 'Manual do eSocial',
        href: 'https://portal.esocial.gov.br/manuais/mos-2-5-01.pdf'
      }

    ]
  })
}
</script>

<style>

</style>
