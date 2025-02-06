'use client'

import { redirect, usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/lib/redux/store";
import { setUserInformation } from "@/lib/redux/userSlice";
import axios from "axios"

export default function AuthWrapper({children}:{children: React.ReactNode}){
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
    } else {
      const API_BASE_URL = "http://127.0.0.1:8000"
      axios
        .get(`${API_BASE_URL}/user/protected-route/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async() => {
          const response = await axios.get("http://127.0.0.1:8000/user/get-user-by-token/", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if(response.data) {
            dispatch(setUserInformation({
              newUsername: response.data.display_name,
              newEmail: response.data.email!,
              newPhotoUrl: response.data.photoURL ? response.data.photoURL : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
              newUid: response.data.uid
            }))
          }
        })
        .catch(() => {
          localStorage.removeItem("token")
        })
    }
  }, [router])

  return(
    <div>
      {children}
    </div>
  )
}