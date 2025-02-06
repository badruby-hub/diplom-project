import { useSession, signOut, signIn } from "next-auth/react"

export default function Authorize() {
    return <>
       <Account/>
    </>
  }

  function Account() {
    const {data: session} = useSession();
    console.log("session",session);
    if (session) {
      return (
        <>
        signed in as {session?.user?.name} ({session?.user?.email})<br/>
        {session?.user?.image && <img src={session.user.image} style={{width:"50px", borderRadius:"50px"}}/> }
        <button onClick={()=>signOut()}>выйти</button>
    </>
      )
    }
    return <>
    not signet in2 <br/>
    <button onClick={()=> signIn()}>Войти</button>
    </>
  }