import { useState, useEffect } from "react";

import { BtnAdmin } from "@/components/Buttons/Buttons";

export default function Admin() {

  const [canOpenAdmin, setCanOpenAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin") 
      .then((response) => {
        if (response.ok) {

          setCanOpenAdmin(true);
        } else {
          setCanOpenAdmin(false);
        }
      })
      .catch(() => {
   
        setCanOpenAdmin(false);
      });
  }, []);

  
   if (canOpenAdmin) {
    return <BtnAdmin />
  }
  
  return null;
}