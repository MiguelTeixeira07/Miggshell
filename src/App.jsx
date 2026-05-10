import { useState, useRef, useEffect } from 'react';
import './App.css';
import { runCommand } from './terminal/commands';

let current_folder = ' Home';


function App() {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([]);
  
  
  function handleCommand(event) {
    event.preventDefault();
    
    let command = input.trim();
    
    let [command_output, new_folder] = runCommand(command, current_folder);
    
    if(command_output) {
      setLines([
        ...lines,
        `<span style="color: #88b788">[curious_guest@miggshell${current_folder}]$</span> ${input}`,
        command_output
      ]);
    } else {
      setLines([]);
    }
    
    current_folder = new_folder;
    
    setInput('')
  }
  
  
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    
    const keepFocus = () => {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    };
    
    keepFocus();
    
    const id = setInterval(keepFocus, 50);
    
    return () => clearInterval(id);
  }, []);
  
  useEffect(() => {
    async function init() {
      let [help_output] = runCommand('help', '');
      setLines([help_output]);
    }
    init();
  }, []);
  
  
  return (
    <div className='App'>
      {lines.map((line, index) => (
        <div
          style={{ whiteSpace: 'pre' }}
          key={index}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
      
      <form onSubmit={handleCommand} className='flex mt-2'>
        <div className='InputDiv'>
          <span className='mr-2 flex-shrink-0' style={{ color: '#88b788', whiteSpace: 'nowrap' }}>
            {`[curious_guest@miggshell${current_folder}]$`}
          </span>
          
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className='bg-transparent outline-none flex-1 w-full'
            autoFocus
            spellCheck={'false'}
          />
        </div>
      </form>
    </div>
  );
}

export default App;