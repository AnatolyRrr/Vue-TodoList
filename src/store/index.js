import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            tasks: JSON.parse(localStorage.getItem('my-tasks')) ?? []
        }
    },
    mutations: {
        createTask(state, task) {
            state.tasks.push(task)
            localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
        },
        changeTask(state, task) {
            const idx = state.tasks.findIndex(t => t.id === task.id)
            state.tasks[idx] = task
            localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
        },
        deleteTask(state, idx) {
            state.tasks.splice(idx, 1)
            localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
        }
    },
    actions: {
        createTask({commit}, task) {
            if(task.date < new Date()) {
                task.status = 'cancelled'
            }
            commit('createTask', task)
        },
        changeTask({commit}, task) {
            commit('changeTask', task)
        },
        deleteTask({commit}, idx) {
            commit('deleteTask', idx)
        }
    },
    getters: {
        tasks(state) {
            return state.tasks
        },
        activeTaskCount(state) {
            return state.tasks.filter(t => {
                if(t.status === 'active' || t.status === 'pending') {
                    return t.status
                }
            }).length
        },
        taskById(_, getters) {
            return id => getters.tasks.find(t => t.id === id)
        },
        activeTaskFilter(_, getters) {
            return id => getters.tasks.find(t => t.id === id)
        },
    }
})

export default store