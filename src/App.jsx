import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home.jsx'
import Register from './components/register.jsx'

import {BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Product from './components/Product.jsx'
import Cart from './components/Cart.jsx'
import Order from './components/Order.jsx'
import Orders from './components/Orders.jsx'
import Products from './components/Products.jsx'
import Users from './components/Users.jsx'
import Admin from './components/Admin.jsx'
import Login from './components/Login.jsx'

// function App() {
//   const [runs, setRuns] = useState(0);
//   const [wickets, setWickets] = useState(0);
//   const [message, setMessage] = useState('');

//   const addRun = () => {
//   if (wickets < 10) {
//     setRuns(runs + 1);
//     setMessage('Well done!');
//   }
// };


//   const addWicket = () => {
//     if (wickets < 10) {
//       const newWickets = wickets + 1;
//       setWickets(newWickets);
//       setMessage(newWickets === 10 ? 'Game Over' : 'Better luck next time!');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>🏏 Cricket Scoreboard</h1>

//       <div style={styles.boxes}>
//         <div style={styles.box}>
//           <h2>Runs</h2>
//           <p>{runs}</p>
//           <button onClick={addRun} disabled={wickets>=10}>Add Run</button>
//         </div>

//         <div style={styles.box}>
//           <h2>Wickets</h2>
//           <p>{wickets}</p>
//           <button onClick={addWicket} disabled={wickets >= 10}>
//             Add Wicket
//           </button>
//         </div>

//         <div style={styles.box}>
//           <h2>Message</h2>
//           <p>{message}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     padding: '2rem',
//     fontFamily: 'Arial, sans-serif',
//   },
//   boxes: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '2rem',
//     marginTop: '2rem',
//   },
//   box: {
//     border: '2px solid #333',
//     padding: '1rem 2rem',
//     borderRadius: '10px',
//     minWidth: '150px',
//   },
// };


// function App() {

//   return (
//     <div className="App-Container">
//       <h1 style={{ backgroundColor: "orange" }}>MERN Frontend</h1>
//       <Home age={21}/>
//       <h3>This is footer</h3>
//     </div>
//   );
// }

//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

function App() {
  return (
    <div className="App-Container">
      <BrowserRouter>
      <h1 style={{ backgroundColor: "orange" }}>MERN Frontend</h1>
      {/* <Home age={21} /> */}
      
      <Link to ="/">Home</Link>-<Link to="/cart">My Cart</Link>-
      <Link to = "/order">My Order</Link>-<Link to="/admin">Admin</Link>-<Link to="/login">Login</Link>
      
      <Routes>
        <Route index element={<Product/>}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="order" element={<Order />}/>
        <Route path="admin" element={<Admin />}/>
        <Route index element ={<Users />} />
        <Route path="orders" element={<Orders />}/>
        <Route path="products" element={<Products />}/>
        
      </Routes>


      {/* <Register/> */}
      <h3>This is footer</h3>

    </BrowserRouter>
    </div>
  );
}

export default App;