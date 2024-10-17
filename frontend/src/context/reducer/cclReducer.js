import { GET__SELECTED__MENU } from "./actionsTypes";

export const cclReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET__SELECTED__MENU:
      return {
        ...state,
        sidebarTitle: payload,
      };
    // case FAVOURITE__TASK:
    //   const findTaskIndex = state.tasks.findIndex(
    //     (task) => task.id === payload
    //   );
    //   if (findTaskIndex !== -1) {
    //     const newTasks = [...state.tasks];
    //     newTasks[findTaskIndex] = {
    //       ...newTasks[findTaskIndex],
    //       isFavourite: !newTasks[findTaskIndex].isFavourite,
    //     };
    //     return {
    //       ...state,
    //       tasks: newTasks,
    //     };
    //   }
    //   return;
    // case UPDATE__TASK:
    //   const updatedTasks = state.tasks.map((task) => {
    //     if (task.id === payload.id) {
    //       return {
    //         ...payload,
    //       };
    //     }
    //     return task;
    //   });
    //   return {
    //     ...state,
    //     tasks: [...updatedTasks],
    //     showModal: !state.showModal,
    //     taskToUpdate: null,
    //   };
    default:
      return {
        ...state,
      };
  }
};
