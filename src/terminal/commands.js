import data from './file_system.json';


function help_command(command, current_folder) {
  let output = '';
  
  if(command.split(' ').length > 2) {
    output = 'Incorrect syntax on "help" command.\n';
    output += 'Run command "help help" to get a set of instructions for the "help"';
    output += 'command.';
    return [output, current_folder];
  }
  
  if(command.split(' ').length === 2) {
    switch(command.split(' ')[1]) {
      case 'help':
        output += 'Run "help" to get a complete list of available commands with their ';
        output += 'descriptions.\n'
        output += 'You can also run "help (command)" to get a set of instructions for ';
        output += 'the command you choose.';
        
        return [output, current_folder];
      case 'peek':
        output += 'Run "peek" to get a list of all files/folders inside your current ';
        output += 'folder.';
        
        return [output, current_folder];
      case 'clear':
        output += 'Run "clear" to clear the console (this will clear everything that\n';
        output += 'was previously written on the console, including the set of\n';
        output += 'instructions initially provided). You may use the "help" command to ';
        output += 'get it again.';
        
        return [output, current_folder];
      case 'open':
        output += `Run "open (file/folder)" to open a file and see it's contents or `;
        output += 'execute it or open a folder.';
        
        return [output, current_folder];
      case 'goback':
        output += 'Run "goback" to go back to the folder that contains the folder you ';
        output += 'currently on.';
        
        return [output, current_folder];
      default:
        output = `Unknown command: ${command.split(' ')[0]}\n`;
        output += 'Run command "help" to get a complete list of available commands '
        output += 'with their descriptions.';
    }
  }
  
  output = 
`=====   Available Commands   =====

help: Lists available commands with details on each
clear: Clears console
open: Opens file/folder
peek: Lists directories in current directory
goback: Goes back to the previous folder`.replace(/\r\n/g, '\n');
  
  return [output, current_folder];
}


function peek_command(command, current_folder) {
  let output = '';
  
  if(command.split(' ').length > 1) {
    output = 'Incorrect syntax on "peek" command.\n';
    output += 'Run command "help peek" to get a set of instructions for the "open"';
    output += 'command.';
    return [output, current_folder]
  }
  
  let path = data;
  
  if(current_folder !== ' Home') {
    path = data.content[0];
  }
  
  for(let i=0; i<path.content.length; i++) {
    if(i % 4 === 0 && i !== 0) output += '\n';
    output += path.content[i].name + '    ';
  }
  
  return [output, current_folder];
}


function clear_command(command, current_folder) {
  let output = '';
  
  if(command.split(' ').length > 1) {
    output = 'Incorrect syntax on "clear" command.\n'
    output += 'Run command "help clear" to get a set of instructions for the "clear"';
    output += 'command.';
  }
  
  return [output, current_folder];
}


function open_command(command, current_folder) {
  let output = '';
  let found = false;
  
  if(command.split(' ').length !== 2) {
    output = 'Incorrect syntax on "open" command.\n';
    output += 'Run command "help open" to get a set of instructions for the "open"';
    output += 'command.';
    return [output, current_folder];
  }
  
  let path = data;
  
  if(current_folder !== ' Home') {
    path = data.content[0];
  }
  
  for(let i=0; i<path.content.length; i++) {
    if(command.split(' ')[1] === path.content[i].name) {
      found = true;
      
      let file = path.content[i]
      let file_type = file.name.split('.')[1];
      switch(file_type) {
        case 'folder':
          output += 'You are now inside ' + file.name + '\n';
          current_folder = ' ' + file.name.split('.')[0];
          output += peek_command('peek', file.name)[0];
          break;
        case 'github':
          window.open(file.content);
          output += 'Cool project, huh?';
          break;
        case 'text':
          output += file.content;
          break;
        case 'web':
          window.open(file.content);
          output += 'Did you like my Profile? ;D';
          break;
        default:
          return;
      }
    }
  }
  
  if(!found) {
    output = 'Incorrect syntax on "open" command.\n';
    output += 'File "' + command.split(' ')[1] + `" doesn't exist in this folder.\n`;
    output += 'Run command "help open" to get a set of instructions for the "open" ';
    output += 'command.';
    output += path.content;
    return [output, current_folder];
  }
  
  return [output, current_folder];
}


function goback_command(command, current_folder) {
  let output = '';
  
  if(command.split(' ').length > 1) {
    output = 'Incorrect syntax on "goback" command.\n';
    output += 'Run command "help goback" to get a set of instructions for the "goback"';
    output += 'command.';
    return [output, current_folder];
  }
  
  if(current_folder === ' Home') {
    output += 'You are already on the "Home" folder, there is nothing behind.';
    return output;
  }
  
  current_folder = ' Home';
  output += 'You are now on Home.folder\n';
  output += peek_command('peek', current_folder)[0];
  
  return [output, current_folder];
}


export function runCommand(command, current_folder) {
  if (command.trim() === '') return [' ', current_folder];
  
  let output = '';
  
  switch(command.split(' ')[0]) {
    case 'help':
      return help_command(command, current_folder);
    case 'peek':
      return peek_command(command, current_folder);
    case 'clear':
      return clear_command(command, current_folder);
    case 'open':
      return open_command(command, current_folder);
    case 'goback':
      return goback_command(command, current_folder);
    default:
      output = `Unknown command: ${command.split(' ')[0]}\n`;
      output += 'Run command "help" to get a complete list of available commands '
      output += 'with their descriptions.';
  }
  
  return [output, current_folder];
}
