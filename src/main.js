let myTemporaryTodoListEntryAndDescription = {textInputTodoListEntry: '', textInputTodoListDescription: ''};
let myTemporaryEditTodoListEntryAndDescription = {editTodoEntryElement: '', editTodoDescriptionElement: ''};

const textInputTodoListEntry = document.getElementById('textInputTodoListEntry');
//const textInputTodoListDescription = document.getElementById('textInputTodoListDescription');
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

  if(className === 'icon-check .divForButtons .editButton'){
    newTodoListElement.addEventListener('click', editButtonClickListener);
  }else if(className === 'editTodoEntryElement' || className === 'editTodoDescriptionElement'){
    newTodoListElement.addEventListener('change', fillMyEditObjectOnChange);
  }else if(className === 'icon-trash .divForButtons .deleteButton'){
    newTodoListElement.addEventListener('click', deleteButtonClickListener);
  }
}

function createTodoEntryAndDescription(){
  if(myTemporaryTodoListEntryAndDescription.textInputTodoListEntry != ''){
    //Create TODO-List Entry
    createNewElement('div', `todoList${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'todo-list', '', 'todoList');
    createNewElement('div', `todoEntry${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'todo-entry', myTemporaryTodoListEntryAndDescription.textInputTodoListEntry, `todoList${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`);
    //Create TODO-List Description
    //if(myTemporaryTodoListEntryAndDescription.textInputTodoListDescription != ''){
      //createNewElement('div', `todoDescription${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'todoDescription', myTemporaryTodoListEntryAndDescription.textInputTodoListDescription, 'descriptionList');
    //}else{
      //createNewElement('div', `todoDescription${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'todoDescription', 'Beschreibung ausstehend', 'descriptionList');
    //}
    //Create TODO-List Edit Button
    createNewElement('button', `editButton${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'icon-check .divForButtons .editButton', '<svg class="icon-trash .divForButtons .deleteButton .nothing" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>', `todoList${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`);
    //Create TODO-List Delete Button
    createNewElement('button', `deleteButton${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`, 'icon-trash .divForButtons .deleteButton', '<svg class="icon-trash .divForButtons .deleteButton .nothing" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>', `todoList${myTemporaryTodoListEntryAndDescription.textInputTodoListEntry}`);
    
    document.getElementById('textInputTodoListEntry').value = '';
    //document.getElementById('textInputTodoListDescription').value = '';
    myTemporaryTodoListEntryAndDescription = {textInputTodoListEntry: '', textInputTodoListDescription: ''};
  }else{
    alert('Bitte erst einen Eintrag in das Feld "Todo-Liste erstellen" eintragen.');
  }
}

function editButtonClickListener(){
  const idToUseForEditing = this.id.replace('editButton', '');

  createNewElement('input', `editTodoEntryElement${idToUseForEditing}`, 'editTodoEntryElement', '', `todoEntry${idToUseForEditing}`, 'text', 'Todo Eintrag ändern');

  //createNewElement('input', `editTodoDescriptionElement${idToUseForEditing}`, 'editTodoDescriptionElement', '', `todoDescription${idToUseForEditing}`, 'text', 'Todo Beschreibung ändern');
  
  //change the editButton to acceptEditButton
  const editAcceptButton =  document.getElementById(this.id);
  editAcceptButton.innerHTML = '<svg class="icon-check .divForButtons .deleteButton .nothing" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>';
  editAcceptButton.className = 'icon-check .divForButtons .acceptEditButton';
  editAcceptButton.id = this.id;
  editAcceptButton.removeEventListener('click', editButtonClickListener);
  editAcceptButton.addEventListener('click', acceptEditTodoEntryAndDescription);
}

function acceptEditTodoEntryAndDescription(){
  const idToUseForAcceptingEdit = this.id.replace('editButton', '');
  const editTodoEntryElement = document.getElementById(`editTodoEntryElement${idToUseForAcceptingEdit}`);
  //const editTodoDescriptionElement = document.getElementById(`editTodoDescriptionElement${idToUseForAcceptingEdit}`);
  
  if(myTemporaryEditTodoListEntryAndDescription.editTodoEntryElement != ''){
    document.getElementById(`todoEntry${idToUseForAcceptingEdit}`).innerText = myTemporaryEditTodoListEntryAndDescription.editTodoEntryElement;
    //if(myTemporaryEditTodoListEntryAndDescription.editTodoDescriptionElement != ''){
      //document.getElementById(`todoDescription${idToUseForAcceptingEdit}`).innerHTML = myTemporaryEditTodoListEntryAndDescription.editTodoDescriptionElement;
    //}else{
      //editTodoDescriptionElement.parentNode.removeChild(editTodoDescriptionElement);
    //}
  }else{
    editTodoEntryElement.parentNode.removeChild(editTodoEntryElement);
    //editTodoDescriptionElement.parentNode.removeChild(editTodoDescriptionElement);
  }

  //change the acceptEditButton to editButton
  const editButton = document.getElementById(this.id);
  editButton.innerHTML = '<svg class="icon-trash .divForButtons .deleteButton .nothing" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>';
  editButton.className = 'icon-check .divForButtons .editButton';
  editButton.id = this.id;
  editButton.removeEventListener('click', acceptEditTodoEntryAndDescription);
  editButton.addEventListener('click', editButtonClickListener);
}

function deleteButtonClickListener(){
  const idToUseForDeleting = this.id.replace('deleteButton', '');
  const todoEntry = document.getElementById(`todoEntry${idToUseForDeleting}`);
  //const todoDescription = document.getElementById(`todoDescription${idToUseForDeleting}`);
  const editButton = document.getElementById(`editButton${idToUseForDeleting}`);
  const deleteButton = document.getElementById(this.id);
  todoEntry.parentNode.removeChild(todoEntry);
  //todoDescription.parentNode.removeChild(todoDescription);
  editButton.parentNode.removeChild(editButton);
  deleteButton.parentNode.removeChild(deleteButton);
}

textInputTodoListEntry.addEventListener('change', fillMyObjectOnChange);
//textInputTodoListDescription.addEventListener('change', fillMyObjectOnChange);
buttonTodoList.addEventListener('click', createTodoEntryAndDescription);