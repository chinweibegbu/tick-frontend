import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { showModalModel } from "../models";

// ----------------------  END IMPORTS ---------------------------------

const initialState = {
  showAddTaskModal: false,
  showEditTaskModal: false,
  showDeleteTaskConfirmModal: false,
  taskIdToEdit: -1,
  taskIdToDelete: -1
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<showModalModel>) => {
      const { modalName, showModal, potentialTaskId } = action.payload;

      switch (modalName) {
        case "addTaskModal":
          // Show the "Add Task" modal
          state.showAddTaskModal = showModal;

          // Break out of case
          break;
        case "editTaskModal":
          // Update the taskToEdit --> Only passed upon opening the modal
          if (potentialTaskId) {
            state.taskIdToEdit = potentialTaskId;
          }

          // Show the "Edit Task" modal
          state.showEditTaskModal = showModal;

          // Break out of case
          break;
        case "deleteTaskConfirmModal":
          // Update taskIdToDelete
          state.taskIdToDelete = potentialTaskId!;

          // Show the "Delete Task Confirm" modal
          state.showDeleteTaskConfirmModal = showModal;

          // Break out of case
          break;
        default:
          // Handle default case
          console.log("Non-existent modal specified");
      }
    },
  },
});

export const { toggleModal } = modalsSlice.actions;

export default modalsSlice.reducer;