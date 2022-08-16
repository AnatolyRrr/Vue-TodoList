<template>
  <div>
    <h1 class="text-white center" v-if="tasks.length === 0">Задач пока нет</h1>
    <template v-else>
      <h3 class="text-white">Всего активных задач: {{activeTaskCount}}</h3>
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
  </div>
</template>

<script>
import { computed } from 'vue';
import AppStatus from "../components/AppStatus.vue";

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => store.getters.tasks)
    const activeTaskCount = computed(() => store.getters.activeTaskCount)

    const deleteTask = idx => {
      store.dispatch('deleteTask', idx)
    }

    const isFilter = true

    return {
      tasks,
      activeTaskCount,
      open: id => router.push(`/task/${id}`),
      deleteTask,
      isFilter
    }
  },
  components: { AppStatus },
};
</script>
