import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { NewClientType } from '@/entities/client'

const INITIAL_CLIENT: NewClientType = {
  surname: '',
  name: '',
  patronymic: '',
  phoneNumber: '',
  email: '',
  passportSeries: '',
  passportNumber: '',
  issuedBy: '',
  dateOfIssue: '',
}

export const useCreateClientStore = defineStore('clientStore', () => {
  const state = reactive({
    newClient: { ...INITIAL_CLIENT }
  })

  const surname = computed({
    get: () => state.newClient.surname,
    set: (v: string) => state.newClient.surname = v,
  })

  const name = computed({
    get: () => state.newClient.name,
    set: (v: string) => state.newClient.name = v,
  })

  const patronymic = computed({
    get: () => state.newClient.patronymic,
    set: (v: string) => state.newClient.patronymic = v,
  })

  const phoneNumber = computed({
    get: () => state.newClient.phoneNumber,
    set: (v: string) => state.newClient.phoneNumber = v,
  })

  const email = computed({
    get: () => state.newClient.email,
    set: (v: string) => state.newClient.email = v,
  })

  const passportSeries = computed({
    get: () => state.newClient.passportSeries,
    set: (v: string) => state.newClient.passportSeries = v,
  })

  const passportNumber = computed({
    get: () => state.newClient.passportNumber,
    set: (v: string) => state.newClient.passportNumber = v,
  })

  const issuedBy = computed({
    get: () => state.newClient.issuedBy,
    set: (v: string) => state.newClient.issuedBy = v,
  })

  const dateOfIssue = computed({
    get: () => state.newClient.dateOfIssue,
    set: (v: string) => state.newClient.dateOfIssue = v,
  })

  return {
    newClient: computed(() => state.newClient),
    surname,
    name,
    patronymic,
    phoneNumber,
    email,
    passportSeries,
    passportNumber,
    issuedBy,
    dateOfIssue,
  }
})
