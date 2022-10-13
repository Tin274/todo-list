let myTemporaryTodoListEntryAndDescription = {textInputTodoListEntry: '', textInputTodoListDescription: ''};
let myTemporaryEditTodoListEntryAndDescription = {editTodoEntryElement: '', editTodoDescriptionElement: ''};

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
    ...myTemporaryEditTodoListEntryAndDescription, [event.target.className]: event.target.value
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
  console.log(newTodoListElement);
  if(className === 'editButton'){
    newTodoListElement.addEventListener('click', editButtonClickListener);
  }else if(className === 'editTodoEntryElement' || className === 'editTodoDescriptionElement'){
    newTodoListElement.addEventListener('change', fillMyEditObjectOnChange);
  }else if(className === 'deleteButton'){
    newTodoListElement.addEventListener('click', deleteButtonClickListener);
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

function editButtonClickListener(){
  const idToUseForEditing = this.id.replace('editButton', '');

  createNewElement('input', `editTodoEntryElement${idToUseForEditing}`, 'editTodoEntryElement', '', `todoEntry${idToUseForEditing}`, 'text', 'Todo Eintrag ändern');

  createNewElement('input', `editTodoDescriptionElement${idToUseForEditing}`, 'editTodoDescriptionElement', '', `todoDescription${idToUseForEditing}`, 'text', 'Todo Beschreibung ändern');
  
  //change the editButton to acceptEditButton
  const editAcceptButton =  document.getElementById(this.id);
  editAcceptButton.innerHTML = '<img alt="Änderung akzeptieren Taste">';
  editAcceptButton.className = 'acceptEditButton';
  editAcceptButton.id = this.id;
  editAcceptButton.removeEventListener('click', editButtonClickListener);
  editAcceptButton.addEventListener('click', acceptEditTodoEntryAndDescription);
}

function acceptEditTodoEntryAndDescription(){
  const idToUseForAcceptingEdit = this.id.replace('editButton', '');
  const editTodoEntryElement = document.getElementById(`editTodoEntryElement${idToUseForAcceptingEdit}`);
  const editTodoDescriptionElement = document.getElementById(`editTodoDescriptionElement${idToUseForAcceptingEdit}`);
  
  if(myTemporaryEditTodoListEntryAndDescription.editTodoEntryElement != ''){
    document.getElementById(`todoEntry${idToUseForAcceptingEdit}`).innerHTML = myTemporaryEditTodoListEntryAndDescription.editTodoEntryElement;
    if(myTemporaryEditTodoListEntryAndDescription.editTodoDescriptionElement != ''){
      document.getElementById(`todoDescription${idToUseForAcceptingEdit}`).innerHTML = myTemporaryEditTodoListEntryAndDescription.editTodoDescriptionElement;
    }else{
      editTodoDescriptionElement.parentNode.removeChild(editTodoDescriptionElement);
    }
  }else{
    editTodoEntryElement.parentNode.removeChild(editTodoEntryElement);
    editTodoDescriptionElement.parentNode.removeChild(editTodoDescriptionElement);
  }
  
  //change the acceptEditButton to editButton
  const editButton = document.getElementById(this.id);
  editButton.innerHTML = '<img alt="Ändern Taste">';
  editButton.className = 'editButton';
  editButton.id = this.id;
  editButton.removeEventListener('click', acceptEditTodoEntryAndDescription);
  editButton.addEventListener('click', editButtonClickListener);
}

function deleteButtonClickListener(){
  const idToUseForDeleting = this.id.replace('deleteButton', '');
  const todoEntry = document.getElementById(`todoEntry${idToUseForDeleting}`);
  const todoDescription = document.getElementById(`todoDescription${idToUseForDeleting}`);
  const divForButtons = document.getElementById(`divForButtons${idToUseForDeleting}`);
  const editButton = document.getElementById(`editButton${idToUseForDeleting}`);
  const deleteButton = this.id;
  todoEntry.parentNode.removeChild(todoEntry);
  todoDescription.parentNode.removeChild(todoDescription);
  divForButtons.parentNode.removeChild(divForButtons);
  editButton.parentNode.removeChild(editButton);
  deleteButton.parentNode.removeChild(deleteButton);
}

textInputTodoListEntry.addEventListener('change', fillMyObjectOnChange);
textInputTodoListDescription.addEventListener('change', fillMyObjectOnChange);
buttonTodoList.addEventListener('click', createTodoEntryAndDescription);