// export default function Home({ age }) {
//   let name = "John";
//   return (
//     <>
//       <div>
//         Hello {name}. You are {age} years old.
//       </div>
//       <p>This is a paragraph</p>
//     </>
//   );
// }

// export default function Home ({age}){
//   const hadleClick = () =>{
//     alert("Hello");
//   };
//   const handleSubmit = ()=>{

//   }
// }

import {useState} from "react";
export default function Home(){
  const [score, setScore] = useState(0);
  const increment = () => {
    setScore(score+1);
  };
  const decrement =() =>{
    setScore(score-1);
  }
  return (
    <>
    <p>{score}</p>
    <button onClick = {increment}>Increment Score</button>
    <button onClick = {decrement}>Decrement Score</button>
    </>
  )
}