'use client'

import { useSidebar } from "@/components/ui/sidebar"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2, Contact } from "lucide-react"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import { API_SERVER } from "@/lib/constants"

const useUser = () => {

  const getIdFromUserMailPhone = async(identifier: string) => {
    try {
      const endpoint = `${API_SERVER}/user/get-user`
      const response = await axios.get(`${endpoint}/${identifier}`)
      return response.data.uid
    } catch(e) {
      console.error(e)
    }
  }

  return {
    getIdFromUserMailPhone
  }
}

export default useUser