import { createStore } from "vuex";
interface State {
  userName: string;
  taskList: any[];
}
export default createStore({
  state: {
    userName: "北鸟南游",
    taskList: [],
  },
  getters: {
    totalList(state: State) {
      return state.taskList.length;
    },
    completeList(state: State) {
      return state.taskList.filter((list) => {
        return list.isfinished == true;
      }).length;
    },
  },
  mutations: {
    createTask(state: State, newTask: string) {
      state.taskList.push(newTask);
    },
    deleteTask(state: State, index: number) {
      state.taskList.splice(index, 1);
    },
    updateStatus(state: State, payload: any) {
      const { index, status } = payload;
      state.taskList[index].isfinished = status;
    },
  },
});
