import React,{useState} from 'react';

const About = () => {
  const [state, setstate] = useState(false);

  const handleClick=()=>{
    setstate(!state)
  }
  return (
    <div style={{position:"absolute",width:"100%",textAlign:"center"}}>
      <button style={{position:"absolute",zIndex:"2",marginTop:"1%",
      marginLeft:"-25px"}}
      
      onClick={()=>handleClick()}>{state?"F**k ":"Click me"}</button>
      {
        state?<h1 style={{position:"absolute",width:"100%",textAlign:"center",fontSize:"10rem",marginTop:"35px"}}>🖕</h1>:<h1></h1>
      }
    </div>
  );
}

export default About;
