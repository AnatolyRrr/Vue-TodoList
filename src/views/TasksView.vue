<template>
  <div>
    <h1 class="text-white center" v-if="tasksLength === 0">Задач пока нет</h1>
    <template v-else>
      <h3 class="text-white">Всего активных задач: {{activeTaskCount}}</h3>
      <div class="card">
        <button class="btn" @click="filterTasks('active', 'pending', 'done', 'cancelled')">Все</button>
        <button class="btn warning" @click="filterTasks('active', 'pending')">Активные</button>
        <button class="btn primary" @click="filterTasks('done')">Завершенные</button>
        <button class="btn danger" @click="filterTasks('cancelled')">Отмененные</button>
      </div>
      <h2 class="text-white center" v-if="tasks.length === 0">Список пуст, выберите другой раздел</h2>
      <template v-else>
        <div class="card" v-for="(task, idx) in tasks" :key="task.id">
          <h2 class="card-title">
            {{task.title}}
            <AppStatus :type="task.status" />
          </h2>
          <p>
            <strong>
              <small>
                {{ new Date(task.date).toLocaleDateString() }}
              </small>
            </strong>
          </p>
          <div style="display:flex; justify-content:space-between">
            <button class="btn primary" @click="open(task.id)">Посмотреть</button>
            <button class="btn danger" @click="deleteTask(idx)">Удалить</button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import AppStatus from "../components/AppStatus.vue";

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const statuses = ref(['active', 'pending', 'done', 'cancelled'])

    function filterTasks(...status) {
      statuses.value.splice(0, 4, ...status)
    }
    
    const tasks = computed(() => store.getters.tasks.filter(task => statuses.value.includes(task.status)))

    const tasksLength = computed(() => store.getters.tasks.length)

    const activeTaskCount = computed(() => store.getters.activeTaskCount)

    const deleteTask = idx => {
      store.dispatch('deleteTask', idx)
    }

    return {
      tasks,
      activeTaskCount,
      open: id => router.push(`/task/${id}`),
      deleteTask,
      statuses,
      filterTasks,
      tasksLength
    }
  },
  components: { AppStatus },
};
</script>
