let myTemporaryTodoListEntryAndDescription = {textInputTodoListEntry: '', textInputTodoListDescription: ''};
let myTemporaryEditTodoListEntryAndDescription = {textInputTodoListEntry: '', textInputTodoListDescription: ''};

//{key: 'Todo-Liste erstellen', value: 'Es muss eine TODO-Liste erstellt werden. Also einfach einen Eintrage in die vorgegebenen Felder eintragen und durch den Knopfdruck zur Liste hinzufügen.'}

const textInputTodoListEntry = document.getElementById('textInputTodoListEntry');
const textInputTodoListDescription = document.getElementById('textInputTodoListDescription');
const buttonTodoList = document.getElementById('buttonTodoList');

function fillMyObjectOnChange(event){
  myTemporaryTodoListEntryAndDescription = {
    ...myTemporaryTodoListEntryAndDescription, [event.target.name]: event.target.value
  };
}

function fillMyEditObjectOnChange(event){
  myTemporaryEditTodoListEntryAndDescription = {
    ...myTemporaryEditTodoListEntryAndDescription, [event.target.name]: event.target.value
  };
}

function createNewElement(htmlObject, idToUse, className, innerHtmlText, listElementForAppending, inputType, placeholderMessage){
  const newTodoListElement = document.createElement(htmlObject);
  newTodoListElement.id = idToUse;
  newTodoListElement.className = className;
  newTodoListElement.innerHTML = innerHtmlText;
  if(htmlObject === 'input'){
    newTodoListElement.type = inputType;
    newTodoListElement.placeholder = placeholderMessage;
  }

  document.getElementById(listElementForAppending).appendChild(newTodoListElement);

  if(className === 'editButton'){
    newTodoListElement.addEventListener('click', editButtonClickListener);
  }else if(className === 'editTodoEntryElement' || className === 'editTodoDescriptionElement'){
    newTodoListElement.addEventListener('change', fillMyEditObjectOnChange);
  }else if(className === 'acceptEditButton'){
    newTodoListElement.addEventListener('click', editTodoEntryAndDescription);
  }else if(className === 'deleteButton'){
    //newTodoListElement.addEventListener('click', deleteButtonClickListener);
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
function editButtonClickListener(){
  const idToUseForEditing = this.id.replace('editButton', '');

  createNewElement('input', `editTodoEntryElement${idToUseForEditing}`, 'editTodoEntryElement', '', `todoEntry${idToUseForEditing}`, 'text', 'Todo Eintrag ändern');

  createNewElement('input', `editTodoDescriptionElement${idToUseForEditing}`, 'editTodoDescriptionElement', '', `todoDescription${idToUseForEditing}`, 'text', 'Todo Beschreibung ändern');
  //if
  createNewElement('button', `acceptEditButton${idToUseForEditing}`, 'acceptEditButton', '<img alt="Änderung zustimmen">', this.id);
}

function editTodoEntryAndDescription(){
  const idToUseForAcceptingEdit = this.id.replace('acceptEditButton', '');

  const acceptEditButton = document.getElementById(this.id);
  const editTodoEntryElement = document.getElementById(`editTodoEntryElement${idToUseForAcceptingEdit}`);
  const editTodoDescriptionElement = document.getElementById(`editTodoDescriptionElement${idToUseForAcceptingEdit}`);
  document.getElementById(this.id).parentNode.removeChild(acceptEditButton);
  document.getElementById(`editTodoEntryElement${idToUseForAcceptingEdit}`).parentNode.removeChild(editTodoEntryElement);
  document.getElementById(`editTodoDescriptionElement${idToUseForAcceptingEdit}`).parentNode.removeChild(editTodoDescriptionElement);

  if(myTemporaryEditTodoListEntryAndDescription.textInputTodoListEntry != ''){
    document.getElementById(`todoEntry${idToUseForAcceptingEdit}`).innerHTML = myTemporaryEditTodoListEntryAndDescription.textInputTodoListEntry;
    if(myTemporaryEditTodoListEntryAndDescription.textInputTodoListDescription != ''){
      document.getElementById(`todoDescription${idToUseForAcceptingEdit}`).innerHTML = myTemporaryEditTodoListEntryAndDescription.textInputTodoListDescription;
    }
  }
}

textInputTodoListEntry.addEventListener('change', fillMyObjectOnChange);
textInputTodoListDescription.addEventListener('change', fillMyObjectOnChange);
buttonTodoList.addEventListener('click', createTodoEntryAndDescription);