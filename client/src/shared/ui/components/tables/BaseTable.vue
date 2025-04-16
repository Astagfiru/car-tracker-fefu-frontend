<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="clients"
        class="elevation-1"
        :items-per-page="5"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Клиенты</v-toolbar-title>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script setup lang="ts">
  const headers = [
    { text: 'Фамилия', value: 'surname' },
    { text: 'Имя', value: 'name' },
    { text: 'Отчество', value: 'patronymic' },
    { text: 'Телефон', value: 'phone' },
    { text: 'Email', value: 'email' },
  ]
  
  const clients = [
    {
      surname: 'Иванов',
      name: 'Иван',
      patronymic: 'Иванович',
      phone: '+79123456789',
      email: 'ivanov@example.com',
    },
    {
      surname: 'Петрова',
      name: 'Мария',
      patronymic: 'Сергеевна',
      phone: '+79123456780',
      email: 'petrova@example.com',
    },
  ]
  </script>
  