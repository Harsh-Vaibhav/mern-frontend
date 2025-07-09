import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Home({age}){
  let name="John";
  return(
    <div>
      <div>Hello {name}. You are {age} years old.</div>
      <div>Hello World</div>
      <p>This is a paragraph.</p>
        </div>
  )
}

createRoot(document.getElementById("root")).render(<App />);

// createRoot(document.getElementById('root')).render(
//   <Home age={21}/>
// )

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App/>
//   </StrictMode>,
// )