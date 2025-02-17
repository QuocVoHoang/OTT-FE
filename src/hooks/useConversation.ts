'use client'

import { useSidebar } from "@/components/ui/sidebar"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2, Contact } from "lucide-react"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import { API_SERVER } from "@/lib/constants"

const useConversation = () => {

  const createNewGroupChat = async(groupName: string, participants: string[]) => {
    try {
      const endpoint = `${API_SERVER}/conversation/create-conversation`
      const response = await axios.post(endpoint, {
        name: groupName, 
        participants: participants
      })
      console.log('response', response.data)
    } catch(e) {
      console.error(e)
    }
  }

  return {
    createNewGroupChat
  }
}

export default useConversation