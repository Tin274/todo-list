let myTemporaryTodoListEntryAndDescription = {textInputTodoListEntry: '', textInputTodoListDescription: ''};

//{key: 'Todo-Liste erstellen', value: 'Es muss eine TODO-Liste erstellt werden. Also einfach einen Eintrage in die vorgegebenen Felder eintragen und durch den Knopfdruck zur Liste hinzufügen.'}

const textInputTodoListEntry = document.getElementById('textInputTodoListEntry');
const textInputTodoListDescription = document.getElementById('textInputTodoListDescription');
const buttonTodoList = document.getElementById('buttonTodoList');

function fillMyObjectOnChange(event){
  myTemporaryTodoListEntryAndDescription = {
    ...myTemporaryTodoListEntryAndDescription, [event.target.name]: event.target.value
  };
}

function createNewElement(htmlObject, idToUse, className, innerHtmlText, listElementForAppending){
  let newTodoListElement = document.createElement(htmlObject);
  newTodoListElement.id = idToUse;
  newTodoListElement.className = className;
  newTodoListElement.innerHTML = innerHtmlText;
  document.getElementById(listElementForAppending).appendChild(newTodoListElement);
  if(htmlObject === 'button'){
    newTodoListElement.addEventListener('click', editButtonClickListener(idToUse));
  }
}

function createTodoEntryAndDescription(){
  if(myTemporaryTodoListEntryAndDescription.textInputTodoListEntry != ''){
    //Create TODO-List Entry
    createNewElement('div', `todoEntry${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'todoEntry', myTemporaryTodoListEntryAndDescription.textInputTodoListEntry, 'todoList');
    //Create TODO-List Description
    if(myTemporaryTodoListEntryAndDescription.textInputTodoListDescription != ''){
      createNewElement('div', `todoDescription${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'todoDescription', myTemporaryTodoListEntryAndDescription.textInputTodoListDescription, 'descriptionList');
    }else{
      createNewElement('div', `todoDescription${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'todoDescription', 'Beschreibung ausstehend', 'descriptionList');
    }
    //Create TODO-List Button DIV
    createNewElement('div', `divForButtons${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'divForButtons', '', 'deleteAndEditButtons');
    //Create TODO-List Edit Button
    createNewElement('button', `editButton${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'editButton', '<img alt="Ändern Taste">', `divForButtons${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`);
    //Create TODO-List Delete Button
    createNewElement('button', `deleteButton${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'deleteButton', '<img alt="Löschen Taste">', `divForButtons${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`);
    
    document.getElementById('textInputTodoListEntry').value = '';
    document.getElementById('textInputTodoListDescription').value = '';
    myTemporaryTodoListEntryAndDescription = {textInputTodoListEntry: '', textInputTodoListDescription: ''};
  }else{
    alert('Bitte erst einen Eintrag in das Feld "Todo-Liste erstellen" eintragen.');
  }
}


//TODO make button click edit whole TODO-List
function editButtonClickListener(idForTodoListRow){
  console.log('Hi');
}

textInputTodoListEntry.addEventListener('change', fillMyObjectOnChange);
textInputTodoListDescription.addEventListener('change', fillMyObjectOnChange);
buttonTodoList.addEventListener('click', createTodoEntryAndDescription);