let personName = "";
let currentIndex = 1;
const listItems = [
  {
    id: 1,
    complete: true,
    description: "Start your todo list.",
  }
];
// ^^^^ initiate the variable on the page above! ^^^^^

// checks if a text value is in the new item text box, and if so add it to the list of todo items. 
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

// If the user has entered a name, show the to do list, and hide the name entry.
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

// This renders the to-do list using HTML. 
const getList = () => {
  const array = listItems.map((x) => {
    return `<li
        ${x.complete ? 'class="checked"' : ""}
        onclick="toggleItem(${x.id})">
        <div style="display: flex; width: 100%"> 
        ${x.description}
          <button 
           style="margin-right: 10px;margin-left: auto;"
           onclick="deleteItem(${x.id})">
            Delete
          </button>
        </div>    
        </li>`;
  });
  document.getElementById("myUL").innerHTML = array.join("");
};


// toggle Item, Toggles the item between completed and not completed. 
const toggleItem = (id) => {
  let selectedItem = listItems.find((item) => item.id == id);
  selectedItem.complete = !selectedItem.complete;
  listItems[listItems.indexOf(selectedItem)] = selectedItem;
  getList();
};


// delete Item, Deletes item, if selected. 
const deleteItem = (id) => {
  let selectedItem = listItems.find((item) => item.id == id);
  listItems.pop(selectedItem);
  getList();
};

// Supriseme , called the API endpoint to get a new item.
const surpriseMe = () => {
  axios.get("/api/dailymotivation").then(({ data }) => {
    document.getElementById("taskTitle").value = data;
  });
};


// sends the list of the to-do times to the API to check if they are complete.
// if they are complete show some confetti. 
const postList = () => {
   axios.post("/api/areYouDoneYet", listItems).then(({ data }) => {
     if (data)
     {
      party.confetti(document.getElementById("areyoudonebutton"), {
        count: party.variation.range(20, 40)
    });
     }
     else{
       alert("Are you really done?")
     }
   });
};
// axios is an HTTP client that makes request to a server.



// listeners
document.getElementById("getStartedBtn").addEventListener("click", showList);
document.getElementById("addBtn").addEventListener("click", addToList);
document.getElementById("surpriseMeBtn").addEventListener("click", surpriseMe);
document.getElementById("listDiv").style.display = "none";

//Init the list
getList();
