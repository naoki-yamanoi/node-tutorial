const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskEditCompletedDOM = document.querySelector(".task-edit-completed");

const id = new URLSearchParams(window.location.search).get("id");

// １つの特定のタスクを取得する
const showTask = async () => {
  try {
    const {data: task} = await axios.get(`/api/v1/tasks/${id}`);
    const {_id, completed, name} = task;
    taskIdDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskEditCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
}
showTask();

// タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const {data: task} = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskEditCompletedDOM.checked
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
