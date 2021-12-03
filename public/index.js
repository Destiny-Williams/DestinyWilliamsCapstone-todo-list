let personName = "";
let currentIndex = 3;
const listItems = [
  {
    id: 1,
    complete: true,
    description: "Start your todo list.",
  },
  // {
  //   id: 2,
  //   complete: false,
  //   description: "Item 2",
  // },
  // {
  //   id: 3,
  //   complete: false,
  //   description: "Item 3",
  // },
];



const addToList = () => {
  const newItem = document.getElementById("taskTitle");
  if (newItem.value) {
    currentIndex++;
    listItems.push({
      id: currentIndex,
      complete: false,
      description: newItem.value.trim(),
    });
    newItem.value = "";
    getList();
  } else {
    alert("Please enter something for your task");
  }
  
};

const showList = () => {
  personName = document.getElementById("nameInput").value;

  if (personName) {
    personName = personName.trim();
    document.getElementById("listDiv").style.display = "block";
    document.getElementById("nameEntry").style.display = "none";
    document.getElementById("helloText").innerHTML = `Hi ${personName}`;
  } else {
    alert("Please enter your name");
  }
};

const getList = () => {
  const array = listItems.map((x) => {
    return `<li
        ${x.complete ? 'class="checked"' : ""}
        onclick="toggleItem(${x.id})"
        >${x.description}</li>`;
  });
  document.getElementById("myUL").innerHTML = array.join("");

  
};
// delete from list button? 
// var completeButtons =
//   document.getElementsByClassName("Complete");
//     for(var i = 0; i < completeButtons.length; i++){
//       completeButtons[i].addEventListener('click', completeListItem, false);
//     }


const toggleItem = (id) => {
  let selectedItem = listItems.find((item) => item.id == id);
  selectedItem.complete = !selectedItem.complete;
  listItems[listItems.indexOf(selectedItem)] = selectedItem;
  getList();
};

const surpriseMe = () => {
   axios.get("/api/dailymotivation").then(({ data }) => {
    document.getElementById("taskTitle").value = data;
     });
};

//add listeners
document.getElementById("getStartedBtn").addEventListener("click", showList);
document.getElementById("addBtn").addEventListener("click", addToList);
document.getElementById("surpriseMeBtn").addEventListener("click", surpriseMe);
document.getElementById("listDiv").style.display = "none";

//Init the list
getList();
