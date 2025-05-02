import { defineStore } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import type { NewClient } from '@/entities/client'

const LOCAL_STORAGE_KEY = 'clients'

const InitialClient: NewClient = {
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

function loadClientsFromStorage(): NewClient[] {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

function saveClientsToStorage(clients: NewClient[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clients))
}

export const useCreateClientStore = defineStore('clientStore', () => {
  const state = reactive({
    newClient: { ...InitialClient }
  })

  const clients = ref<NewClient[]>(loadClientsFromStorage())

  const addClient = (client: NewClient) => {
    clients.value.push(client)
    saveClientsToStorage(clients.value)
  }

  const clearClient = () => {
    clients.value = []
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

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

  const loadClients = () => {
    clients.value = loadClientsFromStorage()
  }
  
  onMounted(() => {
    loadClients
  })
  return {
    newClient: computed(() => state.newClient),
    clients,
    surname,
    name,
    patronymic,
    phoneNumber,
    email,
    passportSeries,
    passportNumber,
    issuedBy,
    dateOfIssue,

    addClient,
    clearClient,
  }
})
