<template>
  <v-container>
      <v-footer
        max-height="100px"
        absolute
        padless
        elevation="20"
      >
        <v-sheet
          v-if="cardContent.status === true"
          rounded
          width="100%"
          height="50px"
          :color="cardContent.footerColor"
          class="my-auto text-center"

        >
          <v-row justify="center">
            <v-col md="4">
              <v-confirmation-dialog
                icon="mdi-package-down"
                action="archive"
                service="archiveCard"
                :id="cardContent._id"
              ></v-confirmation-dialog>
            </v-col>
            <v-col md="4">
              <v-create-card icon="mdi-square-edit-outline" type="edit" :id="cardContent._id">
              </v-create-card>
            </v-col>
          </v-row>
        </v-sheet>
        <v-sheet
          v-else-if="cardContent.status === false"
          rounded
          width="100%"
          height="50px"
          :color="cardContent.footerColor"
          class="my-auto text-center"

        >
          <v-row justify="center">
            <v-col md="4">
              <v-confirmation-dialog
                icon="mdi-package-up"
                action="unarchive"
                service="unArchiveCard"
                :id="cardContent._id"
              ></v-confirmation-dialog>
            </v-col>
            <v-col md="4">
              <v-confirmation-dialog
                icon="mdi-delete"
                action="delete"
                service="deleteCard"
                :id="cardContent._id"
              ></v-confirmation-dialog>
            </v-col>
          </v-row>
        </v-sheet>
      </v-footer>
  </v-container>
</template>

<script>
import ConfirmationDialog from '../Shared/ConfirmationDialog.vue';
import DialogCard from '../Cards/DialogCard.vue';

export default {
  name: 'SGFooter',
  props: {
    cardContent: Object,
  },
  components: {
    'v-confirmation-dialog': ConfirmationDialog,
    'v-create-card': DialogCard,
  },
  data: () => ({}),

};
</script>

<style>

</style>
